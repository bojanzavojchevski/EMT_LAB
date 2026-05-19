package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.dto.review.CreateReviewDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.review.DisplayAccommodationWithReviewsDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.review.DisplayReviewDto;

public interface ReviewService {

    DisplayReviewDto create(Long accommodationId, CreateReviewDto createReviewDto);

    DisplayAccommodationWithReviewsDto findAccommodationWithReviews(Long accommodationId);
}