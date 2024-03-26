import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography, CardHeader } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

function BookingComponent() {
  const [bookingInfo, setBookingInfo] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    street_name: '',
    street_number: '',
    zip: '',
    city: '',
    state: '',
    country: '',
    date_of_registration: new Date().toDateString(),
    startdate: '',
    enddate: '',
    guests: '',
    ssn_sin: ''
  });

  const location = useLocation();

  const handleInputChange = (field, value) => {
    setBookingInfo(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleBooking = () => {
    // Implement booking functionality
    console.log(bookingInfo);
    // Redirect to success page or perform other operations
  };

  return (
    <div className="booking-container" style={{"marginLeft" : "5%"}}>
      <Card style={{"width" : "90%"}}>
        <CardHeader
          title="Selected Room"
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            Room #{location.state.hotel.room_number}
          </Typography>
          <Typography color="textSecondary">
            Chain Name: {location.state.hotel.chain_name}
          </Typography>
          <Typography color="textSecondary">
            Price: ${location.state.hotel.price}
          </Typography>
          <Typography color="textSecondary">
            Capacity: {location.state.hotel.capacity}
          </Typography>
          <Typography color="textSecondary">
            View: {location.state.hotel.view}
          </Typography>
          <Typography color="textSecondary">
            Amenities: {location.state.hotel.amenities}
          </Typography>
          <Typography color="textSecondary">
            Address: {location.state.hotel.hotel_address}, {location.state.hotel.city}
          </Typography>
          <Typography color="textSecondary">
            Star Rating: {location.state.hotel.star_rating}
          </Typography>
          <Typography color="textSecondary">
            Extendable: {location.state.hotel.extendable ? "Yes" : "No"}
          </Typography>
        </CardContent>
      </Card>

      <h2>Customer Information</h2>
      <Grid container spacing={1} style={{"width" : "90%"}}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="First Name"
            value={bookingInfo.first_name}
            onChange={(e) => handleInputChange('first_name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Middle Name"
            value={bookingInfo.last_name}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Last Name"
            value={bookingInfo.last_name}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Street Number"
            value={bookingInfo.street_number}
            onChange={(e) => handleInputChange('street_number', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Street Name"
            value={bookingInfo.street_name}
            onChange={(e) => handleInputChange('street_name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Postal Code"
            value={bookingInfo.zip}
            onChange={(e) => handleInputChange('zip', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            value={bookingInfo.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            value={bookingInfo.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Country"
            value={bookingInfo.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="SSN/SIN"
            value={bookingInfo.ssn_sin}
            onChange={(e) => handleInputChange('ssn_sin', e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
        <h2>Booking Information</h2>
      <Grid container spacing={1} style={{"width" : "90%"}}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Booking Start Date"
            type="date"
            value={bookingInfo.startdate}
            onChange={(e) => handleInputChange('startdate', e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Booking End Date"
            type="date"
            value={bookingInfo.registraenddatetionDate}
            onChange={(e) => handleInputChange('enddate', e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Number of Guestes"
            value={bookingInfo.guests}
            onChange={(e) => handleInputChange('guests', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleBooking}>
            Book Now
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default BookingComponent;
