package mk.ukim.finki.emt.accommodationrental.model.domain;

import jakarta.persistence.*;
import lombok.*;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCategory;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.AccommodationCondition;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "accommodations")
public class Accommodation extends BaseAuditableEntity {

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccommodationCategory category;

    @ManyToOne(optional = false)
    private Host host;

    @Column(name = "num_rooms", nullable = false)
    private Integer numRooms;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccommodationCondition condition;
}