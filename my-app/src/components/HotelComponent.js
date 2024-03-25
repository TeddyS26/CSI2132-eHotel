// HotelComponent.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { useNavigate  } from 'react-router-dom';

function HotelComponent({ hotel }) {
  const navigate = useNavigate ();

  const [name] = useState(hotel.name)
  const [location] = useState(hotel.location)
  const [price] = useState(hotel.price)

  const handleBook = () => {
    // Redirect to booking page with hotel information
    navigate("/booking", {state : {name, location, price}});
  };


  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {hotel.name}
        </Typography>
        <Typography color="textSecondary">
          Location: {hotel.location}
        </Typography>
        <Typography color="textSecondary">
          Price: {hotel.price}
        </Typography>
        {/* Add more information about the hotel */}
        <Button variant="contained" color="primary" onClick={handleBook}>
          Book
        </Button>
      </CardContent>
    </Card>
  );
}

export default HotelComponent;
