package mk.ukim.finki.emt.accommodationrental.repository;

import mk.ukim.finki.emt.accommodationrental.model.domain.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostRepository extends JpaRepository<Host, Long>
{

}