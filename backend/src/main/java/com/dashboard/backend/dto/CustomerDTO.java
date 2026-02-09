package com.dashboard.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.UUID;

public class CustomerDTO {
    public UUID id;

    @NotBlank
    public String name;

    @NotBlank
    @Email
    public String email;

    public String image_url;

    public List<InvoiceDTO> invoices;

    public void setInvoices(List<InvoiceDTO> invoices) {
        this.invoices = invoices;
    }
}
