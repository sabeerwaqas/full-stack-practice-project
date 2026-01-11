package com.dashboard.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "customers")
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    public Long getId() {
        return this.id;
    }
}
