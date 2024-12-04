import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, TextField, Typography, Button, Box, Grid2 } from '@mui/material';
import axios from 'axios';

export default function RoomCreate() {
  const [newData, setNewData] = useState({
    roomtype: '',
    capacity: '',
    pricepernight: '',
    availability: '',
    keeper_id: '',
  });

  const [updateData, setUpdateData] = useState({
    room_id: '',
    availability: '',
    keeper_id: '',
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
      const response = await axios.post('http://localhost:3000/api/rooms', newData);
      console.log('Data created successfully:', response.data);
      // Optionally, you can refresh the data or reset the form here
      setNewData({
        roomtype: '',
        capacity: '',
        pricepernight: '',
        availability: '',
        keeper_id: '',
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
      const response = await axios.put(`http://localhost:3000/api/rooms/${updateData.room_id}`, {
        availability: updateData.availability,
        keeper_id: updateData.keeper_id,
      });
      console.log('Data updated successfully:', response.data);
      // Optionally, you can refresh the data or reset the form here
      setUpdateData({
        room_id: '',
        availability: '',
        keeper_id: '',
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
          Create Room
        </Typography>
        <form onSubmit={handleCreateSubmit}>
          <Grid2 container spacing={6}>
            <Grid2 item xs={5} sm={6}>
              <TextField
                id="roomtype"
                name="roomtype"
                label="Room Type"
                variant="outlined"
                fullWidth
                required
                value={newData.roomtype}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
                id="capacity"
                name="capacity"
                label="Capacity"
                variant="outlined"
                fullWidth
                required
                value={newData.capacity}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
                id="pricepernight"
                name="pricepernight"
                label="Price per Night"
                variant="outlined"
                fullWidth
                required
                value={newData.pricepernight}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
                id="availability"
                name="availability"
                label="Availability"
                variant="outlined"
                fullWidth
                required
                value={newData.availability}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
                id="keeper_id"
                name="keeper_id"
                label="Keeper ID"
                variant="outlined"
                fullWidth
                required
                value={newData.keeper_id}
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
          Update Room
        </Typography>
        <form onSubmit={handleUpdateSubmit}>
          <Grid2 container spacing={6}>
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
            <Grid2 item xs={12} lg={6}>
              <TextField
          id="availability"
          name="availability"
          label="Availability"
          variant="outlined"
          fullWidth
          required
          value={updateData.availability}
          onChange={handleUpdateInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} lg={6}>
              <TextField
          id="keeper_id"
          name="keeper_id"
          label="Keeper ID"
          variant="outlined"
          fullWidth
          required
          value={updateData.keeper_id}
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
