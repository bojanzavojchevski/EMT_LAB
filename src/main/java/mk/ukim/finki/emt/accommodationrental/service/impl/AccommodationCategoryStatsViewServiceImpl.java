package mk.ukim.finki.emt.accommodationrental.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.views.AccommodationCategoryStatsView;
import mk.ukim.finki.emt.accommodationrental.repository.AccommodationCategoryStatsViewRepository;
import mk.ukim.finki.emt.accommodationrental.service.AccommodationCategoryStatsViewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccommodationCategoryStatsViewServiceImpl implements AccommodationCategoryStatsViewService
{
    private final AccommodationCategoryStatsViewRepository accommodationCategoryStatsViewRepository;

    @Override
    public List<AccommodationCategoryStatsView> findAll() {
        return this.accommodationCategoryStatsViewRepository.findAll();
    }


}