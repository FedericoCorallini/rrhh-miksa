package com.miksa.hr.controller;

import com.miksa.hr.dto.EmployeeDTO;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getEmployees(){
     return ResponseEntity.ok(employeeService.getEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id){
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PostMapping
    public ResponseEntity<String> saveEmployee(@RequestBody Employee employee){
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(employeeService.saveEmployee(employee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
        return ResponseEntity.ok(employeeService.updateEmployee(id, employee));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(employeeService.deleteEmployee(id));
    }
}
