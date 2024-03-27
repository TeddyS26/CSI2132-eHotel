-- Index to to find a customer's information by there ID
-- This index helps reduce the need to constatly query for or maneully search for a certain customers information, especially when the table becomes large
CREATE INDEX idx_customerID ON Customer(ssn_sin);

-- Index on room status and room number 
-- Rooms are going to be constantly booked/rented, so this index helps reduce the time needed find rooms by their booking status
CREATE INDEX idx_status_room_number ON Booking_Renting(status, room_number);

-- Index on start dates and end dates in Booking_Renting table
-- Users typically use queries to find bookings within a certain date range, an index would help speed up the search
CREATE INDEX idx_startDate ON Booking_Renting(startDate);
CREATE INDEX idx_endDate ON Booking_Renting(endDate);