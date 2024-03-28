import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';

function AvailableRoomsPerArea() {
  const [aggregatedCapacity, setAggregatedCapacity] = useState([]);

  useEffect(() => {
    const fetchAggregatedCapacity = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/aggregated-capacity-per-hotel');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAggregatedCapacity(data);
      } catch (error) {
        console.error('Error fetching aggregated capacity per hotel:', error);
      }
    };

    fetchAggregatedCapacity();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="aggregated-capacity-table">
        <TableHead>
          <TableRow>
            <TableCell>Hotel ID</TableCell>
            <TableCell>Total Capacity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aggregatedCapacity
            .sort((a, b) => a.hotelid - b.hotelid) // Sort the capacities by hotelid
            .map((capacity, index) => (
              <TableRow key={index}>
                <TableCell>{capacity.hotelid}</TableCell>
                <TableCell>{capacity.total_capacity}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AvailableRoomsPerArea;
