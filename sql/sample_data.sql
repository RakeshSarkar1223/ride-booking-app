INSERT INTO drivers (name, email, dob, location, phone) VALUES
('Rahul Sharma', 'rahul.sharma1@example.com', '1990-05-12', 'Kolkata', '9876543210'),
('Amit Das', 'amit.das2@example.com', '1988-09-23', 'Howrah', '9876543211'),
('Sourav Roy', 'sourav.roy3@example.com', '1992-11-15', 'Salt Lake', '9876543212'),
('Arjun Singh', 'arjun.singh4@example.com', '1985-07-30', 'Durgapur', '9876543213'),
('Rakesh Verma', 'rakesh.verma5@example.com', '1993-02-18', 'Asansol', '9876543214'),
('Manoj Kumar', 'manoj.kumar6@example.com', '1987-06-25', 'Siliguri', '9876543215'),
('Vikram Gupta', 'vikram.gupta7@example.com', '1991-12-05', 'Bardhaman', '9876543216'),
('Ankit Jain', 'ankit.jain8@example.com', '1994-03-14', 'Kharagpur', '9876543217'),
('Deepak Yadav', 'deepak.yadav9@example.com', '1989-08-21', 'Haldia', '9876543218'),
('Rohit Mishra', 'rohit.mishra10@example.com', '1995-01-10', 'Malda', '9876543219');


SELECT * FROM drivers;


INSERT INTO cabs (driver_id, license_plate, model, color) VALUES
(1, 'WB01AB1234', 'Maruti Suzuki Swift', 'White'),
(2, 'WB02CD5678', 'Hyundai i20', 'Red'),
(3, 'WB03EF9012', 'Tata Nexon', 'Blue'),
(4, 'WB04GH3456', 'Honda City', 'Black'),
(5, 'WB05IJ7890', 'Maruti Suzuki WagonR', 'Silver'),
(6, 'WB06KL1122', 'Toyota Innova', 'White'),
(7, 'WB07MN3344', 'Mahindra XUV300', 'Grey'),
(8, 'WB08OP5566', 'Hyundai Creta', 'Black'),
(9, 'WB09QR7788', 'Tata Punch', 'Orange'),
(10, 'WB10ST9900', 'Kia Seltos', 'Blue');

SELECT * FROM cabs;


INSERT INTO rides (user_id, driver_id, source, destination, status) VALUES
(1, 1, 'Salt Lake', 'Dumdum', 'completed'),
(1, 2, 'Kolkata Airport', 'New Town', 'in_progress'),
(1, 3, 'Howrah Station', 'Garia', 'requested'),
(1, 4, 'Durgapur', 'Asansol', 'cancelled'),
(1, 5, 'Siliguri', 'Kharagpur', 'completed'),
(1, 6, 'Bardhaman', 'Haldia', 'accepted'),
(1, 7, 'Kharagpur', 'Malda', 'requested'),
(1, 8, 'Haldia', 'Salt Lake', 'completed'),
(1, 9, 'Malda', 'Dumdum', 'in_progress'),
(1, 10, 'New Town', 'Kolkata Airport', 'cancelled');


SELECT * FROM rides;



INSERT INTO payments (ride_id, status, method) VALUES
('42b6b8bb-9239-4de2-9c09-7666a4168d1e', 'completed', 'card'),
('42b6b8bb-9239-4de2-9c09-7666a4168d1e', 'failed', 'cash'),
('42b6b8bb-9239-4de2-9c09-7666a4168d1e', 'pending', 'upi');

select * from payments;



INSERT INTO users (name, email, phone, language) VALUES
('Rakesh Sarkar', 'rakesh.sarkar1@example.com', '9000000001', 'Bengali'),
('Ananya Sen', 'ananya.sen2@example.com', '9000000002', 'English'),
('Priya Mukherjee', 'priya.m3@example.com', '9000000003', 'Hindi'),
('Rahul Banerjee', 'rahul.b4@example.com', '9000000004', 'Bengali'),
('Sneha Das', 'sneha.d5@example.com', '9000000005', 'English'),
('Arindam Ghosh', 'arindam.g6@example.com', '9000000006', 'Bengali'),
('Pooja Sharma', 'pooja.s7@example.com', '9000000007', 'Hindi'),
('Suman Dutta', 'suman.d8@example.com', '9000000008', 'Bengali'),
('Neha Gupta', 'neha.g9@example.com', '9000000009', 'English'),
('Kunal Verma', 'kunal.v10@example.com', '9000000010', 'Hindi');


SELECT * FROM users;



INSERT INTO ratings (user_id, ride_id, driver_id, rating, comment) VALUES
(1, '74ebb097-bb61-4e76-9ee2-81697a17531e', 1, 5, 'Excellent ride'),
(2, '039bbb79-c7fb-4942-81d2-2fc9a74925d2', 2, 4, 'Very smooth driving'),
(3, 'ea7a5e70-11d3-4553-bd3c-5408146a2801', 3, 3, 'Average experience'),
(4, '9479f493-f8bb-4c5b-b2a7-ed5144448eb2', 4, 2, 'Driver was late'),
(5, 'f1150474-5ca0-4a45-967c-54aee1baa095', 5, 5, 'Awesome ride'),
(6, 'b5eb593f-f312-4abd-98e2-e587bd66aae8', 6, 4, 'Good service'),
(7, '24d23fda-3319-47cb-ac39-970edfbf373f', 7, 5, 'Very comfortable'),
(8, '68c6b133-0fdf-4727-9905-1c858cfad377', 8, 3, 'Okay ride'),
(9, '42b6b8bb-9239-4de2-9c09-7666a4168d1e', 9, 4, 'Nice behavior'),
(10,'7debfc38-6eba-467d-bf7c-16e3a55c38b0', 10, 5, 'Perfect experience');

SELECT * FROM ratings;