package com.miksa.hr.controller;

import com.miksa.hr.dto.AbsencePermissionDTO;
import com.miksa.hr.dto.AbsencePermissionRequestDTO;
import com.miksa.hr.entity.enums.PermissionState;
import com.miksa.hr.service.AbsencePermissionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/absence-permission")
@CrossOrigin
public class AbsencePermissionController {

    private final AbsencePermissionService absencePermissionService;

    public AbsencePermissionController(AbsencePermissionService absencePermissionService) {
        this.absencePermissionService = absencePermissionService;
    }

//    @PostMapping("hello")
//    public String hello(String msj){
//        return msj;
//    }

    @GetMapping
    public ResponseEntity<List<AbsencePermissionDTO>> getAbsencePermissions(){
        return ResponseEntity.ok(absencePermissionService.getAbsencePermissions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AbsencePermissionDTO> getAbsencePermissionById(@PathVariable Long id){
        return ResponseEntity.ok(absencePermissionService.getAbsencePermissionById(id));
    }

    @PostMapping
    public ResponseEntity<AbsencePermissionDTO> saveAbsencePermission(@Valid @RequestBody AbsencePermissionRequestDTO absencePermissionDTO){
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(absencePermissionService.saveAbsencePermission(absencePermissionDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AbsencePermissionDTO> updateAbsencePermission(@PathVariable Long id, @Valid @RequestBody AbsencePermissionRequestDTO absencePermissionDTO){
        return ResponseEntity.ok(absencePermissionService.updateAbsencePermission(id, absencePermissionDTO));
    }

    @PatchMapping("/state/{id}")
    public ResponseEntity<String> updateAbsencePermissionState(@PathVariable Long id, @RequestBody PermissionState state){
        return ResponseEntity.ok(absencePermissionService.updateAbsencePermissionState(id, state));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAbsencePermission(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(absencePermissionService.deleteAbsencePermission(id));
    }
}
