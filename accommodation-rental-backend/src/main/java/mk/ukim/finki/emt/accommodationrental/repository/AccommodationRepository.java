package mk.ukim.finki.emt.accommodationrental.repository;

import mk.ukim.finki.emt.accommodationrental.model.domain.Accommodation;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;
import mk.ukim.finki.emt.accommodationrental.model.projection.AccommodationExtendedProjection;
import mk.ukim.finki.emt.accommodationrental.model.projection.AccommodationShortProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long>
{

    @Query("""
            SELECT a
            FROM Accommodation a
            WHERE (:category IS NULL OR a.category = :category)
              AND (:hostId IS NULL OR a.host.id = :hostId)
              AND (:countryId IS NULL OR a.host.country.id = :countryId)
              AND (:numRooms IS NULL OR a.numRooms = :numRooms)
              AND (
                    :available IS NULL
                    OR (:available = TRUE AND a.numRooms > 0)
                    OR (:available = FALSE AND a.numRooms <= 0)
                  )
            """)
    Page<Accommodation> findAllWithFilters(
            @Param("category") AccommodationCategory category,
            @Param("hostId") Long hostId,
            @Param("countryId") Long countryId,
            @Param("numRooms") Integer numRooms,
            @Param("available") Boolean available,
            Pageable pageable
    );


    @Query("""
        SELECT 
            a.id AS id,
            a.name AS name,
            a.category AS category,
            a.numRooms AS numRooms
        FROM Accommodation a
        """)
    Page<AccommodationShortProjection> findAllShortProjection(Pageable pageable);


    @Query("""
        SELECT 
            a.id AS id,
            a.name AS name,
            a.category AS category,
            a.numRooms AS numRooms,
            CONCAT(a.host.name, ' ', a.host.surname) AS hostFullName,
            a.host.country.name AS hostCountry
        FROM Accommodation a
        """)
    Page<AccommodationExtendedProjection> findAllExtendedProjection(Pageable pageable);


    @EntityGraph(attributePaths = {"host", "host.country"})
    @Query("SELECT a FROM Accommodation a")
    Page<Accommodation> findAllWithHostAndCountry(Pageable pageable);
}