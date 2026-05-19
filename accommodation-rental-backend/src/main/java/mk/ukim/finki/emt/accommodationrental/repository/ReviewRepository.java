package mk.ukim.finki.emt.accommodationrental.repository;

import mk.ukim.finki.emt.accommodationrental.model.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByAccommodationId(Long accommodationId);

    @Query("select avg(r.rating) from Review r where r.accommodation.id = :accommodationId")
    Double findAverageRatingByAccommodationId(Long accommodationId);
}