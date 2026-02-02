package com.dashboard.backend.service;

import com.dashboard.backend.dto.InvoiceCountDTO;
import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.dto.PaidAmountDTO;
import com.dashboard.backend.dto.PendingAmountDTO;
import com.dashboard.backend.entity.InvoiceEntity;
import com.dashboard.backend.mapper.InvoiceMapper;
import com.dashboard.backend.repository.InvoiceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
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

    public InvoiceCountDTO getInvoicesCount() {
        return new InvoiceCountDTO(repository.count());
    }

    public PendingAmountDTO getPendingAmount() {
        long pendingAmount = repository.sumPendingAmount();
        return new PendingAmountDTO(pendingAmount);
    }

    public PaidAmountDTO getPaidAmount(){
        long paidAmount = repository.sumPaidAmount();
        return new PaidAmountDTO(paidAmount);
    }

    public InvoiceDTO updateInvoice(InvoiceDTO dto) {

        InvoiceEntity entity = (InvoiceEntity) repository.findById(dto.customer_id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        entity.setAmount(dto.amount);
        entity.setStatus(dto.status);
        entity.setDate(dto.date);
        entity.setCustomerId(dto.customer_id);
        InvoiceEntity updated = repository.save(entity);
        return InvoiceMapper.toDTO(updated);
    }

    public void deleteInvoice(UUID invoiceId) {
        if (!repository.existsById(invoiceId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invoice not found");
        }
        repository.deleteById(invoiceId);
    }



}
