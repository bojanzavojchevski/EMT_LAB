package mk.ukim.finki.emt.accommodationrental.model.projection;


import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;

public interface AccommodationExtendedProjection
{
    //id, name, category, numRooms, име и презиме на домаќинот, држава на домаќинот
    Long getId();
    String getName();
    AccommodationCategory getCategory();
    Integer getNumRooms();
    String getHostFullName();
    String getHostCountry();
}
