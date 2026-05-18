package mk.ukim.finki.emt.accommodationrental.model.events;

public record AccommodationRentedEvent(
        Long accommodationId,
        String accommodationName,
        Integer remainingRooms
) {

}
