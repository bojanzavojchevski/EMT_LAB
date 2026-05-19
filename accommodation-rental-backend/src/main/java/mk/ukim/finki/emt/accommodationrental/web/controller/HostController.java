package mk.ukim.finki.emt.accommodationrental.web.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.dto.host.CreateHostDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.host.DisplayHostDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.host.UpdateHostDto;
import mk.ukim.finki.emt.accommodationrental.service.HostService;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DisplayHostDto create(@Valid @RequestBody CreateHostDto dto) {
        return DisplayHostDto.from(this.hostService.create(dto));
    }

    @PutMapping("/{id}")
    public DisplayHostDto update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateHostDto dto
    ) {
        return DisplayHostDto.from(this.hostService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        this.hostService.delete(id);
    }
}