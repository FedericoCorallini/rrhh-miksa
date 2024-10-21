package com.miksa.hr.controller;


import com.miksa.hr.dto.RelativeDTO;
import com.miksa.hr.dto.RelativeRequestDTO;
import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.service.RelativeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/families")
@CrossOrigin
public class RelativeController {
    private final RelativeService relativeService;

    public RelativeController(RelativeService relativeService) {
        this.relativeService = relativeService;
    }

    @GetMapping
    public ResponseEntity<List<RelativeDTO>> getFamilies() {
        List<RelativeDTO> familyList = relativeService.getFamilies();
        return ResponseEntity.ok(familyList);
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<RelativeDTO>> getFamiliesByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(relativeService.getFamiliesByEmployeeId(employeeId));
    }


   @PostMapping
   public ResponseEntity<RelativeDTO> createFamily(@Validated @RequestBody RelativeRequestDTO relativeRequestDTO) {
       // Ahora el servicio retorna un FamilyDTO
       RelativeDTO createdFamily = relativeService.saveFamily(relativeRequestDTO);

       // Retornamos el FamilyDTO en la respuesta
       return ResponseEntity.status(HttpStatus.CREATED).body(createdFamily);
   }

    @PutMapping("/{id}")
    public ResponseEntity<RelativeDTO> updateFamily(@PathVariable Long id, @Validated @RequestBody RelativeRequestDTO relativeRequestDTO) {
        RelativeDTO updatedFamily = relativeService.updateFamily(id, relativeRequestDTO);
        return updatedFamily != null ? ResponseEntity.ok(updatedFamily) : ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamily(@PathVariable Long id) {
        relativeService.deleteFamily(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/birthdays")
    public ResponseEntity<List<RelativeDTO>> findFamiliesByBirthday(@RequestParam LocalDate birthDate) {
        return ResponseEntity.ok(relativeService.findFamiliesByBirthday(birthDate));
    }

    @GetMapping("/relation")
    public ResponseEntity<List<RelativeDTO>> findFamiliesByRelation(@RequestParam String relation) {
        try {
            FamilyRelation familyRelation = FamilyRelation.valueOf(relation.toUpperCase());
            return ResponseEntity.ok(relativeService.findFamiliesByRelation(familyRelation));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Maneja relaciones inválidas
        }
    }
}
