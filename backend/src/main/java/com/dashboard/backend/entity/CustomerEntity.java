package com.dashboard.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

@Entity
@Table(name = "customers")
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String image_url;


    public String getName() {
        return this.name;
    }

    public String getEmail(){
        return this.email;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setName(@NotBlank String name) {
    }

    public void setEmail(@NotBlank @Email String email) {
    }

    public void setImage_url(String image_url){
    }

    public UUID getId() {
        return this.id;
    }
}
