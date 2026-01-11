package com.dashboard.backend.mapper;


import com.dashboard.backend.dto.CustomerDTO;
import com.dashboard.backend.entity.CustomerEntity;

public class CustomerMapper {

    public static CustomerEntity toEntity(CustomerDTO dto) {
        CustomerEntity c = new CustomerEntity();
        c.setName(dto.name);
        c.setEmail(dto.email);
        c.setImage_url(dto.image_url);
        return c;
    }

    public static CustomerDTO toDTO(CustomerEntity c) {
        CustomerDTO dto = new CustomerDTO();
        dto.id = c.getId();
        dto.name = c.getName();
        dto.email = c.getEmail();
        dto.image_url = c.getImage_url();
        return dto;
    }
}
