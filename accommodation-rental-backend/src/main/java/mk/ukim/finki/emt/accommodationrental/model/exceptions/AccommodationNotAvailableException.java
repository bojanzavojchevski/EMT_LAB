package mk.ukim.finki.emt.accommodationrental.model.exceptions;

public class AccommodationNotAvailableException extends RuntimeException {

    public AccommodationNotAvailableException(Long id) {
        super("Accommodation with id " + id + " is not available for renting.");
    }
}