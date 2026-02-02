package com.dashboard.backend.mapper;

import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.entity.CustomerEntity;
import com.dashboard.backend.entity.InvoiceEntity;

public class InvoiceMapper {

    public static InvoiceEntity toEntity(InvoiceDTO dto) {
        InvoiceEntity i = new InvoiceEntity();
        i.setAmount(dto.amount);
        i.setStatus(dto.status);
        i.setDate(dto.date);
        return i;
    }

    public static InvoiceDTO toDTO(InvoiceEntity e) {
        InvoiceDTO dto = new InvoiceDTO();
        dto.amount = e.getAmount();
        dto.status = e.getStatus();
        dto.date = e.getDate();
        dto.invoiceId = e.getInvoiceId();

        CustomerEntity customer = e.getCustomer();
        dto.customer_id = customer.getId();
        dto.customerEmail = customer.getEmail();
        dto.customerName = customer.getName();
        dto.customerEmail = customer.getEmail();


        return dto;
    }

}
