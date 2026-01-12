package com.dashboard.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class CustomerDTO {
    public UUID id;

    @NotBlank
    public String name;

    @NotBlank
    @Email
    public String email;

    public String image_url;
}
