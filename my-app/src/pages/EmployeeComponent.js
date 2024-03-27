import React, { useState } from 'react';
import { MenuItem, Select, TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import '../styles/EmployeeComponent.css'; // Import custom CSS for styling
import { useNavigate } from 'react-router-dom';

function EmployeeComponent() {
  const [employeeDetails, setEmployeeDetails] = useState({
    ssn_sin: ''
  });

  const [showAdditionalForms, setShowAdditionalForms] = useState({
    found : false,
    data : null
  }); // State to manage additional form visibility
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const navigate = useNavigate();

  const handleEmployeeAction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get_booking?${new URLSearchParams(employeeDetails).toString()}`);
      if (!response.ok) {
        setShowAdditionalForms({...employeeDetails, found : false});
        throw new Error('Failed to get employee');
      }
      const data = await response.json();
      if (data.length == 0){
        setShowAlert(true);
        setAlertSeverity('error');
        setAlertMessage('Employee SSN/SIN does not exist');
      }
      setShowAdditionalForms({found : true, data : data});
    } catch (error) {
      setShowAdditionalForms({...employeeDetails, found : false});
      setShowAlert(true);
      setAlertSeverity('error');
      setAlertMessage('Employee SSN/SIN does not exist');
      console.error('Error getting employee:', error);
    }    

    setTimeout(() => {
      setShowAlert(false);
      setAlertSeverity('');
      setAlertMessage('');
    }, 3000);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...showAdditionalForms.data];
    updatedData[index][field] = value;
    setShowAdditionalForms({ ...showAdditionalForms, data: updatedData });
  };

  const handleUpdate = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/update/${data.bookingid}`, {method : "PUT", headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)});
      setShowAlert(true);
      if (!response.ok) {
        setAlertSeverity('error');
        setAlertMessage('Error updating info');
        throw new Error('Failed to update data');
      }
      setAlertSeverity('success');
      setAlertMessage('Update successful!');
    } catch (error) {
      console.error('Error updating data:', error);
    }

    setTimeout(() => {
      setShowAlert(false);
      setAlertSeverity('');
      setAlertMessage('');
    }, 3000);
  };

  const handleRoomNumberSubmit = () => {
    // add fetch room info given employee ssn and room id. from ssn get hotel id.
    navigate(`/booking`, )
  };

  const handleAvailable = () => {
    // add fetch room info given employee ssn and room id. from ssn get hotel id.
    navigate(`/availableRooms`, )
  };
  const handleCapacity = () => {
    // add fetch room info given employee ssn and room id. from ssn get hotel id.
    navigate(`/capacity`, )
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
      {showAdditionalForms.found && showAdditionalForms.data && showAdditionalForms.data.length != 0 &&(
        <div>
          <h3>Book a Room</h3>
          <Grid item xs={12}>
            <TextField
              label="Enter Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              fullWidth
              required
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleRoomNumberSubmit} style={{marginTop : "1%"}}>
              Submit Room Number
            </Button>
          </Grid>
          <h3>Your Assigned Customers</h3>
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
                    <TableCell>{new Date(booking.startdate).toISOString().split('T')[0]}</TableCell>
                    <TableCell>{new Date(booking.enddate).toISOString().split('T')[0]}</TableCell>
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
                        <MenuItem value="Renting">Renting</MenuItem>
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
                        value={new Date(booking.expiration_date).toISOString().split('T')[0]}
                        onChange={(e) => handleInputChange(index, 'expiration_date', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained"  // Using a contained button style
                        color="primary"      // Setting the button color to primary (you can use 'secondary' or 'inherit' as well)
                        onClick={() => handleUpdate(booking)}
                        style={{ minWidth: '100px' }} // Set a minimum width for consistent button size
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
        {showAlert && (
          <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        )}
        
      <Button variant="contained" color="primary" onClick={handleAvailable} style={{"marginTop" : '1%'}}>
          View Number of available rooms per area
        </Button>
        <div>
        <Button variant="contained" color="primary" onClick={handleCapacity} style={{"marginTop" : '1%'}}>
          View Capacity of all Hotels
        </Button>
        </div>
        
    </div>
  );
}

export default EmployeeComponent;
