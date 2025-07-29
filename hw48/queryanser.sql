-- Active: 1753537958217@@127.0.0.1@5000@hotel_management@public
CREATE DATABASE "hotel_management"

create table guests (
    guest_id SERIAL PRIMARY KEY, 
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    date_of_birth DATE,
    nationality TEXT,
    created_at DATE
)

create Table rooms (
    room_id SERIAL PRIMARY KEY,
    room_number INT,
    room_type TEXT,
    price_per_night INT,
    max_occupancy INT,
    is_available BOOLEAN,
    floor INT,
    description TEXT
)

create TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    guest_id int,
    room_id int,
    check_in_date DATE,
    check_out_date DATE,
    total_price DECIMAL(10,2),
    booking_status TEXT,
    payment_status TEXT,
    created_at DATE
)

ALTER TABLE guests ADD COLUMN loyalty_points INT;
ALTER TABLE bookings ADD COLUMN special_requests TEXT;
ALTER TABLE rooms ADD COLUMN amenities TEXT[];
ALTER TABLE rooms ADD COLUMN last_updated TIMESTAMP;
ALTER TABLE bookings ADD COLUMN discount_percentage DECIMAL(5,2);

INSERT INTO guests (
   first_name, last_name, email, phone, address, date_of_birth, nationality, created_at
) VALUES
  ('MinMin', 'Nguyen', 'minminnyen@email.com', '0123456789', '123 Tran Duy Hung, Ha Noi', '2002-03-15', 'VN', CURRENT_TIMESTAMP),
  ('Hoang', 'Pham', 'hoang.pham@email.com', '0987654321', '456 Le Loi, Da Nang', '1995-07-10', 'VN', CURRENT_TIMESTAMP),
  ('Linh', 'Tran', 'linh.tran@email.com', '0912345678', '789 Hai Ba Trung, Hue', '1998-12-01', 'VN', CURRENT_TIMESTAMP),
  ('John', 'Doe', 'john.doe@example.com', '11234567890', '123 Main St, New York, USA', '1990-01-01', 'US', CURRENT_TIMESTAMP),
  ('Mei', 'Chen', 'mei.chen@email.cn', '8612345678901', '88 Nanjing Rd, Shanghai', '1988-05-20', 'CN', CURRENT_TIMESTAMP);

INSERT INTO rooms (
  room_number, room_type, price_per_night, max_occupancy, is_available, floor, description
) VALUES
  ('101', 'standard', 89.99, 2, true, 1, 'Comfortable standard room with queen bed'),
  ('102', 'standard', 89.99, 2, true, 1, 'Standard room with twin beds'),
  ('103', 'deluxe', 129.99, 3, true, 1, 'Deluxe room with balcony and city view'),
  ('104', 'suite', 199.99, 4, false, 1, 'Spacious suite with living area and kitchenette'),
  ('201', 'standard', 89.99, 2, true, 2, 'Standard room with queen bed'),
  ('202', 'deluxe', 129.99, 3, true, 2, 'Deluxe room with large window'),
  ('203', 'suite', 199.99, 4, true, 2, 'Luxury suite with king bed and workspace'),
  ('301', 'standard', 89.99, 2, false, 3, 'Standard room recently renovated'),
  ('302', 'deluxe', 139.99, 3, true, 3, 'Deluxe room with extra amenities'),
  ('303', 'suite', 219.99, 4, true, 3, 'Premium suite with bathtub and city view');

INSERT INTO bookings (
  guest_id, room_id, check_in_date, check_out_date, total_price, booking_status, payment_status, created_at
) VALUES
  (1, 1, '2025-07-29', '2025-08-18', 269.97, 'completed', 'paid', '2023-06-20 10:30:00'),
  (2, 2, '2025-07-30', '2025-08-22', 179.98, 'checked_in', 'paid', '2023-06-25 14:10:00'),
  (3, 3, '2025-08-01', '2025-08-05', 519.96, 'cancelled', 'refunded', '2023-07-01 08:45:00'),
  (4, 4, '2025-08-10', '2025-08-12', 259.98, 'confirmed', 'pending', '2023-07-05 09:00:00'),
  (5, 1, '2023-08-15', '2023-08-20', 649.95, 'confirmed', 'paid', '2023-07-10 13:20:00'),
  (1, 6, '2023-09-01', '2023-09-03', 179.98, 'pending', 'unpaid', '2023-07-15 15:30:00'),
  (1, 7, '2023-09-05', '2023-09-06', 89.99, 'pending', 'unpaid', '2023-07-18 11:45:00'),
  (3, 8, '2023-09-10', '2023-09-12', 259.98, 'completed', 'paid', '2023-07-20 17:10:00'),
  (1, 3, '2023-10-01', '2023-10-03', 259.98, 'confirmed', 'paid', '2023-07-20 17:10:00');

