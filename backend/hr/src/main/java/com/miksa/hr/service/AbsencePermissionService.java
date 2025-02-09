package com.miksa.hr.service;

import com.miksa.hr.dto.AbsencePermissionDTO;
import com.miksa.hr.dto.AbsencePermissionRequestDTO;
import com.miksa.hr.dto.EmployeeDTO;
import com.miksa.hr.entity.AbsencePermission;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.entity.enums.PermissionState;
import com.miksa.hr.repository.IAbsencePermissionRepository;
import java.util.HashMap;
import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.thymeleaf.context.Context;

@Service
public class AbsencePermissionService {

    private final IAbsencePermissionRepository absencePermissionRepository;
    private final EmployeeService employeeService;
    private final ModelMapper modelMapper;

    private final EmailService emailService;

    public AbsencePermissionService(IAbsencePermissionRepository absencePermissionRepository, EmployeeService employeeService, ModelMapper modelMapper, EmailService emailService) {
        this.absencePermissionRepository = absencePermissionRepository;
        this.employeeService = employeeService;
        this.modelMapper = modelMapper;
        this.emailService = emailService;
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
        emailService.send("permission_request", createRequestContext(savedPermission), employeeService.getManagerEmails(), "Solicitud de permiso");
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
        String[] destinationEmail = new String[1];
        destinationEmail[0] = absencePermission.getEmployee().getEmail();
        emailService.send("permission_response", createResponseContext(absencePermission), destinationEmail, "Respuesta de solicitud");
        return "Estado actualizado";
    }

    public String deleteAbsencePermission(Long id) {
        AbsencePermission absencePermission = findAbsencePermission(id);
        absencePermission.setEliminated(true);
        absencePermissionRepository.save(absencePermission);
        return "Permiso eliminado";
    }

    private Context createRequestContext(AbsencePermission absencePermission) {
        Context context = new Context();
        Map<String, Object> properties = new HashMap<>();

        properties.put("start_date", absencePermission.getStartDate());
        properties.put("end_date", absencePermission.getEndDate());
        properties.put("start_time", absencePermission.getStartTime());
        properties.put("end_time", absencePermission.getEndTime());
        properties.put("reason", absencePermission.getReason());
        properties.put("employee_name", absencePermission.getEmployee().getFullName());
        properties.put("details", absencePermission.getDetails());

        context.setVariables(properties);
        return context;
    }

    private Context createResponseContext(AbsencePermission absencePermission) {
        Context context = new Context();
        Map<String, Object> properties = new HashMap<>();

        properties.put("start_date", absencePermission.getStartDate());
        properties.put("end_date", absencePermission.getEndDate());
        properties.put("start_time", absencePermission.getStartTime());
        properties.put("end_time", absencePermission.getEndTime());
        properties.put("reason", absencePermission.getReason());
        properties.put("details", absencePermission.getDetails());
        properties.put("state", absencePermission.getPermissionState().name());

        context.setVariables(properties);
        return context;
    }
}
