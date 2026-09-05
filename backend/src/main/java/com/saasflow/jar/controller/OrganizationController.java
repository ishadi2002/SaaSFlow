package com.saasflow.jar.controller;

import com.saasflow.jar.dto.OrganizationRequest;
import com.saasflow.jar.dto.OrganizationResponse;
import com.saasflow.jar.service.OrganizationService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(
            OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @PostMapping
    public ResponseEntity<OrganizationResponse> createOrganization(
            @Valid @RequestBody OrganizationRequest request,
            Authentication authentication) {

        OrganizationResponse response =
                organizationService.createOrganization(
                        request,
                        authentication.getName()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<OrganizationResponse>> getMyOrganizations(
            Authentication authentication) {

        List<OrganizationResponse> organizations =
                organizationService.getOrganizationsByUser(
                        authentication.getName()
                );

        return ResponseEntity.ok(organizations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrganizationResponse> updateOrganization(
            @PathVariable Long id,
            @Valid @RequestBody OrganizationRequest request,
            Authentication authentication) {

        OrganizationResponse response =
                organizationService.updateOrganization(
                        id,
                        request,
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrganization(
            @PathVariable Long id,
            Authentication authentication) {

        organizationService.deleteOrganization(
                id,
                authentication.getName()
        );

        return ResponseEntity.noContent().build();
    }
}