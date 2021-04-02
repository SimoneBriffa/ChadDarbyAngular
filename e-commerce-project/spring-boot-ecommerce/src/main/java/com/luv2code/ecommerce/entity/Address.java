package com.luv2code.ecommerce.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="city")
    private String city;
    @Column(name="street")
    private String street;
    @Column(name="state")
    private String state;
    @Column(name="country")
    private String country;
    @Column(name="zip_code")
    private String zipCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;
}
