CREATE VIEW accommodation_details_view AS
SELECT
    a.id AS id,
    a.name AS accommodation_name,
    a.category AS category,
    a.num_rooms AS num_rooms,
    CONCAT(h.name, ' ', h.surname) AS host_full_name,
    c.name AS country_name
FROM accommodations a
         JOIN hosts h ON a.host_id = h.id
         JOIN countries c ON h.country_id = c.id;