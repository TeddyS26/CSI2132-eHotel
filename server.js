const envReader = require('dotenv').config();
const express = require('express');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_CONN);
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Connect to the database
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Get all hotel locations
app.get('/api/hotel_locations', async (req, res) => {
  try {
    const hotelLocations = await db.any("SELECT street_number || ' ' || street_name || ', ' || city || ', ' || state || ', ' || zip AS address FROM individual_hotel");
    res.json(hotelLocations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Get all hotel chains
app.get('/api/hotel_chains', async (req, res) => {
  try {
    const hotelChains = await db.any("SELECT name FROM hotel_chain");
    res.json(hotelChains);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Get all available rooms
app.get('/api/available_rooms', async (req, res) => {
  const { startDate, endDate, capacity, city, chainName, amenities, minPrice, maxPrice, view, rating, extendable } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).send({ error: 'Start date and end date are required.' });
  }

  let queryParams = [startDate, endDate];
  let query = `
    SELECT r.*, ih.city, ih.star_rating, hc.name AS chain_name, ih.street_number || ' ' || ih.street_name AS hotel_address
    FROM Room r
    JOIN Individual_hotel ih ON r.hotelId = ih.hotelId
    JOIN Hotel_chain hc ON ih.chainId = hc.chainId
    WHERE NOT EXISTS (
      SELECT 1
      FROM unnest(r.not_available_dates) AS date_val
      WHERE date_val <@ daterange($1, $2, '[]')
  )
  
  `;

  if (capacity) {
    query += ` AND r.capacity = $${queryParams.length + 1}`;
    queryParams.push(capacity);
  }
  if (city) {
    query += ` AND ih.city = $${queryParams.length + 1}`;
    queryParams.push(city);
  }
  if (chainName) {
    query += ` AND hc.name = $${queryParams.length + 1}`;
    queryParams.push(chainName);
  }
  if (amenities) {
    const amenitiesList = amenities.split(',');
    amenitiesList.forEach((amenity) => {
      query += ` AND r.amenities LIKE $${queryParams.length + 1}`;
      queryParams.push(`%${amenity.trim()}%`);
    });
  }
  if (minPrice) {
    query += ` AND r.price >= $${queryParams.length + 1}`;
    queryParams.push(minPrice);
  }
  if (maxPrice) {
    query += ` AND r.price <= $${queryParams.length + 1}`;
    queryParams.push(maxPrice);
  }
  if (view) {
    query += ` AND r.view = $${queryParams.length + 1}`;
    queryParams.push(view);
  }
  if (rating) {
    query += ` AND ih.star_rating = $${queryParams.length + 1}`;
    queryParams.push(rating);
  }
  if (extendable === 'true') {
    query += ` AND r.extendable = true`;
    queryParams.push(extendable);
  }

  try {
    const availableRooms = await db.any(query, queryParams);
    res.json(availableRooms);
  } catch (error) {
    console.error('Error querying available rooms:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Add a new customer
app.post('/api/add_customer', async (req, res) => {
  const { first_name, middle_name, last_name, street_number, street_name, apt_number, city, state, zip, ssn_sin, date_of_registration } = req.body;
  if (!first_name || !last_name || !street_number || !street_name || !city || !state || !zip || !ssn_sin || !date_of_registration) {
    return res.status(400).send({ error: 'Missing mandatory fields.' });
  }

  try {
    const query = `
      INSERT INTO Customer (ssn_sin, first_name, middle_name, last_name, street_number, street_name, apt_number, city, state, zip, date_of_registration)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING ssn_sin;`;

    const result = await db.one(query, [ssn_sin, first_name, middle_name, last_name, parseInt(street_number), street_name, parseInt(apt_number), city, state, zip, date_of_registration]);
    res.status(201).send({ ssn_sin: result.ssn_sin });
  } catch (error) {
    console.error('Error adding new customer:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Add a new booking
app.post('/api/add_booking', async (req, res) => {
  const { customerSSN_SIN, hotelid, roomid, startdate, enddate } = req.body;
  console.log(req.body);
  try {
    const employeeQuery = `
      SELECT ssn_sin FROM Employee
      WHERE hotelid = $1
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const employee = await db.one(employeeQuery, [hotelid]);

    const bookingQuery = `
      INSERT INTO Booking_Renting (customerSSN_SIN, hotelid, room_number, status, startDate, endDate, card_number, expiration_date, cvv, employeeSSN_SIN)
      VALUES ($1, $2, $3, 'Booked', $4, $5, '0000000000000000', '9999-12-31', 000, $6)
      RETURNING bookingId;
    `;
    const booking = await db.one(bookingQuery, [customerSSN_SIN, hotelid, roomid, startdate, enddate, employee.ssn_sin]);
    res.status(201).send({ bookingId: booking.bookingid });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Get all bookings accosiated to a employee
app.get('/api/get_booking', async (req, res) => {
  const { ssn_sin } = req.query;

  if (!ssn_sin) {
    return res.status(400).send({ error: 'Employee SSN/SIN is required.' });
  }

  try {
    const query = `
      SELECT br.bookingId, br.startDate, br.endDate, c.first_name || ' ' || c.last_name AS customer_full_name, br.status, br.card_number, br.cvv, br.expiration_date
      FROM Booking_Renting br
      JOIN Customer c ON br.customerSSN_SIN = c.ssn_sin
      JOIN Employee e ON br.employeeSSN_SIN = e.ssn_sin
      WHERE e.ssn_sin = $1;
    `;

    const bookings = await db.any(query, [ssn_sin]);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by employee SSN:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Update a booking
app.put('/api/bookings/update/:bookingId', async (req, res) => {
  const { bookingId } = req.params;
  const { card_number, cvv, expiration_date } = req.body;

  if (!card_number || !cvv || !expiration_date) {
    return res.status(400).send({ error: 'Missing required card information: card number, CVV, and expiration date are required.' });
  }

  try {
    const query = `
      UPDATE Booking_Renting
      SET card_number = $1, cvv = $2, expiration_date = $3, status = 'Renting'
      WHERE bookingId = $4 AND status = 'Booked'
      RETURNING *;  // Returns the updated booking row
    `;

    const updatedBooking = await db.oneOrNone(query, [card_number, cvv, expiration_date, bookingId]);

    if (updatedBooking) {
      res.json({ success: true, message: 'Booking updated successfully.', updatedBooking });
    } else {
      res.status(404).send({ success: false, message: 'Booking not found or was not in a Bookable state.' });
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Get all available rooms per area
app.get('/api/available-rooms-per-area', async (req, res) => {
  try {
    const availableRooms = await db.any("SELECT * FROM Available_Rooms_Per_Area;");
    res.json(availableRooms);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// Get total capacity per hotel
app.get('/api/aggregated-capacity-per-hotel', async (req, res) => {
  try {
    const capacityPerHotel = await db.any("SELECT * FROM Aggregated_Capacity_Per_Hotel;");
    res.json(capacityPerHotel);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));