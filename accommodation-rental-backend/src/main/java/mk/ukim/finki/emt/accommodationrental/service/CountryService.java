package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.domain.Country;

import java.util.List;

public interface CountryService {

    List<Country> findAll();

    Country findById(Long id);

}