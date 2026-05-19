package mk.ukim.finki.emt.accommodationrental.model.domain;

import jakarta.persistence.*;
import lombok.*;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.ActivityLogEventType;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "activity_logs")
public class ActivityLog
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "accommodation_name", nullable = false)
    private String accommodationName;

    @Column(name = "event_time", nullable = false)
    private LocalDateTime eventTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false)
    private ActivityLogEventType eventType;

    public ActivityLog(String accommodationName, LocalDateTime eventTime, ActivityLogEventType eventType) {
        this.accommodationName = accommodationName;
        this.eventTime = eventTime;
        this.eventType = eventType;
    }


}