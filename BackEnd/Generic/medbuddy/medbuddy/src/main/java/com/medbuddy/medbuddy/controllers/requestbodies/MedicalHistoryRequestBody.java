package com.medbuddy.medbuddy.controllers.requestbodies;

import lombok.Data;


@Data
public class MedicalHistoryRequestBody {
    private String diagnosis;
    private String treatment;
}
