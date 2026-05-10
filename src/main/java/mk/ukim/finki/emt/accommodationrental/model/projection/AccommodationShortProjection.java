package mk.ukim.finki.emt.accommodationrental.model.projection;

import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;

public interface AccommodationShortProjection
{
    Long getId();
    String getName();
    AccommodationCategory getCategory();
    Integer getNumRooms();
}
