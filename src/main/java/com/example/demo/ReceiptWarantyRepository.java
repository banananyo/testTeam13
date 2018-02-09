package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface ReceiptWarantyRepository extends CrudRepository<ReceiptWaranty,Long> {

}
