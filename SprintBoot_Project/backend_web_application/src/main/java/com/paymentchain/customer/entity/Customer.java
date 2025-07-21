package com.paymentchain.customer.entity;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Data;

@Data // DEL LOMBO
@Entity // DEL JAVA PERSISTENCE
@Table(name = "customer") // PARA DECIRLE EL NOMBRE
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)// @GeneratedValue(strategy = GenerationType.AUTO) ES MAS GENERAL
    private long id;
    private String code;
    private String name;
    private String surname;
    private String phone;
    private String address;
    private String iban;
}
