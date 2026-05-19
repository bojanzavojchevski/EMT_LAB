package mk.ukim.finki.emt.accommodationrental.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.domain.ActivityLog;
import mk.ukim.finki.emt.accommodationrental.model.enumeration.ActivityLogEventType;
import mk.ukim.finki.emt.accommodationrental.repository.ActivityLogRepository;
import mk.ukim.finki.emt.accommodationrental.service.ActivityLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ActivityLogServiceImpl implements ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    @Override
    public ActivityLog create(String accommodationName, ActivityLogEventType eventType) {
        ActivityLog activityLog = new ActivityLog(
                accommodationName,
                LocalDateTime.now(),
                eventType
        );

        return this.activityLogRepository.save(activityLog);
    }

    @Override
    public Page<ActivityLog> findAll(Integer page, Integer size) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        int pageSize = size != null && size > 0 ? size : 10;

        return this.activityLogRepository.findAll(
                PageRequest.of(pageNumber, pageSize)
        );
    }
}