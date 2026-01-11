package com.dashboard.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class CustomerDTO {
    public Long id;

    @NotBlank
    public String name;

    @NotBlank
    @Email
    public String email;

    public String image_url;
}
