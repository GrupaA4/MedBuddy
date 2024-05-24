package com.medbuddy.medbuddy.controllers.advices;

import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class NotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(NotFoundExceptions.MedicalHistoryNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String medicalHistoryNotFoundHandler(NotFoundExceptions.MedicalHistoryNotFound ex) {
        Logger logger = LogManager.getLogger("AdvicesLogger");
        logger.debug(ex.getCause());
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(NotFoundExceptions.UserNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String userNotFoundHandler(NotFoundExceptions.UserNotFound ex) {
        Logger logger = LogManager.getLogger("AdvicesLogger");
        logger.debug(ex.getCause());
        return ex.getMessage();
    }
}
