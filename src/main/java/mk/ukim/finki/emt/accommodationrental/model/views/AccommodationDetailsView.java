package mk.ukim.finki.emt.accommodationrental.model.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

@Getter
@Entity
@Immutable
@Table(name = "accommodation_details_view")
public class AccommodationDetailsView {

    @Id
    private Long id;

    @Column(name = "accommodation_name")
    private String accommodationName;

    @Column(name = "category")
    private String category;

    @Column(name = "num_rooms")
    private Integer numRooms;

    @Column(name = "host_full_name")
    private String hostFullName;

    @Column(name = "country_name")
    private String countryName;

}