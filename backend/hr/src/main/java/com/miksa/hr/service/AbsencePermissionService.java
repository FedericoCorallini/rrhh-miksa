package com.miksa.hr.service;

import com.miksa.hr.dto.AbsencePermissionDTO;
import com.miksa.hr.dto.AbsencePermissionRequestDTO;
import com.miksa.hr.dto.EmployeeDTO;
import com.miksa.hr.entity.AbsencePermission;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.entity.enums.PermissionState;
import com.miksa.hr.repository.IAbsencePermissionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AbsencePermissionService {

    private final IAbsencePermissionRepository absencePermissionRepository;
    private final EmployeeService employeeService;
    private final ModelMapper modelMapper;

    public AbsencePermissionService(IAbsencePermissionRepository absencePermissionRepository, EmployeeService employeeService, ModelMapper modelMapper) {
        this.absencePermissionRepository = absencePermissionRepository;
        this.employeeService = employeeService;
        this.modelMapper = modelMapper;
    }

    public List<AbsencePermissionDTO> getAbsencePermissions() {
        List<AbsencePermission> absencePermissionsList = absencePermissionRepository.findByEliminated(false);
        return absencePermissionsList.stream()
                .map(absencePermission -> modelMapper.map(absencePermission, AbsencePermissionDTO.class))
                .collect(Collectors.toList());
    }

    public AbsencePermissionDTO getAbsencePermissionById(Long id) {
        return modelMapper.map(findAbsencePermission(id), AbsencePermissionDTO.class);
    }

    public AbsencePermission findAbsencePermission(Long id){
        Optional<AbsencePermission> absencePermissionOptional = absencePermissionRepository.findByIdAndEliminated(id, false);
        if(absencePermissionOptional.isEmpty()){
            throw new RuntimeException("El permiso no existe");
        }
        return absencePermissionOptional.get();
    }

    public AbsencePermissionDTO saveAbsencePermission(AbsencePermissionRequestDTO absencePermissionDTO) {
        Employee employee = employeeService.findEmployee(absencePermissionDTO.getEmployeeId());
        AbsencePermission absencePermission = modelMapper.map(absencePermissionDTO, AbsencePermission.class);
        absencePermission.setPermissionState(PermissionState.PENDIENTE);
        absencePermission.setEmployee(employee);
        AbsencePermission savedPermission = absencePermissionRepository.save(absencePermission);
        return modelMapper.map(savedPermission, AbsencePermissionDTO.class);
    }

    public AbsencePermissionDTO updateAbsencePermission(Long id, AbsencePermissionRequestDTO absencePermissionDTO) {
        AbsencePermission absencePermission = findAbsencePermission(id);
        // campos variables a modificar
        AbsencePermission absencePermission1 = modelMapper.map(absencePermissionDTO, AbsencePermission.class);
        absencePermission.setReason(absencePermissionDTO.getReason());
        absencePermissionRepository.save(absencePermission1);
        return modelMapper.map(absencePermission, AbsencePermissionDTO.class);
    }

    public String updateAbsencePermissionState(Long id, PermissionState state) {
        AbsencePermission absencePermission = findAbsencePermission(id);
        absencePermission.setPermissionState(state);
        absencePermissionRepository.save(absencePermission);
        return "Estado actualizado";
    }

    public String deleteAbsencePermission(Long id) {
        AbsencePermission absencePermission = findAbsencePermission(id);
        absencePermission.setEliminated(true);
        absencePermissionRepository.save(absencePermission);
        return "Permiso eliminado";
    }
}
