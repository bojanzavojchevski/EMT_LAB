package mk.ukim.finki.emt.accommodationrental.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.views.AccommodationDetailsView;
import mk.ukim.finki.emt.accommodationrental.repository.AccommodationDetailsViewRepository;
import mk.ukim.finki.emt.accommodationrental.service.AccommodationDetailsViewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccommodationDetailsViewServiceImpl implements AccommodationDetailsViewService
{
    private final AccommodationDetailsViewRepository accommodationDetailsViewRepository;

    @Override
    public Page<AccommodationDetailsView> findAll(Integer page, Integer size)
    {
        int pageNumber = page != null && page >= 0 ? page : 0;
        int pageSize = size != null && size > 0 ? size : 10;

        return this.accommodationDetailsViewRepository.findAll(
                PageRequest.of(pageNumber, pageSize)
        );

    }


}
