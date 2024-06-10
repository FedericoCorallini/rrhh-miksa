package com.miksa.hr.configuration;

import com.miksa.hr.dto.AbsencePermissionDTO;
import com.miksa.hr.entity.AbsencePermission;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

//    @Bean
//    public ModelMapper modelMapper(){
//        return new ModelMapper();
//    }

    @Bean
    public ModelMapper permissionMapper(){
        ModelMapper mapper = new ModelMapper();
        TypeMap<AbsencePermission, AbsencePermissionDTO> propertyMapper = mapper.createTypeMap(AbsencePermission.class, AbsencePermissionDTO.class);
        propertyMapper.addMappings(m -> m.map(src ->  src.getEmployee().getFullName(), AbsencePermissionDTO::setEmployeeName));
        return mapper;
    }
}
