SELECT 
    individual_hotel.hotelid AS hotel_identifier,
	individual_hotel.street_number || ' ' || individual_hotel.street_name AS hotel_address,
    hotel_chain.name AS chain_name,
	individual_hotel.star_rating,
    avg_prices.avg_price
FROM 
    individual_hotel
JOIN 
    hotel_chain ON individual_hotel.chainid = hotel_chain.chainid
JOIN (
    SELECT 
        hotelid, 
        AVG(price) AS avg_price
    FROM 
        room
    GROUP BY 
        hotelid
) avg_prices ON individual_hotel.hotelid = avg_prices.hotelid
WHERE 
    individual_hotel.star_rating > 3 AND 
    avg_prices.avg_price >= 150;