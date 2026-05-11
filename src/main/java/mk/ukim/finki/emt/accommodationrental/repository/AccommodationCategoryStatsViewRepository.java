package mk.ukim.finki.emt.accommodationrental.repository;

import mk.ukim.finki.emt.accommodationrental.model.views.AccommodationCategoryStatsView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationCategoryStatsViewRepository extends JpaRepository<AccommodationCategoryStatsView, String> {

}