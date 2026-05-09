package mk.ukim.finki.emt.accommodationrental.repository;

import mk.ukim.finki.emt.accommodationrental.model.domain.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long>
{

}
