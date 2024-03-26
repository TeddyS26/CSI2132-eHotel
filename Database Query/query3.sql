SELECT 
    individual_hotel.hotelid AS hotel_identifier,
	individual_hotel.street_number || ' ' || individual_hotel.street_name AS hotel_address,
    AVG(room.price) AS average_room_price
FROM 
    room
JOIN 
    individual_hotel ON room.hotelid = individual_hotel.hotelid
GROUP BY 
    individual_hotel.hotelid;