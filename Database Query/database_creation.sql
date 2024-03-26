-- Customer Table
CREATE TABLE Customer (
    ssn_sin VARCHAR(9) NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    street_number INT NOT NULL CHECK (street_number > 0),
    street_name VARCHAR(255) NOT NULL,
    apt_number INT CHECK (apt_number > 0),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    date_of_registration DATE NOT NULL
);

-- Hotel_chain Table
CREATE TABLE Hotel_chain (
    chainId SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number_of_hotels INT NOT NULL,
    street_number INT NOT NULL CHECK (street_number > 0),
    street_name VARCHAR(255) NOT NULL,
    apt_number INT CHECK (apt_number > 0),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip VARCHAR(10) NOT NULL
);

-- Hotel_chain_emails Table
CREATE TABLE Hotel_chain_emails (
    emailId SERIAL PRIMARY KEY,
    chainId INT NOT NULL,
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    FOREIGN KEY (chainId) REFERENCES Hotel_chain(chainId)
);

-- Hotel_chain_phone Table
CREATE TABLE Hotel_chain_phone (
    phoneId SERIAL PRIMARY KEY,
    chainId INT NOT NULL,
    phone_number VARCHAR(10) NOT NULL CHECK (phone_number ~ '^[0-9]{10}$'),
    FOREIGN KEY (chainId) REFERENCES Hotel_chain(chainId)
);

-- Individual_hotel Table
CREATE TABLE Individual_hotel (
    hotelId SERIAL PRIMARY KEY,
    star_rating INT NOT NULL CHECK (star_rating BETWEEN 1 AND 5),
    number_of_rooms INT NOT NULL CHECK (number_of_rooms > 0),
    street_number INT NOT NULL CHECK (street_number > 0),
    street_name VARCHAR(255) NOT NULL,
    apt_number INT CHECK (apt_number > 0),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    chainId INT NOT NULL,
    FOREIGN KEY (chainId) REFERENCES Hotel_chain(chainId)
);

-- Employee Table
CREATE TABLE Employee (
    ssn_sin VARCHAR(9) NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    street_number INT NOT NULL CHECK (street_number > 0),
    street_name VARCHAR(255) NOT NULL,
    apt_number INT CHECK (apt_number > 0),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    role VARCHAR(255) NOT NULL,
    hotelId INT NOT NULL,
    FOREIGN KEY (hotelId) REFERENCES Individual_hotel(hotelId)
);

-- StaysAt Table
CREATE TABLE StaysAt (
    customerSSN_SIN VARCHAR(9) NOT NULL,
    hotelId INT NOT NULL,
    PRIMARY KEY (customerSSN_SIN, hotelId),
    FOREIGN KEY (customerSSN_SIN) REFERENCES Customer(ssn_sin),
    FOREIGN KEY (hotelId) REFERENCES Individual_hotel(hotelId)
);

-- Room Table
CREATE TABLE Room (
    hotelId INT NOT NULL,
    room_number INT NOT NULL,
    view VARCHAR(255) NOT NULL,
    extendable BOOLEAN NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price > 0 AND price <= 99999.99),
    comment TEXT,
    amenities TEXT NOT NULL,
    capacity TEXT NOT NULL,
    not_available_dates DATEMULTIRANGE NOT NULL,
    PRIMARY KEY (hotelId, room_number),
    FOREIGN KEY (hotelId) REFERENCES Individual_hotel(hotelId)
);

-- Booking/Renting Table
CREATE TABLE Booking_Renting (
    bookingId SERIAL PRIMARY KEY,
    customerSSN_SIN VARCHAR(9) NOT NULL,
    hotelId INT NOT NULL,
    room_number INT NOT NULL CHECK (room_number > 0),
    status VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    card_number VARCHAR(19),
    expiration_date DATE,
    cvv INT,
    employeeSSN_SIN VARCHAR(9) NOT NULL,
    FOREIGN KEY (customerSSN_SIN) REFERENCES Customer(ssn_sin),
    FOREIGN KEY (hotelId, room_number) REFERENCES Room(hotelId, room_number),
    FOREIGN KEY (employeeSSN_SIN) REFERENCES Employee(ssn_sin)
);

-- Archive Table
CREATE TABLE Archive (
    archiveId SERIAL PRIMARY KEY,
    bookingId INT NOT NULL,
    customerSSN_SIN VARCHAR(9) NOT NULL,
    hotelId INT NOT NULL,
    room_number INT NOT NULL CHECK (room_number > 0),
    status VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    FOREIGN KEY (bookingId) REFERENCES Booking_Renting(bookingId),
    FOREIGN KEY (customerSSN_SIN) REFERENCES Customer(ssn_sin),
    FOREIGN KEY (hotelId) REFERENCES Individual_hotel(hotelId)
);