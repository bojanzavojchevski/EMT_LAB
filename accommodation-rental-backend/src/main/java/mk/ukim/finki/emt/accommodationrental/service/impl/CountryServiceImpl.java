package mk.ukim.finki.emt.accommodationrental.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.domain.Country;
import mk.ukim.finki.emt.accommodationrental.model.dto.country.CreateCountryDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.country.UpdateCountryDto;
import mk.ukim.finki.emt.accommodationrental.model.exceptions.CountryNotFoundException;
import mk.ukim.finki.emt.accommodationrental.repository.CountryRepository;
import mk.ukim.finki.emt.accommodationrental.service.CountryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;

    @Override
    public List<Country> findAll() {
        return this.countryRepository.findAll();
    }

    @Override
    public Country findById(Long id) {
        return this.countryRepository.findById(id)
                .orElseThrow(() -> new CountryNotFoundException(id));
    }

    @Override
    @Transactional
    public Country create(CreateCountryDto dto) {
        Country country = new Country();
        country.setName(dto.name());
        country.setContinent(dto.continent());

        return this.countryRepository.save(country);
    }

    @Override
    @Transactional
    public Country update(Long id, UpdateCountryDto dto) {
        Country country = this.findById(id);

        country.setName(dto.name());
        country.setContinent(dto.continent());

        return this.countryRepository.save(country);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Country country = this.findById(id);
        this.countryRepository.delete(country);
    }
}