package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource(exported = false)
@RepositoryRestResource(excerptProjection = GetEmployee.class)
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}


