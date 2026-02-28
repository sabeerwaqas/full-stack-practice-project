package com.dashboard.backend.controller;

import com.dashboard.backend.dto.InvoiceCountDTO;
import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.dto.PaidAmountDTO;
import com.dashboard.backend.dto.PendingAmountDTO;
import com.dashboard.backend.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/invoice")
@CrossOrigin
public class InvoiceController {
    private final InvoiceService service;

    public InvoiceController(InvoiceService service) {
        this.service = service;
    }

    @GetMapping
    public List<InvoiceDTO> getInvoice() {
        return service.getInvoices();
    }

    @GetMapping("/count")
    public InvoiceCountDTO getTotalInvoices() {
        return service.getInvoicesCount();
    }

    @GetMapping("/pending-amount")
    public PendingAmountDTO getPendingAmount() {
        return service.getPendingAmount();
    }

    @GetMapping("/paid-amount")
    public PaidAmountDTO getPaidAmount() {
        return service.getPaidAmount();
    }

    @PostMapping
    public InvoiceDTO addInvoice(@Valid @RequestBody InvoiceDTO dto) {
        return service.addInvoice(dto);
    }

    @PutMapping
    public InvoiceDTO updateEntity(@Valid @RequestBody InvoiceDTO dto) {
        return service.updateInvoice(dto);
    }

    @DeleteMapping("/{invoiceId}")
    public void deleteInvoice(@PathVariable UUID invoiceId) {
        service.deleteInvoice(invoiceId);
    }

}
