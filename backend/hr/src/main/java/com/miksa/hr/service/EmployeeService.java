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

    public String saveEmployee(Employee employee){
        employeeRepository.save(employee);
        return "El empleado se ha guardado correctamente";
    }

    public EmployeeDTO getEmployeeById(Long id){
        Optional<Employee> employeeOptional = employeeRepository.findByIdAndEliminated(id, false);
        if(employeeOptional.isEmpty()){
            throw new RuntimeException("El empleado no existe");
        }
        return modelMapper.map(employeeOptional.get(), EmployeeDTO.class);
    }

    public List<EmployeeDTO> getEmployees() {
        List<Employee> employeeList = employeeRepository.findByEliminated(false);
        return employeeList.stream().map(employee -> modelMapper.map(employee, EmployeeDTO.class)).collect(Collectors.toList());
    }

    public EmployeeDTO updateEmployee(Long id, Employee employee){
        Optional<Employee> employeeOptional = employeeRepository.findByIdAndEliminated(id, false);
        if(employeeOptional.isEmpty()){
            throw new RuntimeException("El empleado no existe");
        }
        Employee employeePersisted = employeeOptional.get();
        employeePersisted.setFirstname(employee.getFirstname());
        employeeRepository.save(employeePersisted);
        return modelMapper.map(employeePersisted, EmployeeDTO.class);

    }

    public String deleteEmployee(Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findByIdAndEliminated(id, false);
        if(employeeOptional.isEmpty()){
            throw new RuntimeException("El empleado no existe");
        }
        Employee employee = employeeOptional.get();
        employee.setEliminated(true);
        employeeRepository.save(employee);
        return "Empleado eliminado";
    }
}
