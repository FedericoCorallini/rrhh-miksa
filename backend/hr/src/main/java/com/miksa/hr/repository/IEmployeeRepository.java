package com.miksa.hr.repository;

import com.miksa.hr.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IEmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByIdAndEliminated(Long id, boolean eliminated);
    List<Employee> findByEliminated(boolean eliminated);

    @Query("SELECT e FROM Employee e " +
            "LEFT JOIN e.documentationList d WITH d.eliminated = false " +
            "LEFT JOIN e.absencePermissionsList a WITH a.eliminated = false " +
            "WHERE e.eliminated = false")
    List<Employee> findEmployeeWithQuery ();
}
