import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

function BookingComponent() {
  const [bookingInfo, setBookingInfo] = useState({
    firstName: '',
    lastName: '',
    streetName: '',
    streetNumber: '',
    postalCode: '',
    city: '',
    country: '',
    idType: '',
    bookingStartDate: '',
    bookingEndDate: '',
    guests: '',
    phoneNumber: '',
    email: '',
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
        <CardContent>
          <Typography variant="h5" component="h2">
            {location.state.name}
          </Typography>
          <Typography color="textSecondary">
            Location: {location.state.location}
          </Typography>
          <Typography color="textSecondary">
            Price: {location.state.price}
          </Typography>
        </CardContent>
      </Card>
      <h2>Customer Information</h2>
      <Grid container spacing={1} style={{"width" : "90%"}}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            value={bookingInfo.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            value={bookingInfo.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Street Name"
            value={bookingInfo.streetName}
            onChange={(e) => handleInputChange('streetName', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Street Number"
            value={bookingInfo.streetNumber}
            onChange={(e) => handleInputChange('streetNumber', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Postal Code"
            value={bookingInfo.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
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
            label="Country"
            value={bookingInfo.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ID Type"
            value={bookingInfo.idType}
            onChange={(e) => handleInputChange('idType', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            value={bookingInfo.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            value={bookingInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
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
            value={bookingInfo.bookingStartDate}
            onChange={(e) => handleInputChange('bookingStartDate', e.target.value)}
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
            value={bookingInfo.registrabookingEndDatetionDate}
            onChange={(e) => handleInputChange('bookingEndDate', e.target.value)}
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
