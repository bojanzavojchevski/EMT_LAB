CREATE MATERIALIZED VIEW accommodation_category_stats_view AS
SELECT
    a.category AS category,
    COUNT(a.id) AS total_accommodations,
    COALESCE(SUM(a.num_rooms), 0) AS total_rooms,
    COALESCE(ROUND(AVG(a.num_rooms), 2), 0) AS average_rooms
FROM accommodations a
GROUP BY a.category;

CREATE UNIQUE INDEX idx_accommodation_category_stats_category
    ON accommodation_category_stats_view (category);