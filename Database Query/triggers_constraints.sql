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

-- Trigger function for updating the room status when a customers card information is updated
CREATE OR REPLACE FUNCTION update_room_status_after_card_update()
RETURNS TRIGGER AS $$
BEGIN
    RAISE NOTICE 'Updating room status of booking ID: %', NEW.bookingId;
    IF (OLD.card_number <> NEW.card_number) OR (OLD.expiration_date <> NEW.expiration_date) OR (OLD.cvv <> NEW.cvv) THEN
        RAISE NOTICE 'Updating room status to renting.';
        NEW.status := 'Renting';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for the function update_room_status_after_card_update
CREATE TRIGGER UpdateRoomStatusAfterCardUpdate
BEFORE UPDATE OF card_number, expiration_date, cvv ON Booking_Renting
FOR EACH ROW EXECUTE FUNCTION update_room_status_after_card_update();
