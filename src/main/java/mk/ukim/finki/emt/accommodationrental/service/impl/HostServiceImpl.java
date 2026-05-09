package mk.ukim.finki.emt.accommodationrental.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.emt.accommodationrental.model.domain.Host;
import mk.ukim.finki.emt.accommodationrental.model.exceptions.HostNotFoundException;
import mk.ukim.finki.emt.accommodationrental.repository.HostRepository;
import mk.ukim.finki.emt.accommodationrental.service.HostService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HostServiceImpl implements HostService {

    private final HostRepository hostRepository;

    @Override
    public List<Host> findAll() {
        return this.hostRepository.findAll();
    }

    @Override
    public Host findById(Long id) {
        return this.hostRepository.findById(id)
                .orElseThrow(() -> new HostNotFoundException(id));
    }
}