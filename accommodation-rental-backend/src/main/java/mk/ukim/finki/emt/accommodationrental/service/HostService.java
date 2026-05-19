package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.domain.Host;
import mk.ukim.finki.emt.accommodationrental.model.dto.host.CreateHostDto;
import mk.ukim.finki.emt.accommodationrental.model.dto.host.UpdateHostDto;

import java.util.List;

public interface HostService {

    List<Host> findAll();

    Host findById(Long id);

    Host create(CreateHostDto dto);

    Host update(Long id, UpdateHostDto dto);

    void delete(Long id);
}