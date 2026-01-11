package com.dashboard.backend.controller;

import com.dashboard.backend.dto.CustomerDTO;
import com.dashboard.backend.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @PostMapping
    public CustomerDTO addCustomer(@Valid @RequestBody CustomerDTO dto) {
        return service.addCustomer(dto);
    }

    @GetMapping
    public List<CustomerDTO> getAllCustomers() {
        return service.getAllCustomers();
    }
}
