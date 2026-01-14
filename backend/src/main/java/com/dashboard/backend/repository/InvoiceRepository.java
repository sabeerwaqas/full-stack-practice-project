package com.dashboard.backend.repository;

import com.dashboard.backend.entity.CustomerEntity;
import com.dashboard.backend.entity.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InvoiceRepository extends JpaRepository<InvoiceEntity, UUID> {
    @Query("""
        SELECT COALESCE(SUM(i.amount), 0)
        FROM InvoiceEntity i
        WHERE i.status = 'pending'
    """)
    long sumPendingAmount();

    @Query("""
        SELECT COALESCE(SUM(i.amount), 0)
        FROM InvoiceEntity i
        WHERE i.status = 'paid'
    """)
    long sumPaidAmount();
}

