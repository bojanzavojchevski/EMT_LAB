package mk.ukim.finki.emt.accommodationrental.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mk.ukim.finki.emt.accommodationrental.service.MaterializedViewRefreshService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AccommodationCategoryStatsRefreshScheduler {

    private final MaterializedViewRefreshService materializedViewRefreshService;

    @Scheduled(fixedRateString = "${app.materialized-view-refresh-rate-ms:60000}")
    public void refreshAccommodationCategoryStatsView() {
        this.materializedViewRefreshService.refreshAccommodationCategoryStatsView();

        log.info("Materialized view accommodation_category_stats_view refreshed successfully.");
    }
}