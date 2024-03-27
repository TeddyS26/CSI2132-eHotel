import React, { useState, useEffect } from 'react';
import {  TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core'; // Import FormControlLabel and Checkbox
import Alert from '@mui/material/Alert';
import HotelComponent from '../components/HotelComponent'; // Import the updated HotelComponent
import '../styles/HotelSearch.css'; // Import custom CSS for styling
import { useLocation } from 'react-router-dom';

function HotelSearch() {
  const [searchCriteria, setSearchCriteria] = useState({
    hotelid: '',
    room_number: '',
    startDate: '',
    endDate: '',
    capacity: '',
    city: '',
    hotel_address: '',
    hotelChain: '',
    amenities: [],
    minPrice: '',
    maxPrice: '',
    view: '',
    rating: '',
    extendable: false,
  });
  const [filteredHotels, setFilteredHotels] = useState([]);
  const location = useLocation();
  const [popupMessage, setPopupMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({ startDate: '', endDate: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const handleSearch = async () => {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    try {
      const response = await fetch(`http://localhost:5000/api/available_rooms?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setFilteredHotels(data);
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };

  const handleStartDateChange = (e) => {
    const { value } = e.target;
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // Check if the selected start date is before the current date
    if (value < currentDate) {
      setValidationErrors(prevErrors => ({ ...prevErrors, startDate: 'Start date cannot be in the past.' }));
    } else {
      setValidationErrors(prevErrors => ({ ...prevErrors, startDate: '' }));
    }
    setSearchCriteria({ ...searchCriteria, startDate: value });
  };

  const handleEndDateChange = (e) => {
    const { value } = e.target;
    const { startDate } = searchCriteria;
    // Check if the selected end date is before the start date
    if (value < startDate) {
      setValidationErrors(prevErrors => ({ ...prevErrors, endDate: 'End date cannot be before the start date.' }));
    } else {
      setValidationErrors(prevErrors => ({ ...prevErrors, endDate: '' }));
    }
    setSearchCriteria({ ...searchCriteria, endDate: value });
  };

  const isSearchDisabled = !searchCriteria.startDate || !searchCriteria.endDate || validationErrors.startDate || validationErrors.endDate;

  function Popup({ message, onClose }) {
    return (
      <div className="popup-overlay">
        <div className="popup">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (location.state) {
      setShowAlert(true);
      setAlertSeverity('success');
      setAlertMessage(location.state);
    }
  }, [location.state]);

  return (
    <div className="search-container">
      <h2>Hotel Search</h2>
      {showAlert && (
          <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        )}      
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            label="Start Date"
            type="date"
            value={searchCriteria.startDate}
            onChange={handleStartDateChange}
            fullWidth
            error={!!validationErrors.startDate}
            helperText={validationErrors.startDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="End Date"
            type="date"
            value={searchCriteria.endDate}
            onChange={handleEndDateChange}
            fullWidth
            error={!!validationErrors.endDate}
            helperText={validationErrors.endDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Capacity</InputLabel>
            <Select
              value={searchCriteria.capacity}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, capacity: e.target.value })}
            >
              {[
                'Single', 'Double', 'Twin', 'Queen', 'King'
              ].map((capacity, index) => (
                <MenuItem key={index} value={capacity}>{capacity}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={searchCriteria.city}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, city: e.target.value })}
            >
              {[
                "Seattle", "Calgary", "Los Angeles", "Edmonton", "San Francisco", 
                "Portland", "Victoria", "Halifax", "Atlanta", "New Orleans", 
                "Winnipeg", "Regina", "Nashville", "New York", "Saskatoon", 
                "Quebec City", "Miami", "Montreal", "Toronto", "Ottawa", 
                "Vancouver", "Las Vegas", "Charleston", "Anchorage", "Washington", 
                "Mississauga", "Fargo", "Biloxi"
              ].map((city, index) => (
                <MenuItem key={index} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Hotel Chain</InputLabel>
            <Select
              value={searchCriteria.hotelChain}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, hotelChain: e.target.value })}
            >
              <MenuItem value="North Star Hotels">North Star Hotels</MenuItem>
              <MenuItem value="Golden Horizon">Golden Horizon</MenuItem>
              <MenuItem value="Sunrise Inns">Sunrise Inns</MenuItem>
              <MenuItem value="Blue Moon Resorts">Blue Moon Resorts</MenuItem>
              <MenuItem value="Eagle Wings Lodgings">Eagle Wings Lodgings</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Amenities</InputLabel>
            <Select
              multiple
              value={searchCriteria.amenities}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, amenities: e.target.value })}
            >
              {Object.values([
                'Wi-Fi', 'TV', 'Fridge', 'Air Conditioner', 'Safe (Locker)', 'Pet-Friendly'
              ].map((amenities, index) => (
                <MenuItem key={index} value={amenities}>{amenities}</MenuItem>
              )))}.Available_Rooms_Per_Area
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price Min"
            type="number"
            value={searchCriteria.minPrice}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, minPrice: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price Max"
            type="number"
            value={searchCriteria.maxPrice}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, maxPrice: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>View</InputLabel>
            <Select
              value={searchCriteria.view}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, view: e.target.value })}
            >
              {[
                'Sea', 'Mountain', 'Normal'
              ].map((view, index) => (
                <MenuItem key={index} value={view}>{view}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Rating"
            type="number"
            value={searchCriteria.rating}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, rating: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox checked={searchCriteria.extendable} onChange={(e) => setSearchCriteria({ ...searchCriteria, extendable: e.target.checked })} />}
            label="Extendable Rooms"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={isSearchDisabled}>
            Search
          </Button>
        </Grid>
      </Grid>
      {/* Render filtered hotels */}
      <div className="hotel-list">
        {filteredHotels.map(hotel => (
          <HotelComponent key={hotel.id} hotel={hotel} date={[searchCriteria.startDate, searchCriteria.endDate]}/>
        ))}
      </div>
    </div>
  );
}

export default HotelSearch;
