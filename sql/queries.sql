-- Assign Driver to Ride

UPDATE rides 
SET driver_id = 1
WHERE id = '24d23fda-3319-47cb-ac39-970edfbf373f';


--- Update Ride Status
CREATE OR REPLACE FUNCTION create_payment_on_completion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status IS DISTINCT FROM 'completed' THEN
        
        INSERT INTO payments (ride_id, status, method, amount)
        VALUES (
            NEW.id,
            'completed',
            'cash',
            100.00
        );

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_create_payment
AFTER UPDATE ON rides
FOR EACH ROW
EXECUTE FUNCTION create_payment_on_completion();


UPDATE rides 
SET status = 'completed', completed_at = CURRENT_TIMESTAMP
WHERE id = 'ea7a5e70-11d3-4553-bd3c-5408146a2801';


ALTER TABLE payments ADD COLUMN amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00;


ALTER TABLE drivers add column is_available BOOLEAN DEFAULT TRUE;