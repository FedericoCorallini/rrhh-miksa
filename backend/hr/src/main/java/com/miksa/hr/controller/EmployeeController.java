package com.miksa.hr.controller;

import com.miksa.hr.dto.EmployeeDTO;
import com.miksa.hr.dto.EmployeeRequestDTO;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getEmployees(){
     return ResponseEntity.ok(employeeService.getEmployees());
    }

    @GetMapping("/email")
    public ResponseEntity<EmployeeDTO> getEmployeeByEmail(@AuthenticationPrincipal Jwt principal){
        return ResponseEntity.ok(employeeService.getEmployeeByEmail(principal.getClaim("email")));
    }
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id){
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PreAuthorize("hasAuthority('SCOPE_admin')")
    @PostMapping
    public ResponseEntity<EmployeeDTO> saveEmployee(@Valid @RequestBody EmployeeRequestDTO employeeDTO){
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(employeeService.saveEmployee(employeeDTO));
    }

    @PreAuthorize("hasAuthority('SCOPE_admin')")
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeRequestDTO employeeDTO){
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeDTO));
    }

    @PreAuthorize("hasAuthority('SCOPE_admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(employeeService.deleteEmployee(id));
    }
}
