package com.saasflow.jar.dto;

import com.saasflow.jar.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegisterResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
}