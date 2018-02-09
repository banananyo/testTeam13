package com.example.demo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface CustomerRepository extends CrudRepository<Customer,Long> {
    Customer findByFirstName(String firstName);
}
