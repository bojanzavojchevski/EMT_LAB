package mk.ukim.finki.emt.accommodationrental.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reviews")
public class Review extends BaseAuditableEntity {

    @Column(nullable = false, length = 1000)
    private String comment;

    @Column(nullable = false)
    private Integer rating;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Accommodation accommodation;
}