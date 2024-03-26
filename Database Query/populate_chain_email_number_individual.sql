INSERT INTO Hotel_chain (name, number_of_hotels, street_number, street_name, city, state, zip)
VALUES
('North Star Hotels', 8, 112, 'North Avenue', 'Chicago', 'IL', '60601'),
('Golden Horizon', 8, 19, 'West Road', 'Toronto', 'ON', 'H1A 9C8'),
('Sunrise Inns', 8, 4020, 'East Street', 'New York', 'NY', '10001'),
('Blue Moon Resorts', 8, 314, 'South Boulevard', 'Montreal', 'QC', 'M2E 8P9'),
('Eagle Wings Lodgings', 8, 556, 'Mountain Path', 'Denver', 'CO', '80201');

INSERT INTO Hotel_chain_emails (chainId, email)
VALUES
(1, 'security@northstarhotels.com'),
(1, 'service@northstarhotels.com'),
(2, 'security@goldenhorizon.com'),
(2, 'service@goldenhorizon.com'),
(3, 'security@sunriseinns.com'),
(3, 'service@sunriseinns.com'),
(4, 'security@bluemoonresorts.com'),
(4, 'service@bluemoonresorts.com'),
(5, 'security@eaglesnestlodgings.com'),
(5, 'service@eaglesnestlodgings.com');

INSERT INTO Hotel_chain_phone (chainId, phone_number)
VALUES
(1, '3125550101'), -- Security
(1, '3125550103'), -- Customer Service
(2, '4155550202'), -- Security
(2, '4155550204'), -- Customer Service
(3, '2125550303'), -- Security
(3, '2125550305'), -- Customer Service
(4, '3055550404'), -- Security
(4, '3055550406'), -- Customer Service
(5, '3035550505'), -- Security
(5, '3035550507'); -- Customer Service

INSERT INTO Individual_hotel (star_rating, number_of_rooms, street_number, street_name, city, state, zip, email, chainId)
VALUES
-- North Star Hotels
(5, 5, 714, 'Lyon Street', 'Seattle', 'WA', '98101', 'seattle1@northstar.com', 1),
(5, 5, 39, 'Locust Terrace', 'Calgary', 'AB', 'T2P 5M5', 'calgary1@northstar.com', 1),
(4, 5, 352, 'Central Blvd', 'Los Angeles', 'CA', '90001', 'la1@northstar.com', 1),
(4, 5, 560, 'Maple Street', 'Edmonton', 'AB', 'T5K 0L1', 'edmonton1@northstar.com', 1),
(3, 5, 720, 'Bay Street', 'San Francisco', 'CA', '94111', 'sf1@northstar.com', 1),
(5, 5, 632, 'Pine Street', 'Portland', 'OR', '97204', 'portland1@northstar.com', 1),
(4, 5, 112, 'Elm Street', 'Victoria', 'BC', 'V8W 1P1', 'victoria1@northstar.com', 1),
(1, 5, 19, 'Oak Avenue', 'Halifax', 'NS', 'B3H 2P6', 'halifax1@northstar.com', 1),

-- Golden Horizon
(4, 5, 562, 'Peachtree Street', 'Atlanta', 'GA', '30301', 'atlanta1@goldenhorizon.com', 2),
(5, 5, 18, 'Crescent Avenue', 'Atlanta', 'GA', '30309', 'atlanta2@goldenhorizon.com', 2),
(4, 5, 456, 'Royal Street', 'New Orleans', 'LA', '70116', 'neworleans1@goldenhorizon.com', 2),
(5, 5, 58, 'Bourbon Street', 'New Orleans', 'LA', '70112', 'neworleans2@goldenhorizon.com', 2),
(2, 5, 556, 'Queen Street', 'Winnipeg', 'MB', 'R3B 1C3', 'winnipeg1@goldenhorizon.com', 2),
(4, 5, 124, 'King Street', 'Regina', 'SK', 'S4R 2H7', 'regina1@goldenhorizon.com', 2),
(3, 5, 11, 'First Avenue', 'Seattle', 'WA', '98101', 'seattle1@goldenhorizon.com', 2),
(5, 5, 7575, 'Second Avenue', 'Seattle', 'WA', '98104', 'seattle2@goldenhorizon.com', 2),

