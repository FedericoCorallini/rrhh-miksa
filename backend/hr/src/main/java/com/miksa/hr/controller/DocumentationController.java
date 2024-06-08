package com.miksa.hr.controller;

import com.miksa.hr.dto.DocumentationDTO;
import com.miksa.hr.dto.DocumentationRequestDTO;
import com.miksa.hr.service.DocumentationService;
import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/documentation")
@CrossOrigin
public class DocumentationController {

    public final DocumentationService documentationService;

    public DocumentationController(DocumentationService documentationService){
        this.documentationService = documentationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentationDTO> downloadDocumentation(@PathVariable Long id){
        return ResponseEntity.ok(documentationService.downloadDocumentation(id));
    }

    @PostMapping()
    public ResponseEntity<DocumentationDTO> uploadDocumentation(@Valid @RequestBody DocumentationRequestDTO documentationDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(documentationService.uploadDocumentation(documentationDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentationDTO> updateDocumentation(
            @PathVariable Long id,
            @Valid @RequestBody DocumentationRequestDTO documentationDTO
    ){
        return ResponseEntity.ok(documentationService.updateDocumentation(id, documentationDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocumentation(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(documentationService.deleteDocumentation(id));
    }

    @PostMapping(value = "/upload/{idDocumentation}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFile(@PathVariable Long idDocumentation, @RequestPart(value = "file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(documentationService.uploadFile(idDocumentation, file));
    }

    @GetMapping(value = "/download/{idDocumentation}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Resource> downloadFile(@PathVariable Long idDocumentation) throws MalformedURLException {
        return ResponseEntity.ok(documentationService.downloadFile(idDocumentation));
    }

}
