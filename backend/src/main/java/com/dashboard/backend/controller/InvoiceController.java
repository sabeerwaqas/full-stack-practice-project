package com.dashboard.backend.controller;

import com.dashboard.backend.dto.InvoiceDTO;
import com.dashboard.backend.service.CustomerService;
import com.dashboard.backend.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoice")
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

}
