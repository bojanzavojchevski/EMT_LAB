package mk.ukim.finki.emt.accommodationrental.model.dto.accomodation;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCondition;

public record UpdateAccommodationDto(
        @NotBlank(message = "Accommodation name is required.")
        String name,

        @NotNull(message = "Accommodation category is required.")
        AccommodationCategory category,

        @NotNull(message = "Host id is required.")
        Long hostId,

        @NotNull(message = "Number of rooms is required.")
        @Min(value = 1, message = "Number of rooms must be at least 1.")
        Integer numRooms,

        @NotNull(message = "Accommodation condition is required.")
        AccommodationCondition condition
) {
}