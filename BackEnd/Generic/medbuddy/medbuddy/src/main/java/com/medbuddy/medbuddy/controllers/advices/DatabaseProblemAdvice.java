package com.medbuddy.medbuddy.controllers.advices;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLException;

@ControllerAdvice
public class DatabaseProblemAdvice {
    @ResponseBody
    @ExceptionHandler(SQLException.class)
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    public String DatabaseProblemHandler(SQLException ex) {
        Logger logger = LogManager.getLogger("AdvicesLogger");
        logger.debug(ex.getMessage());
        ex.printStackTrace();
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(DatabaseExceptions.NonUniqueIdentifier.class)
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    public String DatabaseProblemHandler(DatabaseExceptions.NonUniqueIdentifier ex) {
        Logger logger = LogManager.getLogger("AdvicesLogger");
        logger.debug(ex.getMessage());
        ex.printStackTrace();
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(DatabaseExceptions.ErrorInExecutingStatement.class)
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    public String DatabaseProblemHandler(DatabaseExceptions.ErrorInExecutingStatement ex) {
        Logger logger = LogManager.getLogger("AdvicesLogger");
        logger.debug(ex.getMessage());
        ex.printStackTrace();
        return ex.getMessage();
    }
}
