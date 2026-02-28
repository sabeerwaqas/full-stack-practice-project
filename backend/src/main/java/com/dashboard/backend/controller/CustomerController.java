package com.dashboard.backend.controller;

import com.dashboard.backend.dto.CustomerCountDTO;
import com.dashboard.backend.dto.CustomerDTO;
import com.dashboard.backend.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public CustomerDTO addCustomer(@Valid @RequestBody CustomerDTO dto) {
        return service.addCustomer(dto);
    }

    @GetMapping("/all")
    public List<CustomerDTO> getAllCustomers() {
        return service.getAllCustomers();
    }

    @GetMapping("/count")
    public CustomerCountDTO getCustomersCount() {
        return service.getCustomersCount();
    }
}
