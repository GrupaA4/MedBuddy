package com.medbuddy.medbuddy.controllers;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminFunctionalityController {

    @PutMapping("/")
    public @ResponseBody String greeting() {
        return "Hello World!";
    }


}
