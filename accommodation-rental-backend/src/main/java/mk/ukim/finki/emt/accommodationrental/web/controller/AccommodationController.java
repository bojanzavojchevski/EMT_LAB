package mk.ukim.finki.emt.accommodationrental.web.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.CreateAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.DisplayAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.DisplayAccommodationWithHostCountryDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.UpdateAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;
import mk.ukim.finki.emt.accommodationrental.model.projection.AccommodationExtendedProjection;
import mk.ukim.finki.emt.accommodationrental.model.projection.AccommodationShortProjection;
import mk.ukim.finki.emt.accommodationrental.service.AccommodationService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
@RequiredArgsConstructor
public class AccommodationController
{
    private final AccommodationService accommodationService;

    @GetMapping
    public List<DisplayAccommodationDto> findAll()
    {
        return this.accommodationService.findAll()
                .stream()
                .map(DisplayAccommodationDto::from)
                .toList();
    }

    @GetMapping("/search")
    public Page<DisplayAccommodationDto> findAllWithFilters(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection,
            @RequestParam(required = false) AccommodationCategory category,
            @RequestParam(required = false) Long hostId,
            @RequestParam(required = false) Long countryId,
            @RequestParam(required = false) Integer numRooms,
            @RequestParam(required = false) Boolean available
    ) {
        return this.accommodationService.findAllWithFilters(
                page,
                size,
                sortBy,
                sortDirection,
                category,
                hostId,
                countryId,
                numRooms,
                available
        ).map(DisplayAccommodationDto::from);
    }

    @GetMapping("/projections/short")
    public Page<AccommodationShortProjection> findAllShortProjection(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection
    ) {
        return this.accommodationService.findAllShortProjection(
                page,
                size,
                sortBy,
                sortDirection
        );
    }

    @GetMapping("/projections/extended")
    public Page<AccommodationExtendedProjection> findAllExtendedProjection(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection
    ) {
        return this.accommodationService.findAllExtendedProjection(
                page,
                size,
                sortBy,
                sortDirection
        );
    }

    @GetMapping("/with-host-country")
    public Page<DisplayAccommodationWithHostCountryDto> findAllWithHostAndCountry(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection
    ) {
        return this.accommodationService.findAllWithHostAndCountry(
                page,
                size,
                sortBy,
                sortDirection
        ).map(DisplayAccommodationWithHostCountryDto::from);
    }


    @GetMapping("/{id}")
    public DisplayAccommodationDto findById(@PathVariable Long id)
    {
        return DisplayAccommodationDto.from(this.accommodationService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DisplayAccommodationDto create(@Valid @RequestBody CreateAccommodationDto dto) {
        return DisplayAccommodationDto.from(this.accommodationService.create(dto));
    }

    @PutMapping("/{id}")
    public DisplayAccommodationDto update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAccommodationDto dto
    ) {
        return DisplayAccommodationDto.from(this.accommodationService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        this.accommodationService.delete(id);
    }

    @PatchMapping("/{id}/rent")
    public DisplayAccommodationDto rent(@PathVariable Long id) {
        return DisplayAccommodationDto.from(this.accommodationService.rent(id));
    }

}
