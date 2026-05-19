package mk.ukim.finki.emt.accommodationrental.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import mk.ukim.finki.emt.accommodationrental.service.MaterializedViewRefreshService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MaterializedViewRefreshServiceImpl implements MaterializedViewRefreshService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void refreshAccommodationCategoryStatsView() {
        this.entityManager
                .createNativeQuery("REFRESH MATERIALIZED VIEW accommodation_category_stats_view")
                .executeUpdate();
    }
}