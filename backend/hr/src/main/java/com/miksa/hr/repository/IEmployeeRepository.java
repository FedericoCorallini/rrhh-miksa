package com.miksa.hr.repository;

import com.miksa.hr.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IEmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByIdAndEliminated(Long id, boolean eliminated);
    List<Employee> findByEliminated(boolean eliminated);
}
