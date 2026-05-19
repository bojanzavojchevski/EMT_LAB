package mk.ukim.finki.emt.accommodationrental.service;

import mk.ukim.finki.emt.accommodationrental.model.dto.auth.AuthenticationResponse;
import mk.ukim.finki.emt.accommodationrental.model.dto.auth.LoginRequest;
import mk.ukim.finki.emt.accommodationrental.model.dto.auth.RegisterRequest;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(LoginRequest request);
}