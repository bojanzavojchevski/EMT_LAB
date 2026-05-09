package mk.ukim.finki.emt.accommodationrental.model.exceptions;

public class AccommodationNotFoundException extends RuntimeException {

    public AccommodationNotFoundException(Long id) {
        super("Accommodation with id " + id + " was not found.");
    }
}