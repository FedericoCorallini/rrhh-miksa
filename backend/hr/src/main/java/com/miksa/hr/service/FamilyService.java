package com.miksa.hr.service;

import com.miksa.hr.dto.FamilyDTO;
import com.miksa.hr.dto.FamilyRequestDTO;
import com.miksa.hr.entity.Family;
import com.miksa.hr.entity.enums.FamilyRelation;
import com.miksa.hr.repository.IFamilyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FamilyService {

    private final IFamilyRepository familyRepository;
    private final ModelMapper modelMapper;

    public FamilyService(IFamilyRepository familyRepository, ModelMapper modelMapper) {
        this.familyRepository = familyRepository;
        this.modelMapper = modelMapper;
    }

    // Guardar un familiar y asociarlo a empleado
    public FamilyRequestDTO saveFamily(FamilyRequestDTO familyDTO) {
        Family family = modelMapper.map(familyDTO, Family.class);
        familyRepository.save(family);
        return familyDTO;
    }

    public List<FamilyDTO> getFamiliesByEmployeeId(Long employeeId) {
        List<Family> familyList = familyRepository.findByEmployeesId(employeeId); // Método en el repositorio para buscar por empleado
        return familyList.stream()
                .map(family -> modelMapper.map(family, FamilyDTO.class))
                .collect(Collectors.toList());
    }

    // Actualizar datos de un familiar, creo que solo deberian ser esos
    public FamilyDTO updateFamily(Long id, FamilyRequestDTO familyDTO) {
        Family familyPersisted = findFamily(id);
        familyPersisted.setRelation(familyDTO.getRelation());
        familyPersisted.setLives(familyDTO.isLives());
        familyPersisted.setDateOfBirth(familyDTO.getDateOfBirth());
        familyPersisted.setCoexists(familyDTO.isCoexists());
        familyPersisted.setGender(familyDTO.getGender());
        familyRepository.save(familyPersisted);
        return modelMapper.map(familyPersisted, FamilyDTO.class);
    }

    // Eliminar familiar lo agrego ya que si se carga mal o por error el familiar y no corresponde, se elimia permanentemente
    public String deleteFamily(Long id) {
        familyRepository.deleteById(id);
        return "Familiar eliminado permanentemente";
    }

    // lista los familiares que cumplen años en la fecha ingresada
    public List<FamilyDTO> findFamiliesByBirthday(LocalDate birthDate) {
        List<Family> familyList = familyRepository.findByDateOfBirth(birthDate);
        return familyList.stream()
                .map(family -> modelMapper.map(family, FamilyDTO.class))
                .collect(Collectors.toList());
    }

    //lista los familiares que cumplen con la relacion ingresada(pensada para dia del padre o madre
    public List<FamilyDTO> findFamiliesByRelation(FamilyRelation relation) {
        List<Family> familyList = familyRepository.findByRelation(relation);
        return familyList.stream()
                .map(family -> modelMapper.map(family, FamilyDTO.class))
                .collect(Collectors.toList());
    }
    private Family findFamily(Long id) {
        Optional<Family> familyOptional = familyRepository.findById(id);
        if(familyOptional.isEmpty()) {
            throw new RuntimeException("El familiar no existe");
        }
        return familyOptional.get();
    }

    public List<FamilyDTO> getFamilies() {
        List<Family> familyList = familyRepository.findAll();
        return familyList.stream()
                .map(family -> modelMapper.map(family, FamilyDTO.class))
                .collect(Collectors.toList());
    }

}



