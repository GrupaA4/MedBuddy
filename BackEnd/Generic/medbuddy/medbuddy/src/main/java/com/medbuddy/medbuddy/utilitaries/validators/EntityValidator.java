package com.medbuddy.medbuddy.utilitaries.validators;

import com.medbuddy.medbuddy.models.Entity;

public class EntityValidator {

    public static <T extends Entity> boolean validate(T entity) {
        return !entity.isDeleted();
    }
}
