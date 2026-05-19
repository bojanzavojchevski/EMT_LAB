package mk.ukim.finki.emt.accommodationrental.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.domain.Accommodation;
import mk.ukim.finki.emt.accommodationrental.model.domain.Review;
import mk.ukim.finki.emt.accommodationrental.model.dto.review.CreateReviewDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.review.DisplayAccommodationWithReviewsDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.review.DisplayReviewDto;
import mk.ukim.finki.emt.accommodationrental.model.exceptions.AccommodationNotFoundException;
import mk.ukim.finki.emt.accommodationrental.repository.AccommodationRepository;
import mk.ukim.finki.emt.accommodationrental.repository.ReviewRepository;
import mk.ukim.finki.emt.accommodationrental.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final AccommodationRepository accommodationRepository;

    @Override
    public DisplayReviewDto create(Long accommodationId, CreateReviewDto createReviewDto) {
        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new AccommodationNotFoundException(accommodationId));

        Review review = new Review();
        review.setComment(createReviewDto.comment());
        review.setRating(createReviewDto.rating());
        review.setAccommodation(accommodation);

        Review savedReview = reviewRepository.save(review);

        return DisplayReviewDto.from(savedReview);
    }

    @Override
    public DisplayAccommodationWithReviewsDto findAccommodationWithReviews(Long accommodationId) {
        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new AccommodationNotFoundException(accommodationId));

        List<DisplayReviewDto> reviews = reviewRepository.findAllByAccommodationId(accommodationId)
                .stream()
                .map(DisplayReviewDto::from)
                .toList();

        Double averageRating = reviewRepository.findAverageRatingByAccommodationId(accommodationId);

        if (averageRating == null) {
            averageRating = 0.0;
        }

        return DisplayAccommodationWithReviewsDto.from(
                accommodation,
                reviews,
                averageRating
        );
    }
}