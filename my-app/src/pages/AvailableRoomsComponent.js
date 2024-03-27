import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';

function AvailableRoomsPerArea() {
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/available-rooms-per-area');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAvailableRooms(data);
      } catch (error) {
        console.error('Error fetching available rooms per area:', error);
      }
    };

    fetchAvailableRooms();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="available-rooms-table">
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Available Rooms</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {availableRooms.map((room, index) => (
            <TableRow key={index}>
              <TableCell>{room.city}</TableCell>
              <TableCell>{room.state}</TableCell>
              <TableCell>{room.available_rooms}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AvailableRoomsPerArea;
