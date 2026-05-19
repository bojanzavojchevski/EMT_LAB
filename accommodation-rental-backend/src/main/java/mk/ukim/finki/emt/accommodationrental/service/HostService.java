package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.domain.Host;

import java.util.List;

public interface HostService {

    List<Host> findAll();

    Host findById(Long id);

}