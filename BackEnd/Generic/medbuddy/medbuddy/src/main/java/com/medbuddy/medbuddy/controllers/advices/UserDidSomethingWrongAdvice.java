package com.medbuddy.medbuddy.controllers.advices;

import com.medbuddy.medbuddy.exceptions.UserDidSomethingWrongExceptions;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLException;

@ControllerAdvice
public class UserDidSomethingWrongAdvice {
    @ResponseBody
    @ExceptionHandler(UserDidSomethingWrongExceptions.UserWithEmailAlreadyExists.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String userWithEmailAlreadyExistsHandler(UserDidSomethingWrongExceptions.UserWithEmailAlreadyExists ex) {
        Logger logger = LogManager.getLogger("AdvicesLogger");
        logger.debug(ex.getMessage());
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UserDidSomethingWrongExceptions.TriedToGetAllUsers.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String triedToGetAllUsersHandler(UserDidSomethingWrongExceptions.TriedToGetAllUsers ex) {
        Logger logger = LogManager.getLogger("AdvicesLogger");
        logger.debug(ex.getMessage());
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UserDidSomethingWrongExceptions.TooManyParts.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String tooManyPartsHandler(UserDidSomethingWrongExceptions.TooManyParts ex) {
        Logger logger = LogManager.getLogger("AdvicesLogger");
        logger.debug(ex.getMessage());
        return ex.getMessage();
    }


}
