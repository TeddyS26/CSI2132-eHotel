import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import '../styles/EmployeeComponent.css'; // Import custom CSS for styling

function EmployeeComponent() {
  const [employeeDetails, setEmployeeDetails] = useState({
    employeeName: '',
    role: '',
    hotel: '',
  });

  const handleEmployeeAction = () => {
    // Implement employee action functionality
  };

  return (
    <div className="employee-container">
      <h2>Employee Actions</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Employee Name"
            value={employeeDetails.employeeName}
            onChange={(e) => setEmployeeDetails({ ...employeeDetails, employeeName: e.target.value })}
            fullWidth
          />
        </Grid>
        {/* Similar TextField components for other employee details */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleEmployeeAction}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default EmployeeComponent;
