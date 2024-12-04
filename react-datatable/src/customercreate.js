import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, TextField, Typography, Button, Box, Grid2 } from '@mui/material';
import axios from 'axios';

export default function CustomerCreate() {
  const [newData, setNewData] = useState({
    fname: '',
    lname: '',
    phonenumber: '',
    email: '',
    position: '',
  });

  const [updateData, setUpdateData] = useState({
    customer_id: '',
    room_id: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/customers', newData);
      console.log('Data created successfully:', response.data);
      // Optionally, you can refresh the data or reset the form here
      setNewData({
        fname: '',
        lname: '',
        phonenumber: '',
        email: '',
        room_id: '',
      });
    } catch (error) {
      console.error('Error creating data:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
      }
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/api/customers/${updateData.customer_id}`, {
        room_id: updateData.room_id,
      });
      console.log('Data updated successfully:', response.data);
      // Optionally, you can refresh the data or reset the form here
      setUpdateData({
        customer_id: '',
        room_id: '',
      });
    } catch (error) {
      console.error('Error updating data:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  return (
    <React.Fragment>
    <Box sx={{ height: 30 }} />
      <CssBaseline />
      <Container maxWidth="xxlg" sx={{ p: 6 }}>
        <Typography variant="h6" gutterBottom component="div" align='left'>
          Create New Customer
        </Typography>
        <form onSubmit={handleCreateSubmit}>
          <Grid2 container spacing={6}>
            <Grid2 item xs={5} sm={6}>
              <TextField
                id="fname"
                name="fname"
                label="Fist Name"
                variant="outlined"
                fullWidth
                required
                value={newData.fname}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
                id="lname"
                name="lname"
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                value={newData.lname}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
                id="phonenumber"
                name="phonenumber"
                label="PhoneNumber"
                variant="outlined"
                fullWidth
                required
                value={newData.phonenumber}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={newData.email}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
                id="room_id"
                name="room_id"
                label="Room ID"
                variant="outlined"
                fullWidth
                required
                value={newData.room_id}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={12}>
              <Button type="submit" variant="contained" fullWidth>
                Create
              </Button>
            </Grid2>
          </Grid2>
        </form>
        <Typography variant="h6" gutterBottom component="div" align='left' sx={{ mt: 4 }}>
          Update Customer
        </Typography>
        <form onSubmit={handleUpdateSubmit}>
          <Grid2 container spacing={6}>
            <Grid2 item xs={12} lg={6}>
              <TextField
          id="customer_id"
          name="customer_id"
          label="Customer ID"
          variant="outlined"
          fullWidth
          required
          value={updateData.customer_id}
          onChange={handleUpdateInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
          id="room_id"
          name="room_id"
          label="Room ID"
          variant="outlined"
          fullWidth
          required
          value={updateData.room_id}
          onChange={handleUpdateInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={12}>
              <Button type="submit" variant="contained" fullWidth>
          Update
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Container>
    </React.Fragment>
  );
}
