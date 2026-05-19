package mk.ukim.finki.emt.accommodationrental.model.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hosts")
public class Host extends BaseAuditableEntity
{

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @ManyToOne(optional = false)
    private Country country;

}