package com.dashboard.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "invoices")
public class InvoiceEntity {

    @Id
    @Column(nullable = false, unique = true)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false,insertable=false, updatable=false)
    private CustomerEntity customer;

    @Column(nullable = false, unique = true)
    private UUID customer_id;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Date date;


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

    public CustomerEntity getCustomer() {
        return customer;
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

    public void setCustomerId(UUID id){
        this.customer_id = id;
    }
}
