import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core'; // Import FormControlLabel and Checkbox
import HotelComponent from '../components/HotelComponent'; // Import the updated HotelComponent
import '../styles/HotelSearch.css'; // Import custom CSS for styling

// Sample hotel data
const sampleHotels = [
  { id: 1, name: 'Hotel 1', location: 'Location 1', price: 100, amenities: ['Pool', 'Gym'], rating: 4 },
  { id: 2, name: 'Hotel 2', location: 'Location 2', price: 120, amenities: ['Spa', 'Free WiFi'], rating: 3 },
  { id: 3, name: 'Hotel 3', location: 'Location 3', price: 150, amenities: ['Restaurant', 'Bar'], rating: 5 },
  // Add more sample hotels as needed
];

function HotelSearch() {
  const [searchCriteria, setSearchCriteria] = useState({
    startDate: '',
    endDate: '',
    capacity: '',
    location: '',
    hotelChain: '',
    amenities: [],
    priceMin: '',
    priceMax: '',
    view: '',
    rating: '',
    extendable: false,
  });
  const [filteredHotels, setFilteredHotels] = useState([]);

  const handleSearch = () => {
    // Filter hotels based on search criteria (replace with actual implementation)
    // For now, using sample data
    const filtered = sampleHotels.filter(hotel => hotel.location.includes(searchCriteria.location));
    setFilteredHotels(filtered);
  };

  return (
    <div className="search-container">
      <h2>Hotel Search</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Date"
            type="date"
            value={searchCriteria.startDate}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, startDate: e.target.value })}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="End Date"
            type="date"
            value={searchCriteria.endDate}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, endDate: e.target.value })}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Capacity"
            type="number"
            value={searchCriteria.capacity}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, capacity: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            value={searchCriteria.location}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, location: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Hotel Chain"
            value={searchCriteria.hotelChain}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, hotelChain: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Amenities</InputLabel>
            <Select
              multiple
              value={searchCriteria.amenities}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, amenities: e.target.value })}
            >
              <MenuItem value="Pool">Pool</MenuItem>
              <MenuItem value="Gym">Gym</MenuItem>
              {/* Add more amenities */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price Min"
            type="number"
            value={searchCriteria.priceMin}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, priceMin: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price Max"
            type="number"
            value={searchCriteria.priceMax}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, priceMax: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="View"
            value={searchCriteria.view}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, view: e.target.value })}
            fullWidth
          />
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
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
      {/* Render filtered hotels */}
      <div className="hotel-list">
        {filteredHotels.map(hotel => (
          <HotelComponent key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default HotelSearch;
