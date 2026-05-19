package mk.ukim.finki.emt.accommodationrental.model.dto.review;

import mk.ukim.finki.emt.accommodationrental.model.domain.Review;

public record DisplayReviewDto(
        Long id,
        String comment,
        Integer rating
) {

    public static DisplayReviewDto from(Review review) {
        return new DisplayReviewDto(
                review.getId(),
                review.getComment(),
                review.getRating()
        );
    }
}