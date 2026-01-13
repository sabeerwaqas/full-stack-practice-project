package com.dashboard.backend.mapper;

import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.entity.InvoiceEntity;

public class InvoiceMapper {

    public static InvoiceEntity toEntity(InvoiceDTO dto) {
        InvoiceEntity i = new InvoiceEntity();
        i.setCustomerId(dto.customerId);
        i.setAmount(dto.amount);
        i.setStatus(dto.status);
        i.setDate(dto.date);
        return i;
    }

    public static InvoiceDTO toDTO(InvoiceEntity e) {
        InvoiceDTO dto = new InvoiceDTO();
        dto.customerId = e.getCustomerId();
        dto.amount = e.getAmount();
        dto.status = e.getStatus();
        dto.date = e.getDate();
        return dto;
    }

}
