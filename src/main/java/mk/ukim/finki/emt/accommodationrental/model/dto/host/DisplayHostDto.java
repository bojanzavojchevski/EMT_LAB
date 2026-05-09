package mk.ukim.finki.emt.accommodationrental.model.dto.host;

import mk.ukim.finki.emt.accommodationrental.model.domain.Host;
import mk.ukim.finki.emt.accommodationrental.model.dto.country.DisplayCountryDto;

import java.time.LocalDateTime;

public record DisplayHostDto(
        Long id,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String name,
        String surname,
        DisplayCountryDto country
) {
    public static DisplayHostDto from(Host host) {
        return new DisplayHostDto(
                host.getId(),
                host.getCreatedAt(),
                host.getUpdatedAt(),
                host.getName(),
                host.getSurname(),
                DisplayCountryDto.from(host.getCountry())
        );
    }
}