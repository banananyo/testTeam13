package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface HardwareRepository extends CrudRepository<Hardware, String> {
    Hardware findByHardwareID(
            @Param("hardwareID") String hardwareID

    );


}


