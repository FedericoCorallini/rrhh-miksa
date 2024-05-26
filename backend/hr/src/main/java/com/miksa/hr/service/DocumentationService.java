package com.miksa.hr.service;

import com.miksa.hr.dto.DocumentationDTO;
import com.miksa.hr.entity.AbsencePermission;
import com.miksa.hr.entity.Documentation;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.repository.IDocumentationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class DocumentationService {

    private final EmployeeService employeeService;
    private final AbsencePermissionService absencePermissionService;
    private final IDocumentationRepository documentationRepository;
    private final ModelMapper modelMapper;

    public DocumentationService(EmployeeService employeeService, AbsencePermissionService absencePermissionService, IDocumentationRepository documentationRepository, ModelMapper modelMapper) {
        this.employeeService = employeeService;
        this.absencePermissionService = absencePermissionService;
        this.documentationRepository = documentationRepository;
        this.modelMapper = modelMapper;
    }

    public DocumentationDTO uploadDocumentation(DocumentationDTO documentationDTO) {

        Employee employee = employeeService.findEmployee(documentationDTO.getIdEmployee());
        Documentation documentation = modelMapper.map(documentationDTO, Documentation.class);
        documentation.setUploadedDate(LocalDateTime.now());

        if(!documentationDTO.getDocumentationType().name().equals("DDJJ")){
            AbsencePermission absencePermission = absencePermissionService.findAbsencePermission(documentationDTO.getIdAbsencePermission());
            documentation.setAbsencePermission(absencePermission);
        }

        documentation.setEmployee(employee);
        documentationRepository.save(documentation);
        return documentationDTO;
    }

    public DocumentationDTO updateDocumentation(Long idDocumentation, DocumentationDTO documentationDTO) {
        Documentation documentation = findDocumentation(idDocumentation);
        // evaluar posibilidad de modificar parametros
        documentation.setDescription("new description");
        documentationRepository.save(documentation);
        return documentationDTO;
    }

    public String deleteDocumentation(Long id) {
        Documentation documentation = findDocumentation(id);
        documentation.setEliminated(true);
        documentationRepository.save(documentation);
        return "Documento eliminado";
    }

    public Documentation findDocumentation(Long id) {
        Optional<Documentation> documentationOptional = documentationRepository.findByIdAndEliminated(id, false);
        if(documentationOptional.isEmpty()){
            throw new RuntimeException("La documentacion no existe");
        }
        return documentationOptional.get();
    }
}
