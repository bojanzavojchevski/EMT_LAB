package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.domain.Accommodation;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.CreateAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.UpdateAccommodationDto;

import java.util.List;

public interface AccommodationService
{
    List<Accommodation> findAll();

    Accommodation findById(Long id);

    Accommodation create(CreateAccommodationDto dto);

    Accommodation update(Long id, UpdateAccommodationDto dto);

    void delete(Long id);

    Accommodation rent(Long id);
}
