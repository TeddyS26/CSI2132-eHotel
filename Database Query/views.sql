-- View for the number of available rooms per area
CREATE VIEW Available_Rooms_Per_Area AS
SELECT ih.city, ih.state, COUNT(r.room_number) AS available_rooms
FROM Individual_hotel ih
JOIN Room r ON ih.hotelId = r.hotelId
LEFT JOIN Booking_Renting br ON r.hotelId = br.hotelId AND r.room_number = br.room_number
WHERE br.bookingId IS NULL
GROUP BY ih.city, ih.state;

-- View for the aggregated capacity of all the rooms of a specific hotel
CREATE VIEW Aggregated_Capacity_Per_Hotel AS
SELECT ih.hotelId, SUM(CASE WHEN r.capacity = 'Single' THEN 1
                           WHEN r.capacity = 'Double' THEN 2
                           WHEN r.capacity = 'Twin' THEN 2
                           WHEN r.capacity = 'Queen' THEN 2
                           WHEN r.capacity = 'King' THEN 2
                           ELSE 0 END) AS total_capacity
FROM Individual_hotel ih
JOIN Room r ON ih.hotelId = r.hotelId
GROUP BY ih.hotelId;