package com.dashboard.backend.controller;

import com.dashboard.backend.dto.InvoiceCountDTO;
import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.dto.PendingAmountDTO;
import com.dashboard.backend.service.CustomerService;
import com.dashboard.backend.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
    private final InvoiceService service;

    public InvoiceController(InvoiceService service) {
        this.service = service;
    }

    @PostMapping
    public InvoiceDTO addInvoice(@Valid @RequestBody InvoiceDTO dto){
        return service.addInvoice(dto);
    }

    @GetMapping
    public List<InvoiceDTO> getInvoice(){
        return service.getInvoices();
    }

    @GetMapping("/count")
    public InvoiceCountDTO getTotalInvoices(){
        return service.getInvoicesCount();
    }

    @GetMapping("/pending-amount")
    public PendingAmountDTO getPendingAmount(){
        return service.getPendingAmount();
    }

    @PutMapping
    public InvoiceDTO updateEntity(@Valid @RequestBody InvoiceDTO dto){
        return service.updateInvoice(dto);
    }

}
