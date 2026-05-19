package mk.ukim.finki.emt.accommodationrental.model.dto.accomodation;

import mk.ukim.finki.emt.accommodationrental.model.domain.Accommodation;
import mk.ukim.finki.emt.accommodationrental.model.dto.host.DisplayHostDto;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCondition;

import java.time.LocalDateTime;

public record DisplayAccommodationDto(
        Long id,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String name,
        AccommodationCategory category,
        DisplayHostDto host,
        Integer numRooms,
        AccommodationCondition condition
) {
    public static DisplayAccommodationDto from(Accommodation accommodation) {
        return new DisplayAccommodationDto(
                accommodation.getId(),
                accommodation.getCreatedAt(),
                accommodation.getUpdatedAt(),
                accommodation.getName(),
                accommodation.getCategory(),
                DisplayHostDto.from(accommodation.getHost()),
                accommodation.getNumRooms(),
                accommodation.getCondition()
        );
    }
}