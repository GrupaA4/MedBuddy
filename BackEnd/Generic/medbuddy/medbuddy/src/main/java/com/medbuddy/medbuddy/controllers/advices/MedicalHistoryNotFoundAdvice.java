package com.medbuddy.medbuddy.controllers.advices;

import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class MedicalHistoryNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(NotFoundExceptions.MedicalHistoryNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String employeeNotFoundHandler(NotFoundExceptions.MedicalHistoryNotFoundException ex) {
        return ex.getMessage();
    }
}
