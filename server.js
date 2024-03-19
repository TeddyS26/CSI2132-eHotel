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

app.get('/api/hotel_locations', async (req, res) => {
  try {
    const hotelLocations = await db.any("SELECT street_number || ' ' || street_name || ', ' || city || ', ' || state || ', ' || zip AS address FROM individual_hotel");
    res.json(hotelLocations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.get('/api/hotel_chains', async (req, res) => {
  try {
    const hotelChains = await db.any("SELECT name FROM hotel_chain");
    res.json(hotelChains);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.get('/api/available_rooms', async (req, res) => {
  try {
    const availableRooms = await db.any("SELECT room_number, view, extendable, price, comment, amenities, capacity FROM room WHERE is_available = true");
    res.json(availableRooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.get('/api/room_details', async (req, res) => {
  try {
    const roomDetails = await db.any("SELECT room_number, view, extendable, price, comment, amenities, capacity FROM room");
    res.json(roomDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));