SELECT * FROM guests

SELECT * FROM bookings

SELECT * FROM rooms

SELECT * FROM rooms WHERE price_per_night < 100

SELECT * FROM bookings WHERE booking_status = 'checked_in' OR booking_status = 'confirmed'

SELECT bookings.booking_id, guests.first_name, guests.last_name, guests.phone FROM bookings INNER JOIN guests ON bookings.guest_id = guests.guest_id

SELECT bookings.booking_id, rooms.room_id, rooms.room_number, rooms.room_type, rooms.description FROM bookings INNER JOIN rooms ON bookings.room_id = rooms.room_id

SELECT bookings.booking_id, guests.first_name, guests.last_name, guests.address, rooms.room_number, rooms.room_type FROM bookings INNER JOIN guests ON bookings.guest_id= guests.guest_id INNER JOIN rooms ON bookings.room_id = rooms.room_id

SELECT guests.guest_id, guests.last_name, guests.phone, bookings.room_id, bookings.booking_id FROM guests LEFT JOIN bookings ON guests.guest_id = bookings.guest_id

SELECT rooms.room_id, rooms.room_number, rooms.room_type, bookings.booking_id, bookings.room_id FROM rooms LEFT JOIN bookings ON rooms.room_id = bookings.room_id

SELECT bookings.booking_id, bookings.guest_id, guests.last_name, guests.phone FROM guests RIGHT JOIN bookings ON guests.guest_id = bookings.guest_id

SELECT bookings.booking_id, bookings.guest_id, rooms.room_number, rooms.room_type FROM rooms RIGHT JOIN bookings ON rooms.room_id = bookings.room_id

SELECT guests.guest_id, guests.last_name, guests.phone, bookings.room_id, bookings.booking_id FROM guests LEFT JOIN bookings ON guests.guest_id = bookings.guest_id WHERE booking_id IS NULL

SELECT rooms.room_id, rooms.room_number, rooms.room_type, bookings.booking_id, bookings.room_id FROM rooms LEFT JOIN bookings ON rooms.room_id = bookings.room_id WHERE booking_id IS NULL

SELECT guests.guest_id, guests.last_name, bookings.booking_id, bookings.check_in_date FROM guests INNER JOIN bookings ON guests.guest_id = bookings.guest_id WHERE DATE_TRUNC('month', bookings.check_in_date) = DATE_TRUNC('month', CURRENT_DATE);

SELECT rooms.room_id, rooms.room_number, bookings.booking_id, bookings.check_in_date FROM rooms INNER JOIN bookings ON rooms.room_id = bookings.room_id WHERE bookings.check_in_date >= date_trunc('week', current_date)
  AND bookings.check_in_date < date_trunc('week', current_date) + interval '7 days';

SELECT guests.guest_id, guests.first_name, guests.last_name, COUNT(bookings.booking_id) as total_bookings
FROM guests LEFT JOIN bookings ON guests.guest_id = bookings.guest_id 
GROUP BY guests.guest_id, guests.first_name, guests.last_name HAVING COUNT(bookings.booking_id) > 2

SELECT 
  r.room_id,
  r.room_number,
  r.room_type,
  r.price_per_night,
  COUNT(b.booking_id) AS total_bookings
FROM bookings b
RIGHT JOIN rooms r ON b.room_id = r.room_id
WHERE r.price_per_night > 200
  AND b.booking_id IS NOT NULL
GROUP BY r.room_id, r.room_number, r.room_type, r.price_per_night
HAVING COUNT(b.booking_id) >= 1


