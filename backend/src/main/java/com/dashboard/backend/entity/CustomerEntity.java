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
    @GeneratedValue
    @org.hibernate.annotations.UuidGenerator
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    // ===== Getters =====

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail(){
        return email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    // ===== Setters =====

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }


}
