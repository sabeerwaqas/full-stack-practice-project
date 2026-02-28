package com.dashboard.backend.service;

import com.dashboard.backend.dto.InvoiceCountDTO;
import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.dto.PaidAmountDTO;
import com.dashboard.backend.dto.PendingAmountDTO;
import com.dashboard.backend.entity.CustomerEntity;
import com.dashboard.backend.entity.InvoiceEntity;
import com.dashboard.backend.mapper.InvoiceMapper;
import com.dashboard.backend.repository.CustomerRepository;
import com.dashboard.backend.repository.InvoiceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InvoiceService {
    private final InvoiceRepository repository;
    private final CustomerRepository customerRepository;


    public InvoiceService(InvoiceRepository repository, CustomerRepository customerRepository) {
        this.repository = repository;
        this.customerRepository = customerRepository;
    }

    public InvoiceDTO addInvoice(InvoiceDTO dto) {

        CustomerEntity customer = customerRepository.findById(dto.customer_id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Customer not found"));

        InvoiceEntity entity = InvoiceMapper.toEntity(dto, customer);
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
        long pendingAmountInCents = repository.sumPendingAmount();
        BigDecimal amountInDollars = BigDecimal.valueOf(pendingAmountInCents)
                .divide(BigDecimal.valueOf(100));

        return new PendingAmountDTO(amountInDollars);
    }

    public PaidAmountDTO getPaidAmount() {
        long paidAmountInCents = repository.sumPaidAmount();

        BigDecimal paidAmountInDollars = BigDecimal.valueOf(paidAmountInCents)
                .divide(BigDecimal.valueOf(100));

        return new PaidAmountDTO(paidAmountInDollars);
    }

    public InvoiceDTO updateInvoice(InvoiceDTO dto) {

        CustomerEntity customer = customerRepository.findById(dto.customer_id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Customer not found"));

        InvoiceEntity entity = (InvoiceEntity) repository.findById(dto.invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        entity.setAmount(dto.amount);
        entity.setStatus(dto.status);

        entity.setCustomer(customer);
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
