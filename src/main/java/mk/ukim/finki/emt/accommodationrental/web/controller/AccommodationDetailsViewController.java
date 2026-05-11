package mk.ukim.finki.emt.accommodationrental.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.views.AccommodationDetailsView;
import mk.ukim.finki.emt.accommodationrental.service.AccommodationDetailsViewService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accommodation-details-view")
@RequiredArgsConstructor
public class AccommodationDetailsViewController {

    private final AccommodationDetailsViewService accommodationDetailsViewService;

    @GetMapping
    public Page<AccommodationDetailsView> findAll(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        return this.accommodationDetailsViewService.findAll(page, size);
    }
}