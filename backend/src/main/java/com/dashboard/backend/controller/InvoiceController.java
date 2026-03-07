package com.dashboard.backend.controller;

import com.dashboard.backend.dto.InvoiceCountDTO;
import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.dto.PaidAmountDTO;
import com.dashboard.backend.dto.PendingAmountDTO;
import com.dashboard.backend.exception.BadRequestException;
import com.dashboard.backend.response.ApiResponse;
import com.dashboard.backend.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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
    public ResponseEntity<ApiResponse<List<InvoiceDTO>>> getInvoices() {
        List<InvoiceDTO> invoices = service.getInvoices();
        ApiResponse<List<InvoiceDTO>> response = new ApiResponse<>(true, HttpStatus.OK.value(), "Invoices fetched successfully", invoices);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{invoiceId}")
    public ResponseEntity<ApiResponse<InvoiceDTO>> getInvoiceById(@PathVariable UUID invoiceId) {

        if (invoiceId == null) {
            throw new BadRequestException("Invalid request");
        }

        Optional<InvoiceDTO> invoice = service.getInvoiceById(invoiceId);

        if (invoice.isPresent()) {
            ApiResponse<InvoiceDTO> response = new ApiResponse<InvoiceDTO>(true, HttpStatus.OK.value(), "Invoice fetched successfully", invoice.get());
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<InvoiceDTO> response =
                    new ApiResponse<>(false, 404, "Invoice not found", null);

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
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
