package com.dashboard.backend.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.Date;
import java.util.UUID;

public class InvoiceDTO {
    public UUID id;
    public UUID customerId;

    public Integer amount;

    @NotBlank
    public String status;

    public Date date;
}
