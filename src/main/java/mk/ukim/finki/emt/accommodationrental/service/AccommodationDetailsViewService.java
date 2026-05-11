package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.views.AccommodationDetailsView;
import org.springframework.data.domain.Page;

public interface AccommodationDetailsViewService
{
    Page<AccommodationDetailsView> findAll(Integer page, Integer size);

}