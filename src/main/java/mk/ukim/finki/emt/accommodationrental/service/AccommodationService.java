package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.domain.Accommodation;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.CreateAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.UpdateAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;
import mk.ukim.finki.emt.accommodationrental.model.projection.AccommodationExtendedProjection;
import mk.ukim.finki.emt.accommodationrental.model.projection.AccommodationShortProjection;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccommodationService
{
    List<Accommodation> findAll();

    Accommodation findById(Long id);

    Accommodation create(CreateAccommodationDto dto);

    Accommodation update(Long id, UpdateAccommodationDto dto);

    void delete(Long id);

    Accommodation rent(Long id);

    Page<Accommodation> findAllWithFilters(
            Integer page,
            Integer size,
            String sortBy,
            String sortDirection,
            AccommodationCategory category,
            Long hostId,
            Long countryId,
            Integer numRooms,
            Boolean available
    );

    Page<AccommodationShortProjection> findAllShortProjection(
            Integer page,
            Integer size,
            String sortBy,
            String sortDirection
    );

    Page<AccommodationExtendedProjection> findAllExtendedProjection(
            Integer page,
            Integer size,
            String sortBy,
            String sortDirection
    );

    Page<Accommodation> findAllWithHostAndCountry(
            Integer page,
            Integer size,
            String sortBy,
            String sortDirection
    );
}
