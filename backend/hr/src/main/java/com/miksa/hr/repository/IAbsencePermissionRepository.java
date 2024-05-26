package com.miksa.hr.repository;

import com.miksa.hr.entity.AbsencePermission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IAbsencePermissionRepository extends JpaRepository<AbsencePermission, Long> {
    List<AbsencePermission> findByEliminated(boolean eliminated);

    Optional<AbsencePermission> findByIdAndEliminated(Long id, boolean eliminated);
}
