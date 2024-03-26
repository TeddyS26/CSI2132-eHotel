SELECT
	individual_hotel.hotelid AS hotel_identifier,
	employee.first_name || ' ' || employee.last_name AS manager_name,
	employee.middle_name,
	employee.role,
	individual_hotel.street_number || ' ' || individual_hotel.street_name AS hotel_address,
	hotel_chain.name AS chain_name
FROM
	employee
JOIN
	individual_hotel ON employee.hotelid=individual_hotel.hotelid
JOIN
	hotel_chain ON individual_hotel.chainid=hotel_chain.chainid
WHERE
	employee.role='Manager';