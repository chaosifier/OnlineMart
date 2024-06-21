package com.minimart.product.entity;

import com.minimart.category.entity.ProductCategory;
import com.minimart.common.RecordType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ProductData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String value;

    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private RecordType type;

    private String unit;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;
}
