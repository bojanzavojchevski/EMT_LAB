CREATE TABLE activity_logs (
                               id BIGSERIAL PRIMARY KEY,
                               accommodation_name VARCHAR(255) NOT NULL,
                               event_time TIMESTAMP NOT NULL,
                               event_type VARCHAR(50) NOT NULL
);