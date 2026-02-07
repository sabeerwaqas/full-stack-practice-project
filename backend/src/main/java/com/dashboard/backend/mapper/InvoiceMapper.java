package com.dashboard.backend.mapper;

import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.entity.CustomerEntity;
import com.dashboard.backend.entity.InvoiceEntity;

import java.util.UUID;

public class InvoiceMapper {

    public static InvoiceEntity toEntity(InvoiceDTO dto, CustomerEntity customer) {
        InvoiceEntity i = new InvoiceEntity();
        i.setAmount(dto.amount);
        i.setStatus(dto.status);
        i.setDate(dto.date);
        i.setCustomer(customer);
        return i;
    }

    public static InvoiceDTO toDTO(InvoiceEntity e) {
        InvoiceDTO dto = new InvoiceDTO();
        dto.invoiceId = e.getInvoiceId();
        dto.amount = e.getAmount();
        dto.status = e.getStatus();
        dto.date = e.getDate();

        CustomerEntity customer = e.getCustomer();
        dto.customer_id = customer.getId();
        dto.customerName = customer.getName();
        dto.customerEmail = customer.getEmail();

        return dto;
    }
}

