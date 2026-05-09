package mk.ukim.finki.emt.accommodationrental.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.dto.host.DisplayHostDto;
import mk.ukim.finki.emt.accommodationrental.service.HostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hosts")
@RequiredArgsConstructor
public class HostController {

    private final HostService hostService;

    @GetMapping
    public List<DisplayHostDto> findAll() {
        return this.hostService.findAll()
                .stream()
                .map(DisplayHostDto::from)
                .toList();
    }

    @GetMapping("/{id}")
    public DisplayHostDto findById(@PathVariable Long id) {
        return DisplayHostDto.from(this.hostService.findById(id));
    }
}