package mk.ukim.finki.emt.accommodationrental.model.dto.accomodation;

import mk.ukim.finki.emt.accommodationrental.model.domain.Accommodation;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCondition;

public record DisplayAccommodationWithHostCountryDto(
        Long id,
        String name,
        AccommodationCategory category,
        Integer numRooms,
        AccommodationCondition condition,
        String hostFullName,
        String hostCountry
) {
    public static DisplayAccommodationWithHostCountryDto from(Accommodation accommodation)
    {
        return new DisplayAccommodationWithHostCountryDto(
                accommodation.getId(),
                accommodation.getName(),
                accommodation.getCategory(),
                accommodation.getNumRooms(),
                accommodation.getCondition(),
                accommodation.getHost().getName() + " " + accommodation.getHost().getSurname(),
                accommodation.getHost().getCountry().getName()
        );
    }


}
