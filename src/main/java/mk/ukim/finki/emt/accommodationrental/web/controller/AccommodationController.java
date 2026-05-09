package mk.ukim.finki.emt.accommodationrental.web.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.CreateAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.DisplayAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.UpdateAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.service.AccommodationService;
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
