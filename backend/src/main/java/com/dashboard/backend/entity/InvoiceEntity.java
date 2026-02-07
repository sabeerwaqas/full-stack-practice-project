package com.dashboard.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "invoices")
public class InvoiceEntity {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerEntity customer;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private String status;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Date date;

    public void setCustomer(CustomerEntity customer) {
        this.customer = customer;
    }

    public CustomerEntity getCustomer() {
        return customer;
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

    public UUID getInvoiceId(){
        return this.id;
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
