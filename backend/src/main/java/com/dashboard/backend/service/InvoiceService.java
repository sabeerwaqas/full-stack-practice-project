package com.dashboard.backend.service;

import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.entity.InvoiceEntity;
import com.dashboard.backend.mapper.InvoiceMapper;
import com.dashboard.backend.repository.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceService {
    private final InvoiceRepository repository;


    public InvoiceService(InvoiceRepository repository) {
        this.repository = repository;
    }

    public InvoiceDTO addInvoice(InvoiceDTO dto) {
        InvoiceEntity entity = InvoiceMapper.toEntity(dto);
        InvoiceEntity saved = repository.save(entity);
        return InvoiceMapper.toDTO(saved);
    }

    public List<InvoiceDTO> getInvoices() {
        return repository.findAll()
                .stream().map(InvoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public InvoiceDTO updateInvoice(InvoiceDTO dto) {

        InvoiceEntity entity = (InvoiceEntity) repository.findById(dto.id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        entity.setAmount(dto.amount);
        entity.setStatus(dto.status);
        entity.setDate(dto.date);
        entity.setCustomerId(dto.customerId);
        InvoiceEntity updated = repository.save(entity);
        return InvoiceMapper.toDTO(updated);
    }


}
