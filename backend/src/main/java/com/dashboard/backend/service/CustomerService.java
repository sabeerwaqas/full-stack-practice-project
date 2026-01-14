package com.dashboard.backend.service;

import com.dashboard.backend.dto.CustomerCountDTO;
import com.dashboard.backend.dto.CustomerDTO;
import com.dashboard.backend.entity.CustomerEntity;
import com.dashboard.backend.mapper.CustomerMapper;
import com.dashboard.backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public CustomerDTO addCustomer(CustomerDTO dto) {
        CustomerEntity entity = CustomerMapper.toEntity(dto);
        CustomerEntity saved = repository.save(entity);
        return CustomerMapper.toDTO(saved);
    }

    public CustomerCountDTO getCustomersCount(){
        return new CustomerCountDTO(repository.count());
    }

    public List<CustomerDTO> getAllCustomers() {
        return repository.findAll()
                .stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
    }
}
