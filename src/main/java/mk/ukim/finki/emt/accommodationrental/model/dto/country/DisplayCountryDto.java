package mk.ukim.finki.emt.accommodationrental.model.dto.country;

import mk.ukim.finki.emt.accommodationrental.model.domain.Country;

public record DisplayCountryDto(
        Long id,
        String name,
        String continent
) {
    public static DisplayCountryDto from(Country country)
    {
        return new DisplayCountryDto(
                country.getId(),
                country.getName(),
                country.getContinent()
        );
    }
}
