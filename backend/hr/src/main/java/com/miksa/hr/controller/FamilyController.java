package com.miksa.hr.controller;


import com.miksa.hr.dto.FamilyDTO;
import com.miksa.hr.dto.FamilyRequestDTO;
import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.service.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/families")
@CrossOrigin
public class FamilyController {
    private final FamilyService familyService;

    public FamilyController(FamilyService familyService) {
        this.familyService = familyService;
    }

    @GetMapping
    public ResponseEntity<List<FamilyDTO>> getFamilies() {
        List<FamilyDTO> familyList = familyService.getFamilies(); // Asegúrate de tener este método en tu servicio.
        return ResponseEntity.ok(familyList);
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<FamilyDTO>> getFamiliesByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(familyService.getFamiliesByEmployeeId(employeeId));
    }


   @PostMapping
   public ResponseEntity<FamilyDTO> createFamily(@Validated @RequestBody FamilyRequestDTO familyRequestDTO) {
       // Ahora el servicio retorna un FamilyDTO
       FamilyDTO createdFamily = familyService.saveFamily(familyRequestDTO);

       // Retornamos el FamilyDTO en la respuesta
       return ResponseEntity.status(HttpStatus.CREATED).body(createdFamily);
   }
    @PutMapping("/{id}")
    public ResponseEntity<FamilyDTO> updateFamily(@PathVariable Long id, @Validated @RequestBody FamilyRequestDTO familyRequestDTO) {
        FamilyDTO updatedFamily = familyService.updateFamily(id, familyRequestDTO);
        return updatedFamily != null ? ResponseEntity.ok(updatedFamily) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamily(@PathVariable Long id) {
        familyService.deleteFamily(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/birthdays")
    public ResponseEntity<List<FamilyDTO>> findFamiliesByBirthday(@RequestParam LocalDate birthDate) {
        return ResponseEntity.ok(familyService.findFamiliesByBirthday(birthDate));
    }

    @GetMapping("/relation")
    public ResponseEntity<List<FamilyDTO>> findFamiliesByRelation(@RequestParam String relation) {
        try {
            FamilyRelation familyRelation = FamilyRelation.valueOf(relation.toUpperCase());
            return ResponseEntity.ok(familyService.findFamiliesByRelation(familyRelation));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Maneja relaciones inválidas
        }
    }
}
