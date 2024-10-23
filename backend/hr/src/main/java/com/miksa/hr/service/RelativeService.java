package com.miksa.hr.service;

import com.miksa.hr.dto.RelativeDTO;
import com.miksa.hr.dto.RelativeRequestDTO;
import com.miksa.hr.entity.Employee;
import com.miksa.hr.entity.Relative;
import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.repository.IEmployeeRepository;
import com.miksa.hr.repository.IRelativeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RelativeService {

    private final IRelativeRepository familyRepository;
    private final IEmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    public RelativeService(IRelativeRepository familyRepository, IEmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.familyRepository = familyRepository;
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    public RelativeDTO saveFamily(RelativeRequestDTO familyDTO) {
        Relative relative = modelMapper.map(familyDTO, Relative.class);
        Employee employee = employeeRepository.findByIdAndEliminated(familyDTO.getEmployeeId(), false)
               .orElseThrow(() -> new RuntimeException("Empleado no encontrado o eliminado"));
        relative.setEmployee(employee);
        familyRepository.save(relative);
        return modelMapper.map(relative, RelativeDTO.class);
    }

    public List<RelativeDTO> getFamiliesByEmployeeId(Long employeeId) {
        List<Relative> relativeList = familyRepository.findByEmployeeId(employeeId);
        return relativeList.stream()
                .map(relative -> modelMapper.map(relative, RelativeDTO.class))
                .collect(Collectors.toList());
    }

    public RelativeDTO updateFamily(Long id, RelativeRequestDTO familyDTO) {
        Relative relativePersisted = findFamily(id);

        relativePersisted.setFirstname(familyDTO.getFirstname());
        relativePersisted.setLastname(familyDTO.getLastname());
        relativePersisted.setRelation(familyDTO.getRelation());
        relativePersisted.setLives(familyDTO.getLives());
        relativePersisted.setDateOfBirth(familyDTO.getDateOfBirth());
        relativePersisted.setCoexists(familyDTO.getCoexists());
        relativePersisted.setGender(familyDTO.getGender());

        familyRepository.save(relativePersisted);
        return modelMapper.map(relativePersisted, RelativeDTO.class);
    }

    public String deleteFamily(Long id) {
        familyRepository.deleteById(id);
        return "Familiar eliminado permanentemente";
    }

    public List<RelativeDTO> findFamiliesByBirthday(LocalDate birthDate) {
        List<Relative> relativeList = familyRepository.findByDateOfBirth(birthDate);
        return relativeList.stream()
                .map(relative -> modelMapper.map(relative, RelativeDTO.class))
                .collect(Collectors.toList());
    }

    public List<RelativeDTO> findFamiliesByRelation(FamilyRelation relation) {
        List<Relative> relativeList = familyRepository.findByRelation(relation);
        return relativeList.stream()
                .map(relative -> modelMapper.map(relative, RelativeDTO.class))
                .collect(Collectors.toList());
    }

    private Relative findFamily(Long id) {
        Optional<Relative> familyOptional = familyRepository.findById(id);
        if(familyOptional.isEmpty()) {
            throw new RuntimeException("El familiar no existe");
        }
        return familyOptional.get();
    }

    public List<RelativeDTO> getFamilies() {
        List<Relative> relativeList = familyRepository.findAll();
        return relativeList.stream()
                .map(relative -> modelMapper.map(relative, RelativeDTO.class))
                .collect(Collectors.toList());
    }

}



