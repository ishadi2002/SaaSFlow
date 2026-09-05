package com.saasflow.jar.service;

import com.saasflow.jar.dto.OrganizationRequest;
import com.saasflow.jar.dto.OrganizationResponse;
import com.saasflow.jar.entity.Organization;
import com.saasflow.jar.entity.User;
import com.saasflow.jar.exception.ForbiddenException;
import com.saasflow.jar.exception.ResourceNotFoundException;
import com.saasflow.jar.repository.OrganizationRepository;
import com.saasflow.jar.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;

    public OrganizationService(
            OrganizationRepository organizationRepository,
            UserRepository userRepository) {

        this.organizationRepository = organizationRepository;
        this.userRepository = userRepository;
    }

    public OrganizationResponse createOrganization(
            OrganizationRequest request,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Organization organization = Organization.builder()
                .name(request.getName())
                .industry(request.getIndustry())
                .ownerId(user.getId())
                .build();

        Organization savedOrganization =
                organizationRepository.save(organization);

        return new OrganizationResponse(
                savedOrganization.getId(),
                savedOrganization.getName(),
                savedOrganization.getIndustry(),
                savedOrganization.getOwnerId(),
                savedOrganization.getCreatedAt()
        );
    }

    public List<OrganizationResponse> getOrganizationsByUser(
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return organizationRepository
                .findByOwnerId(user.getId())
                .stream()
                .map(organization ->
                        new OrganizationResponse(
                                organization.getId(),
                                organization.getName(),
                                organization.getIndustry(),
                                organization.getOwnerId(),
                                organization.getCreatedAt()
                        )
                )
                .toList();
    }

    public OrganizationResponse updateOrganization(
            Long organizationId,
            OrganizationRequest request,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Organization organization = organizationRepository
                .findById(organizationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Organization not found"
                        ));

        if (!organization.getOwnerId().equals(user.getId())) {
            throw new ForbiddenException(
                    "You are not allowed to update this organization"
            );
        }

        organization.setName(request.getName());
        organization.setIndustry(request.getIndustry());

        Organization updatedOrganization =
                organizationRepository.save(organization);

        return new OrganizationResponse(
                updatedOrganization.getId(),
                updatedOrganization.getName(),
                updatedOrganization.getIndustry(),
                updatedOrganization.getOwnerId(),
                updatedOrganization.getCreatedAt()
        );
    }

    public void deleteOrganization(
            Long organizationId,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Organization organization = organizationRepository
                .findById(organizationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Organization not found"
                        ));

        if (!organization.getOwnerId().equals(user.getId())) {
            throw new ForbiddenException(
                    "You are not allowed to delete this organization"
            );
        }

        organizationRepository.delete(organization);
    }
}