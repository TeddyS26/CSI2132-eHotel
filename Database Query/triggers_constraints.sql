-- Trigger function for check-out date must be later than the check-in date
CREATE OR REPLACE FUNCTION check_dates_before_insert_or_update()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.startDate >= NEW.endDate THEN
        RAISE EXCEPTION 'The start date must be earlier than the end date.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for the function check_dates_before_insert_or_update
CREATE TRIGGER CheckDatesBeforeInsertOrUpdate
BEFORE INSERT OR UPDATE ON Booking_Renting
FOR EACH ROW EXECUTE FUNCTION check_dates_before_insert_or_update();

-- Trigger function for checking room-related numbers are greater than 0
CREATE OR REPLACE FUNCTION check_room_numbers_before_insert_or_update()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.room_number <= 0 THEN
        RAISE EXCEPTION 'Room number must be greater than 0.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for the function check_room_numbers_before_insert_or_update
CREATE TRIGGER CheckRoomNumbersBeforeInsertOrUpdate
BEFORE INSERT OR UPDATE ON Room
FOR EACH ROW EXECUTE FUNCTION check_room_numbers_before_insert_or_update();

-- Alter table to add a check constraint for SSN format for Customer
ALTER TABLE Customer
ADD CONSTRAINT chk_ssn_format_customer
CHECK (ssn_sin ~ '^[0-9]{9}$');

-- Alter table to add a check constraint for SSN format for Employee
ALTER TABLE Employee
ADD CONSTRAINT chk_ssn_format_employee
CHECK (ssn_sin ~ '^[0-9]{9}$');

-- Alter table to add a check constraint for Booking/Renting status
ALTER TABLE Booking_Renting
ADD CONSTRAINT check_booking_status
CHECK (status IN ('Booked', 'Renting'));

-- Alter table to add a check constraint for Room view
ALTER TABLE Room
ADD CONSTRAINT check_room_view
CHECK (view IN ('Mountain', 'Sea', 'Normal'));