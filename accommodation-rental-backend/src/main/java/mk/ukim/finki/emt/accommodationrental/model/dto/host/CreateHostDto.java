package mk.ukim.finki.emt.accommodationrental.model.dto.host;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateHostDto(
        @NotBlank(message = "Host name is required.")
        String name,

        @NotBlank(message = "Host surname is required.")
        String surname,

        @NotNull(message = "Country id is required.")
        Long countryId
) {
}