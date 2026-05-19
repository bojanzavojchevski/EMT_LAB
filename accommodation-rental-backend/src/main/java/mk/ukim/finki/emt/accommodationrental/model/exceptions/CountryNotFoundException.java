package mk.ukim.finki.emt.accommodationrental.model.exceptions;

public class CountryNotFoundException extends RuntimeException {

    public CountryNotFoundException(Long id) {
        super("Country with id " + id + " was not found.");
    }
}