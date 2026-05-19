package mk.ukim.finki.emt.accommodationrental.model.dto.review;

import mk.ukim.finki.emt.accommodationrental.model.domain.Accommodation;

import java.util.List;

public record DisplayAccommodationWithReviewsDto(
        Long id,
        String name,
        String category,
        Integer numRooms,
        String hostFullName,
        String hostCountry,
        List<DisplayReviewDto> reviews,
        Double averageRating
) {

    public static DisplayAccommodationWithReviewsDto from(
            Accommodation accommodation,
            List<DisplayReviewDto> reviews,
            Double averageRating
    ) {
        String hostFullName = accommodation.getHost().getName() + " " + accommodation.getHost().getSurname();
        String hostCountry = accommodation.getHost().getCountry().getName();

        return new DisplayAccommodationWithReviewsDto(
                accommodation.getId(),
                accommodation.getName(),
                accommodation.getCategory().name(),
                accommodation.getNumRooms(),
                hostFullName,
                hostCountry,
                reviews,
                averageRating
        );
    }
}