// Routes.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HotelSearch from './pages/HotelSearch';
import BookingComponent from './pages/BookingComponent';
import EmployeeComponent from './pages/EmployeeComponent';
import AvailableRoomsComponent from './pages/AvailableRoomsComponent';
import CapacityComponent from './pages/CapacityComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HotelSearch/>} />
        <Route path="/booking" element={<BookingComponent/>} />
        <Route path="/employee" element={<EmployeeComponent/>} />
        <Route path="/availableRooms" element={<AvailableRoomsComponent/>} />
        <Route path="/capacity" element={<CapacityComponent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
