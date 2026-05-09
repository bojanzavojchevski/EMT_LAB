package mk.ukim.finki.emt.accommodationrental.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.dto.country.DisplayCountryDto;
import mk.ukim.finki.emt.accommodationrental.service.CountryService;
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
}