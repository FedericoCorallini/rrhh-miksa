package com.miksa.hr.service;

import com.miksa.hr.dto.EmployeeDTO;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.repository.IEmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final IEmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    public EmployeeService(IEmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO){
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        employeeRepository.save(employee);
        return employeeDTO;
    }

    public EmployeeDTO getEmployeeById(Long id){
        Employee employee = findEmployee(id);
        return modelMapper.map(employee, EmployeeDTO.class);
    }

    public List<EmployeeDTO> getEmployees() {
        List<Employee> employeeList = employeeRepository.findByEliminated(false);
        return employeeList.stream().map(employee -> modelMapper.map(employee, EmployeeDTO.class)).collect(Collectors.toList());
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO){
        Employee employeePersisted = findEmployee(id);
        // evaluar posibilidad de modificar datos de los empleados y cuales
        employeePersisted.setFirstname(employeeDTO.getFirstname());
        employeeRepository.save(employeePersisted);
        return modelMapper.map(employeePersisted, EmployeeDTO.class);

    }

    public String deleteEmployee(Long id) {
        Employee employee = findEmployee(id);
        employee.setEliminated(true);
        employeeRepository.save(employee);
        return "Empleado eliminado";
    }

    public Employee findEmployee(Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findByIdAndEliminated(id, false);
        if(employeeOptional.isEmpty()){
            throw new RuntimeException("El empleado no existe");
        }
        return employeeOptional.get();
    }
}
