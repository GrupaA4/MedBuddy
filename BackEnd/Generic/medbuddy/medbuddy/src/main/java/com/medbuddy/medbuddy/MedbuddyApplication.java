package com.medbuddy.medbuddy;

import com.medbuddy.medbuddy.daos.MessagerieDAO;
import com.medbuddy.medbuddy.database.Database;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.SQLException;

@SpringBootApplication
public class MedbuddyApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedbuddyApplication.class, args);

	}


}
