package com.dashboard.backend.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.Date;
import java.util.UUID;

public class InvoiceDTO {
    public UUID id;
    public UUID customerId;

    @NotBlank
    public Integer amount;

    @NotBlank
    public String status;

    @NotBlank
    public Date date;
}
