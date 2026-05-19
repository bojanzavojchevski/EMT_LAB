package mk.ukim.finki.emt.accommodationrental.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.domain.Country;
import mk.ukim.finki.emt.accommodationrental.model.domain.Host;
import mk.ukim.finki.emt.accommodationrental.model.dto.host.CreateHostDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.host.UpdateHostDto;
import mk.ukim.finki.emt.accommodationrental.model.exceptions.HostNotFoundException;
import mk.ukim.finki.emt.accommodationrental.repository.HostRepository;
import mk.ukim.finki.emt.accommodationrental.service.CountryService;
import mk.ukim.finki.emt.accommodationrental.service.HostService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HostServiceImpl implements HostService {

    private final HostRepository hostRepository;
    private final CountryService countryService;

    @Override
    public List<Host> findAll() {
        return this.hostRepository.findAll();
    }

    @Override
    public Host findById(Long id) {
        return this.hostRepository.findById(id)
                .orElseThrow(() -> new HostNotFoundException(id));
    }

    @Override
    @Transactional
    public Host create(CreateHostDto dto) {
        Country country = this.countryService.findById(dto.countryId());

        Host host = new Host();
        host.setName(dto.name());
        host.setSurname(dto.surname());
        host.setCountry(country);

        return this.hostRepository.save(host);
    }

    @Override
    @Transactional
    public Host update(Long id, UpdateHostDto dto) {
        Host host = this.findById(id);
        Country country = this.countryService.findById(dto.countryId());

        host.setName(dto.name());
        host.setSurname(dto.surname());
        host.setCountry(country);

        return this.hostRepository.save(host);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Host host = this.findById(id);
        this.hostRepository.delete(host);
    }
}