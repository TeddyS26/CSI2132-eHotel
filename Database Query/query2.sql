SELECT
	individual_hotel.hotelid AS hotel_identifier,
	room.price,
	room.amenities,
	room.capacity,
	room.comment,
	individual_hotel.street_number || ' ' || individual_hotel.street_name AS hotel_address,
	hotel_chain.name
FROM room
JOIN
	individual_hotel ON room.hotelid=individual_hotel.hotelid
JOIN
	hotel_chain ON individual_hotel.chainid=hotel_chain.chainid
WHERE
	room.amenities = 'Wi-Fi' OR
	room.amenities = 'Wi-Fi, Safe (Locker)';
	