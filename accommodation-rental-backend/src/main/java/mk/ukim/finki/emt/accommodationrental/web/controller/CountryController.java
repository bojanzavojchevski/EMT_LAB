package mk.ukim.finki.emt.accommodationrental.web.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.dto.country.CreateCountryDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.country.DisplayCountryDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.country.UpdateCountryDto;
import mk.ukim.finki.emt.accommodationrental.service.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService countryService;

    @GetMapping
    public List<DisplayCountryDto> findAll() {
        return this.countryService.findAll()
                .stream()
                .map(DisplayCountryDto::from)
                .toList();
    }

    @GetMapping("/{id}")
    public DisplayCountryDto findById(@PathVariable Long id) {
        return DisplayCountryDto.from(this.countryService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DisplayCountryDto create(@Valid @RequestBody CreateCountryDto dto) {
        return DisplayCountryDto.from(this.countryService.create(dto));
    }

    @PutMapping("/{id}")
    public DisplayCountryDto update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCountryDto dto
    ) {
        return DisplayCountryDto.from(this.countryService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        this.countryService.delete(id);
    }
}