package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.domain.Country;
import mk.ukim.finki.emt.accommodationrental.model.dto.country.CreateCountryDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.country.UpdateCountryDto;

import java.util.List;

public interface CountryService {

    List<Country> findAll();

    Country findById(Long id);

    Country create(CreateCountryDto dto);

    Country update(Long id, UpdateCountryDto dto);

    void delete(Long id);
}