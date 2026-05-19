package mk.ukim.finki.emt.accommodationrental.model.exceptions;

public class HostNotFoundException extends RuntimeException {

    public HostNotFoundException(Long id) {
        super("Host with id " + id + " was not found.");
    }
}