CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    language VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    dob DATE NOT NULL,
    location VARCHAR(255),
    phone VARCHAR(15)
);

CREATE TABLE cabs (
    id SERIAL PRIMARY KEY,
    driver_id INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    license_plate VARCHAR(20) NOT NULL,
    model VARCHAR(50),
    color VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE ride_status AS ENUM (
    'requested',
    'accepted',
    'in_progress',
    'completed',
    'cancelled'
);

CREATE TABLE rides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    driver_id INT REFERENCES drivers(id) ON DELETE SET NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    status ride_status DEFAULT 'requested',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TYPE payment_method AS ENUM ('cash', 'upi', 'card');

CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

CREATE TABLE IF NOT EXISTS payments(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ride_id UUID NOT NULL REFERENCES rides(id),
    status payment_status DEFAULT 'pending',
    method payment_method NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS ratings(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id INT NOT NULL REFERENCES users(id),
    ride_id UUID NOT NULL REFERENCES rides(id),
    driver_id INT NOT NULL REFERENCES drivers(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);