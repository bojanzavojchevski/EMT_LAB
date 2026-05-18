package mk.ukim.finki.emt.accommodationrental.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.domain.Accommodation;
import mk.ukim.finki.emt.accommodationrental.model.domain.Host;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.CreateAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.accomodation.UpdateAccommodationDto;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCondition;
import mk.ukim.finki.emt.accommodationrental.model.events.AccommodationRentedEvent;
import mk.ukim.finki.emt.accommodationrental.model.exceptions.AccommodationInBadConditionException;
import mk.ukim.finki.emt.accommodationrental.model.exceptions.AccommodationNotAvailableException;
import mk.ukim.finki.emt.accommodationrental.model.exceptions.AccommodationNotFoundException;
import mk.ukim.finki.emt.accommodationrental.model.exceptions.HostNotFoundException;
import mk.ukim.finki.emt.accommodationrental.model.projection.AccommodationExtendedProjection;
import mk.ukim.finki.emt.accommodationrental.model.projection.AccommodationShortProjection;
import mk.ukim.finki.emt.accommodationrental.repository.AccommodationRepository;
import mk.ukim.finki.emt.accommodationrental.repository.HostRepository;
import mk.ukim.finki.emt.accommodationrental.service.AccommodationService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccommodationServiceImpl implements AccommodationService {

    private final AccommodationRepository accommodationRepository;
    private final HostRepository hostRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Override
    public List<Accommodation> findAll() {
        return this.accommodationRepository.findAll();
    }

    @Override
    public Accommodation findById(Long id) {
        return this.accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFoundException(id));
    }

    @Override
    @Transactional
    public Accommodation create(CreateAccommodationDto dto) {
        Host host = this.hostRepository.findById(dto.hostId())
                .orElseThrow(() -> new HostNotFoundException(dto.hostId()));

        Accommodation accommodation = new Accommodation(
                dto.name(),
                dto.category(),
                host,
                dto.numRooms(),
                dto.condition()
        );

        return this.accommodationRepository.save(accommodation);
    }

    @Override
    @Transactional
    public Accommodation update(Long id, UpdateAccommodationDto dto) {
        Accommodation accommodation = this.findById(id);

        Host host = this.hostRepository.findById(dto.hostId())
                .orElseThrow(() -> new HostNotFoundException(dto.hostId()));

        accommodation.setName(dto.name());
        accommodation.setCategory(dto.category());
        accommodation.setHost(host);
        accommodation.setNumRooms(dto.numRooms());
        accommodation.setCondition(dto.condition());

        return this.accommodationRepository.save(accommodation);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Accommodation accommodation = this.findById(id);
        this.accommodationRepository.delete(accommodation);
    }

    @Override
    @Transactional
    public Accommodation rent(Long id) {
        Accommodation accommodation = this.findById(id);

        if (accommodation.getCondition().equals(AccommodationCondition.BAD)) {
            throw new AccommodationInBadConditionException(id);
        }

        if (accommodation.getNumRooms() <= 0) {
            throw new AccommodationNotAvailableException(id);
        }

        accommodation.setNumRooms(accommodation.getNumRooms() - 1);

        Accommodation savedAccommodation = this.accommodationRepository.save(accommodation);

        this.applicationEventPublisher.publishEvent(
                new AccommodationRentedEvent(
                        savedAccommodation.getId(),
                        savedAccommodation.getName(),
                        savedAccommodation.getNumRooms()
                )
        );

        return savedAccommodation;
    }

    @Override
    public Page<Accommodation> findAllWithFilters(
            Integer page,
            Integer size,
            String sortBy,
            String sortDirection,
            AccommodationCategory category,
            Long hostId,
            Long countryId,
            Integer numRooms,
            Boolean available
    ) {
        Pageable pageable = this.createPageable(page, size, sortBy, sortDirection);

        return this.accommodationRepository.findAllWithFilters(
                category,
                hostId,
                countryId,
                numRooms,
                available,
                pageable
        );
    }

    @Override
    public Page<AccommodationShortProjection> findAllShortProjection(
            Integer page,
            Integer size,
            String sortBy,
            String sortDirection
    )
    {
        Pageable pageable = this.createPageable(page, size, sortBy, sortDirection);

        return this.accommodationRepository.findAllShortProjection(pageable);
    }

    @Override
    public Page<AccommodationExtendedProjection> findAllExtendedProjection(
            Integer page,
            Integer size,
            String sortBy,
            String sortDirection
    ) {
        Pageable pageable = this.createPageable(page, size, sortBy, sortDirection);

        return this.accommodationRepository.findAllExtendedProjection(pageable);
    }


    @Override
    public Page<Accommodation> findAllWithHostAndCountry(
            Integer page,
            Integer size,
            String sortBy,
            String sortDirection
    ) {
        Pageable pageable = this.createPageable(page, size, sortBy, sortDirection);

        return this.accommodationRepository.findAllWithHostAndCountry(pageable);
    }





    private Pageable createPageable(Integer page, Integer size, String sortBy, String sortDirection) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        int pageSize = size != null && size > 0 ? size : 10;

        String safeSortBy;

        if ("name".equals(sortBy)) {
            safeSortBy = "name";
        } else if ("createdAt".equals(sortBy)) {
            safeSortBy = "createdAt";
        } else {
            safeSortBy = "createdAt";
        }

        Sort.Direction direction = "asc".equalsIgnoreCase(sortDirection)
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        return PageRequest.of(pageNumber, pageSize, Sort.by(direction, safeSortBy));
    }
}