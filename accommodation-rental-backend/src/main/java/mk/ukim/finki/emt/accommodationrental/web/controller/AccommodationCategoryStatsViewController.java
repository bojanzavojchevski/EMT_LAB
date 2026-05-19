package mk.ukim.finki.emt.accommodationrental.web.controller;


import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.views.AccommodationCategoryStatsView;
import mk.ukim.finki.emt.accommodationrental.service.AccommodationCategoryStatsViewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/accommodation-category-stats")
public class AccommodationCategoryStatsViewController
{
    private final AccommodationCategoryStatsViewService accommodationCategoryStatsViewService;

    @GetMapping
    public List<AccommodationCategoryStatsView> findAll() {
        return this.accommodationCategoryStatsViewService.findAll();
    }

}
