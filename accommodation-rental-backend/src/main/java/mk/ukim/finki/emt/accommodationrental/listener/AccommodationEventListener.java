package mk.ukim.finki.emt.accommodationrental.listener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.ActivityLogEventType;
import mk.ukim.finki.emt.accommodationrental.model.events.AccommodationRentedEvent;
import mk.ukim.finki.emt.accommodationrental.service.ActivityLogService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AccommodationEventListener {

    private final ActivityLogService activityLogService;

    @EventListener
    public void onAccommodationRented(AccommodationRentedEvent event) {
        this.activityLogService.create(
                event.accommodationName(),
                ActivityLogEventType.RENTED
        );

        log.info(
                "Accommodation rented: id={}, name={}, remainingRooms={}",
                event.accommodationId(),
                event.accommodationName(),
                event.remainingRooms()
        );

        if (event.remainingRooms() == 0) {
            this.activityLogService.create(
                    event.accommodationName(),
                    ActivityLogEventType.FULLY_OCCUPIED
            );

            log.info(
                    "Accommodation fully occupied: id={}, name={}",
                    event.accommodationId(),
                    event.accommodationName()
            );
        }
    }
}