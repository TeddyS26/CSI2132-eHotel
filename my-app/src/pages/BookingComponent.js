import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography, CardHeader } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

function BookingComponent() {
  const [customerInfo, setcustomerInfo] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    street_name: '',
    street_number: '',
    apt_number: 1,
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

  const [bookingInfo, setBookingInfo] = useState({
    customerid: '',
    hotelid: location.state.hotel.hotelid,
    roomid: location.state.hotel.room_number,
    startdate: location.state.date[0],
    enddate: location.state.date[1],
    guests: '',
  });


  const handleInputChange = (field, value) => {
    setcustomerInfo(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleInputChange2 = (field, value) => {
    setBookingInfo(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleBooking = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/add_customer`, {method : "POST", headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerInfo)});
      if (!response.ok) {
        throw new Error('Failed to add customer');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/add_booking`, {method : "POST", headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingInfo)});
      if (!response.ok) {
        throw new Error('Failed to add booking');
      }
    } catch (error) {
      console.error('Error adding booking:', error);
    }
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
            value={customerInfo.first_name}
            onChange={(e) => handleInputChange('first_name', e.target.value)}
            fullWidth
            inputProps={{ pattern: "[A-Za-z]+" }}
            error={!/^[A-Za-z]+$/.test(customerInfo.first_name)}
            helperText={!/^[A-Za-z]+$/.test(customerInfo.first_name) ? "Only alphabetic characters allowed" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Middle Name"
            value={customerInfo.middle_name}
            onChange={(e) => handleInputChange('middle_name', e.target.value)}
            fullWidth
            inputProps={{ pattern: "[A-Za-z]*" }}
            error={!/^[A-Za-z]*$/.test(customerInfo.middle_name)}
            helperText={!/^[A-Za-z]*$/.test(customerInfo.middle_name) ? "Only alphabetic characters allowed" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Last Name"
            value={customerInfo.last_name}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
            fullWidth
            inputProps={{ pattern: "[A-Za-z]+" }}
            error={!/^[A-Za-z]+$/.test(customerInfo.last_name)}
            helperText={!/^[A-Za-z]+$/.test(customerInfo.last_name) ? "Only alphabetic characters allowed" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Street Number"
            value={customerInfo.street_number}
            onChange={(e) => handleInputChange('street_number', e.target.value)}
            fullWidth
            inputProps={{ pattern: "[0-9]+" }}
            error={!/^[0-9]+$/.test(customerInfo.street_number)}
            helperText={!/^[0-9]+$/.test(customerInfo.street_number) ? "Only numeric characters allowed" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Street Name"
            value={customerInfo.street_name}
            onChange={(e) => handleInputChange('street_name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Postal Code"
            value={customerInfo.zip}
            onChange={(e) => handleInputChange('zip', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            value={customerInfo.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            fullWidth
            inputProps={{ pattern: "[A-Za-z]+" }}
            error={!/^[A-Za-z]+$/.test(customerInfo.city)}
            helperText={!/^[A-Za-z]+$/.test(customerInfo.city) ? "Only alphabetic characters allowed" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            value={customerInfo.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            fullWidth
            inputProps={{ pattern: "[A-Za-z]{2}" }}
            error={!/^[A-Za-z]{2}$/.test(customerInfo.state)}
            helperText={!/^[A-Za-z]{2}$/.test(customerInfo.state) ? "State must be 2 letters" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Country"
            value={customerInfo.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            fullWidth
            inputProps={{ pattern: "[A-Za-z]+" }}
            error={!/^[A-Za-z]+$/.test(customerInfo.country)}
            helperText={!/^[A-Za-z]+$/.test(customerInfo.country) ? "Only alphabetic characters allowed" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="SSN/SIN"
            value={customerInfo.ssn_sin}
            onChange={(e) => {
              handleInputChange('ssn_sin', e.target.value); handleInputChange2('customerid', e.target.value);
            }}
            fullWidth
            inputProps={{ pattern: "[0-9]{9}" }}
            error={!/^[0-9]{9}$/.test(customerInfo.ssn_sin)}
            helperText={!/^[0-9]{9}$/.test(customerInfo.ssn_sin) ? "SSN/SIN must be 9 digits" : ""}
          />
        </Grid>
      </Grid>
        <h2>Booking Information</h2>
      <Grid container spacing={1} style={{"width" : "90%"}}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Booking Start Date"
            type="date"
            value={location.state.date[0]}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Booking End Date"
            type="date"
            value={location.state.date[1]}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Number of Guests"
            value={bookingInfo.guests}
            onChange={(e) => handleInputChange2('guests', e.target.value)}
            fullWidth
            inputProps={{ pattern: "[0-9]+" }}
            error={!/^[0-9]+$/.test(bookingInfo.guests)}
            helperText={!/^[0-9]+$/.test(bookingInfo.guests) ? "Only numeric characters allowed" : ""}
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
