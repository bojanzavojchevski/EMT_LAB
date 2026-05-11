package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.views.AccommodationCategoryStatsView;

import java.util.List;

public interface AccommodationCategoryStatsViewService {

    List<AccommodationCategoryStatsView> findAll();
}