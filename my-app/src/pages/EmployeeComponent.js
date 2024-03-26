import React, { useState } from 'react';
import { MenuItem, Select, TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import '../styles/EmployeeComponent.css'; // Import custom CSS for styling

function EmployeeComponent() {
  const [employeeDetails, setEmployeeDetails] = useState({
    ssn_sin: ''
  });

  const [showAdditionalForms, setShowAdditionalForms] = useState({
    found : false,
    data : null
  }); // State to manage additional form visibility

  const handleEmployeeAction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get_booking?${new URLSearchParams(employeeDetails).toString()}`);
      if (!response.ok) {
        setShowAdditionalForms({...employeeDetails, found : false});
        throw new Error('Failed to get employee');
      }
      const data = await response.json();
      setShowAdditionalForms({found : true, data : data});
    } catch (error) {
      setShowAdditionalForms({...employeeDetails, found : false});
      console.error('Error getting employee:', error);
    }    
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...showAdditionalForms.data];
    updatedData[index][field] = value;
    setShowAdditionalForms({ ...showAdditionalForms, data: updatedData });
  };

  return (
    <div className="employee-container">
      <h2>Employee Login</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Employee SSN/SIN"
            value={employeeDetails.ssn_sin}
            onChange={(e) => setEmployeeDetails({ ...employeeDetails, ssn_sin: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleEmployeeAction}>
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* Conditionally render additional forms */}
      {showAdditionalForms.found && showAdditionalForms.data && (
        <div>
          <h3>Additional Forms</h3>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Customer Full Name</TableCell>
                  <TableCell>Customer SIN</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Card Number</TableCell>
                  <TableCell>CVV</TableCell>
                  <TableCell>Expiration Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showAdditionalForms.data.map((booking, index) => (
                  <TableRow key={index}>
                    <TableCell>{booking.bookingid}</TableCell>
                    <TableCell>{booking.startdate}</TableCell>
                    <TableCell>{booking.enddate}</TableCell>
                    <TableCell>
                      <TextField
                        value={booking.customer_full_name}
                        onChange={(e) => handleInputChange(index, 'customer_full_name', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>{booking.customer_sin}</TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                        fullWidth
                      >
                        <MenuItem value="Booked">Booked</MenuItem>
                        <MenuItem value="Rented">Rented</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={booking.card_number}
                        onChange={(e) => handleInputChange(index, 'card_number', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={booking.cvv}
                        onChange={(e) => handleInputChange(index, 'cvv', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="date"
                        value={booking.expiration_date}
                        onChange={(e) => handleInputChange(index, 'expiration_date', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default EmployeeComponent;
