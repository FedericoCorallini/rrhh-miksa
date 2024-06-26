package com.miksa.hr.service;

import com.miksa.hr.dto.DocumentationDTO;
import com.miksa.hr.dto.DocumentationRequestDTO;
import com.miksa.hr.entity.AbsencePermission;
import com.miksa.hr.entity.Documentation;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.repository.IAbsencePermissionRepository;
import com.miksa.hr.repository.IDocumentationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
public class DocumentationService {

    private final EmployeeService employeeService;
    private final AbsencePermissionService absencePermissionService;
    private final IDocumentationRepository documentationRepository;
    private final ModelMapper modelMapper;

    public DocumentationService(EmployeeService employeeService, AbsencePermissionService absencePermissionService, IAbsencePermissionRepository absencePermissionRepository, IDocumentationRepository documentationRepository, ModelMapper modelMapper) {
        this.employeeService = employeeService;
        this.absencePermissionService = absencePermissionService;
        this.documentationRepository = documentationRepository;
        this.modelMapper = modelMapper;
    }

    public DocumentationDTO downloadDocumentation(Long id) {
        Documentation documentation = findDocumentation(id);
        return modelMapper.map(documentation, DocumentationDTO.class);
    }

    @Transactional
    public DocumentationDTO uploadDocumentation(DocumentationRequestDTO documentationDTO) {

        Employee employee = employeeService.findEmployee(documentationDTO.getEmployee());
        Documentation documentation = modelMapper.map(documentationDTO, Documentation.class);
        documentation.setUploadedDate(LocalDateTime.now());

        if(!documentationDTO.getDocumentationType().name().equals("DDJJ")){
            AbsencePermission absencePermission = absencePermissionService.findAbsencePermission(documentationDTO.getAbsencePermission());
            absencePermission.setDocumentation(documentation);
            documentation.setAbsencePermission(absencePermission);
        }

        documentation.setEmployee(employee);
        documentationRepository.save(documentation);
        return modelMapper.map(documentation, DocumentationDTO.class);
    }

    public DocumentationDTO updateDocumentation(Long idDocumentation, DocumentationRequestDTO documentationDTO) {
        Documentation documentation = findDocumentation(idDocumentation);
        // evaluar posibilidad de modificar parametros
        documentation.setDescription("new description");
        documentationRepository.save(documentation);
        return modelMapper.map(documentation, DocumentationDTO.class);
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

    public String uploadFile(Long idDocumentation, MultipartFile file) throws IOException {

        Documentation documentation = findDocumentation(idDocumentation);
        var path = "../../../../documentation/" + documentation.getEmployee().getId();

        try {
            if(file.isEmpty()) {
                throw new RuntimeException("Empty file");
            }
            Path destinationPath = Paths.get(path)
                    .normalize()
                    .toAbsolutePath();
            if (Files.notExists(destinationPath)) {
                Files.createDirectories(destinationPath);
            }
            Path destination = destinationPath.resolve(Objects.requireNonNull(file.getOriginalFilename()));
            Files.copy(file.getInputStream(), destination);
            documentation.setPathToFile(destination.toString());

        } catch(IOException e) {
            throw new RuntimeException("Store exception");
        }

        documentationRepository.save(documentation);
        return documentation.getPathToFile();
    }

    public Resource downloadFile(Long idDocumentation) throws MalformedURLException {
        Documentation documentation = findDocumentation(idDocumentation);
        var location = documentation.getPathToFile();
        var uri = Paths.get(location).toUri();
        return new UrlResource(uri);

    }
}
