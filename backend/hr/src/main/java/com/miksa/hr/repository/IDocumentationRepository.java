package com.miksa.hr.repository;

import com.miksa.hr.entity.Documentation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IDocumentationRepository extends JpaRepository<Documentation, Long> {

    Optional<Documentation> findByIdAndEliminated(Long idDocumentation, boolean eliminated);
}
