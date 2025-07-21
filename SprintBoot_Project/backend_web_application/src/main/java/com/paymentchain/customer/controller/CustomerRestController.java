package com.paymentchain.customer.controller;

import com.paymentchain.customer.entity.Customer;
import com.paymentchain.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = {"http://localhost:4200", "https://fronted-web-application.onrender.com/"})
public class CustomerRestController {
    @Autowired // CREO LA INSTANCIA, EN VEZ DE CREARLO EN EL CONSTRUCTOR
    CustomerRepository customerRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Customer> get(@PathVariable(name = "id") long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            return ResponseEntity.ok(customer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<Customer>  put(@RequestBody Customer input) {
        Customer find = new Customer();
        find.setCode(input.getCode());
        find.setName(input.getName());
        find.setSurname(input.getSurname());
        find.setPhone(input.getPhone());
        find.setAddress(input.getAddress());
        find.setIban(input.getIban());

        Customer save = customerRepository.save(find);
        return ResponseEntity.ok(save);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Customer> put(@PathVariable(name = "id") long id, @RequestBody Customer input) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Customer find = customer.get();
        find.setCode(input.getCode());
        find.setName(input.getName());
        find.setSurname(input.getSurname());
        find.setPhone(input.getPhone());
        find.setAddress(input.getAddress());
        find.setIban(input.getIban());
        Customer saved = customerRepository.save(find);
        return ResponseEntity.ok(saved);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Customer> delete(@PathVariable(name = "id") long id) {
        Optional<Customer> findById = customerRepository.findById(id);
        customerRepository.delete(findById.get());
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public List<Customer> getAll() {
        return customerRepository.findAll();
    }
}
