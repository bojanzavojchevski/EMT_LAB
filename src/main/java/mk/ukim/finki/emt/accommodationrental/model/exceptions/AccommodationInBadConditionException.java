package mk.ukim.finki.emt.accommodationrental.model.exceptions;

public class AccommodationInBadConditionException extends RuntimeException {

    public AccommodationInBadConditionException(Long id) {
        super("Accommodation with id " + id + " is in bad condition and cannot be rented.");
    }
}