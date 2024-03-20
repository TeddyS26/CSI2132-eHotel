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
  try {
    const availableRooms = await db.any("SELECT room_number, view, extendable, price, comment, amenities, capacity FROM room WHERE is_available = true");
    res.json(availableRooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Get all room details
app.get('/api/room_details', async (req, res) => {
  try {
    const roomDetails = await db.any("SELECT room_number, view, extendable, price, comment, amenities, capacity FROM room");
    res.json(roomDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Add a new customer
app.set('/api/add_customer', async (req, res) => {
  try {
    const addCustomr = await db.any("INSERT INTO customer (first_name, middle_name, last_name, street_number, street_name, apt_number, city, state, zip, id, date_of_registration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [req.body.first_name, req.body.middle_name, req.body.last_name, req.body.street_number, req.body.street_name, req.body.apt_number, req.body.city, req.body.state, req.body.zip, req.body.id, req.body.date_of_registration]);
    res.json(addCustomr);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Add a new booking
app.get('/api/add_booking', async (req, res) => {
  try {
    const addBooking = await db.any("INSERT INTO Booking_Renting (customerId, hotelId, room_number, status, startDate, endDate, card_number, expiration_date, cvv, employeeId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [req.body.customerId, req.body.hotelId, req.body.room_number, 'booked', req.body.startDate, req.body.endDate, req.body.card_number, req.body.expiration_date, req.body.cvv, req.body.employeeId]);
    await db.none("UPDATE Room SET is_available = false WHERE hotelId = $1 AND room_number = $2", [req.body.hotelId, req.body.room_number]);
    res.json(addBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));