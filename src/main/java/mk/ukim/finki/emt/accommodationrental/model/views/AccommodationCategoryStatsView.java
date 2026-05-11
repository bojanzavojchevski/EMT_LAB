package mk.ukim.finki.emt.accommodationrental.model.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Getter
@Entity
@Immutable
@Table(name = "accommodation_category_stats_view")
public class AccommodationCategoryStatsView
{

    @Id
    @Column(name = "category")
    private String category;

    @Column(name = "total_accommodations")
    private Long totalAccommodations;

    @Column(name = "total_rooms")
    private Long totalRooms;

    @Column(name = "average_rooms")
    private BigDecimal averageRooms;
}