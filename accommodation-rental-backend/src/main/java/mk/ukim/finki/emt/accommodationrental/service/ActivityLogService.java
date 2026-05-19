package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.domain.ActivityLog;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.ActivityLogEventType;
import org.springframework.data.domain.Page;

public interface ActivityLogService {

    ActivityLog create(String accommodationName, ActivityLogEventType eventType);

    Page<ActivityLog> findAll(Integer page, Integer size);
}