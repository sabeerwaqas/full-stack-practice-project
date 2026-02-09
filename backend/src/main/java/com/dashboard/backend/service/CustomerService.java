package com.dashboard.backend.service;

import com.dashboard.backend.dto.CustomerCountDTO;
import com.dashboard.backend.dto.CustomerDTO;
import com.dashboard.backend.entity.CustomerEntity;
import com.dashboard.backend.mapper.CustomerMapper;
import com.dashboard.backend.repository.CustomerRepository;
import com.dashboard.backend.repository.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final InvoiceRepository invoiceRepository;

    public CustomerService(CustomerRepository customerRepository, InvoiceRepository invoiceRepository) {
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
    }

    public CustomerDTO addCustomer(CustomerDTO dto) {
        CustomerEntity entity = CustomerMapper.toEntity(dto);
        CustomerEntity saved = customerRepository.save(entity);
        return CustomerMapper.toDTO(saved);
    }

    public CustomerCountDTO getCustomersCount(){
        return new CustomerCountDTO(customerRepository.count());
    }

    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
    }
}
