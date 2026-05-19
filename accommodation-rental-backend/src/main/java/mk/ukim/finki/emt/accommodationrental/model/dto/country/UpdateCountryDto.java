package mk.ukim.finki.emt.accommodationrental.model.dto.country;

import jakarta.validation.constraints.NotBlank;

public record UpdateCountryDto(
        @NotBlank(message = "Country name is required.")
        String name,

        @NotBlank(message = "Country continent is required.")
        String continent
) {
}