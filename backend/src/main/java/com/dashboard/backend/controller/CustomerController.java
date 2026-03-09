package com.dashboard.backend.controller;

import com.dashboard.backend.dto.CustomerCountDTO;
import com.dashboard.backend.dto.CustomerDTO;
import com.dashboard.backend.response.ApiResponse;
import com.dashboard.backend.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CustomerDTO>>> getAllCustomers() {
        List<CustomerDTO> customers = service.getAllCustomers();
        ApiResponse<List<CustomerDTO>> response = new ApiResponse<List<CustomerDTO>>(true, HttpStatus.OK.value(), "Customers fetched successfully", customers);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/count")
    public ResponseEntity<ApiResponse<CustomerCountDTO>> getCustomersCount() {
        CustomerCountDTO totalCustomers = service.getCustomersCount();
        ApiResponse<CustomerCountDTO> response = new ApiResponse<CustomerCountDTO>(true, HttpStatus.OK.value(), "Customer count fetched successfully", totalCustomers);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<CustomerDTO>> addCustomer(@Valid @RequestBody CustomerDTO dto) {
        CustomerDTO newCustomer = service.addCustomer(dto);
        ApiResponse<CustomerDTO> response = new ApiResponse<CustomerDTO>(true, HttpStatus.OK.value(), "Customer added successfully", newCustomer);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