-- Sunrise Inns
(4, 5, 1300, 'Church Street', 'Nashville', 'TN', '37203', 'nashville1@sunriseinns.com', 3),
(5, 5, 4125, 'Music Square W', 'Nashville', 'TN', '37203', 'nashville2@sunriseinns.com', 3),
(4, 5, 152, 'Broadway', 'New York', 'NY', '10001', 'ny1@sunriseinns.com', 3),
(5, 5, 18, '7th Avenue', 'New York', 'NY', '10019', 'ny2@sunriseinns.com', 3),
(4, 5, 21, 'Granville Street', 'Saskatoon', 'SK', 'S7K 1N9', 'saskatoon1@sunriseinns.com', 3),
(1, 5, 125, 'Robson Street', 'Quebec City', 'QC', 'G1R 4P5', 'quebeccity1@sunriseinns.com', 3),
(4, 5, 4562, 'Collins Avenue', 'Miami', 'FL', '33140', 'miami1@sunriseinns.com', 3),
(3, 5, 7859, 'Ocean Drive', 'Miami', 'FL', '33139', 'miami2@sunriseinns.com', 3),

-- Blue Moon Resorts
(5, 5, 2100, 'Lake Shore Blvd W', 'Montreal', 'QC', 'H2Y 1C2', 'montreal1@bluemoonresorts.com', 4),
(4, 5, 4523, 'Bloor Street W', 'Toronto', 'ON', 'M5S 1S4', 'toronto3@bluemoonresorts.com', 4),
(5, 5, 12, 'Market Street', 'San Francisco', 'CA', '94103', 'sf1@bluemoonresorts.com', 4),
(4, 5, 156, 'Mission Street', 'San Francisco', 'CA', '94105', 'sf2@bluemoonresorts.com', 4),
(2, 5, 4230, 'Saint-Catherine St', 'Ottawa', 'ON', 'K1N 6N5', 'ottawa3@bluemoonresorts.com', 4),
(4, 5, 78, 'Sherbrooke St', 'Vancouver', 'BC', 'V6A 2E1', 'vancouver3@bluemoonresorts.com', 4),
(5, 5, 4561, 'The Strip', 'Las Vegas', 'NV', '89109', 'vegas1@bluemoonresorts.com', 4),
(1, 5, 12, 'Fremont Street', 'Las Vegas', 'NV', '89101', 'vegas2@bluemoonresorts.com', 4),

-- Eagle Wings Lodgings
(1, 5, 2900, 'W Georgia Street', 'Charleston', 'SC', '29401', 'charleston1@eaglewingslodgings.com', 5),
(4, 5, 3001, 'Denman Street', 'Anchorage', 'AK', '99501', 'anchorage1@eaglewingslodgings.com', 5),
(3, 5, 452, 'Dupont Circle', 'Washington', 'DC', '20036', 'dc1@eaglewingslodgings.com', 5),
(4, 5, 756, '14th Street NW', 'Washington', 'DC', '20005', 'dc2@eaglewingslodgings.com', 5),
(5, 5, 13, 'Stephen Ave', 'Mississauga', 'ON', 'L5B 2C9', 'mississauga1@eaglewingslodgings.com', 5),
(2, 5, 420, '17 Ave SW', 'Calgary', 'AB', 'T2S 0A5', 'calgary3@eaglewingslodgings.com', 5),
(5, 5, 89, 'Royal Mile', 'Fargo', 'ND', '58102', 'fargo1@eaglewingslodgings.com', 5),
(4, 5, 3600, 'Princes Street', 'Biloxi', 'MS', '39530', 'biloxi1@eaglewingslodgings.com', 5);