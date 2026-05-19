package mk.ukim.finki.emt.accommodationrental.web.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.dto.review.CreateReviewDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.review.DisplayAccommodationWithReviewsDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.review.DisplayReviewDto;
import mk.ukim.finki.emt.accommodationrental.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accommodations")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:3000"
})
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/{id}/reviews")
    public ResponseEntity<DisplayReviewDto> createReview(
            @PathVariable Long id,
            @Valid @RequestBody CreateReviewDto createReviewDto
    ) {
        return ResponseEntity.ok(reviewService.create(id, createReviewDto));
    }

    @GetMapping("/{id}/with-reviews")
    public ResponseEntity<DisplayAccommodationWithReviewsDto> findAccommodationWithReviews(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(reviewService.findAccommodationWithReviews(id));
    }
}