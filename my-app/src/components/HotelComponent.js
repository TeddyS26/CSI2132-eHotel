import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function HotelComponent({ hotel }) {
  const navigate = useNavigate();

  const handleBook = () => {
    // Redirect to booking page with hotel information
    navigate("/booking", { state: {hotel} });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {hotel.name}
        </Typography>
        <Typography color="textSecondary">
          Price: ${hotel.price}
        </Typography>
        <Typography color="textSecondary">
          Capacity: {hotel.capacity}
        </Typography>
        <Typography color="textSecondary">
          View: {hotel.view}
        </Typography>
        <Typography color="textSecondary">
          Amenities: {hotel.amenities}
        </Typography>
        <Typography color="textSecondary">
          City: {hotel.city}
        </Typography>
        <Typography color="textSecondary">
          Star Rating: {hotel.star_rating}
        </Typography>
        <Typography color="textSecondary">
          Chain Name: {hotel.chain_name}
        </Typography>
        {/* Render additional room details */}
        <Button variant="contained" color="primary" onClick={handleBook}>
          Book
        </Button>
      </CardContent>
    </Card>
  );
}

export default HotelComponent;
