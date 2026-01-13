package com.dashboard.backend.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "invoices")
public class InvoiceEntity {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    @Column(nullable = false, unique = true)
    private UUID customerId;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Date date;

    public UUID getId(){
        return this.id;
    }

    public UUID getCustomerId(){
        return this.customerId;
    }

    public Integer getAmount(){
        return this.amount;
    }

    public String getStatus(){
        return this.status;
    }

    public Date getDate(){
        return this.date;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDate(Date date){
        this.date = date;
    }
}
