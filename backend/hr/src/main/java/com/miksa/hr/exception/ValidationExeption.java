package com.miksa.hr.exception;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.Map;
import java.util.HashMap;


@RestControllerAdvice
public class ValidationExeption {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleInvalidForm(MethodArgumentNotValidException exception){
        Map<String,String> errors = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(fieldError -> {
                    errors.put(fieldError.getField(), fieldError.getDefaultMessage());
                });
        return errors;
    }
}
