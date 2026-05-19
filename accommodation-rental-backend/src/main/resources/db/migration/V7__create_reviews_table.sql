CREATE TABLE reviews
(
    id               BIGSERIAL PRIMARY KEY,
    created_at       TIMESTAMP,
    updated_at       TIMESTAMP,

    comment          VARCHAR(1000) NOT NULL,
    rating           INTEGER       NOT NULL,
    accommodation_id BIGINT        NOT NULL,

    CONSTRAINT fk_reviews_accommodation
        FOREIGN KEY (accommodation_id)
            REFERENCES accommodations (id)
            ON DELETE CASCADE,

    CONSTRAINT chk_reviews_rating
        CHECK (rating >= 1 AND rating <= 5)
);