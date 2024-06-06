package com.medbuddy.medbuddy;

import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.MessagerieDAO;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.utilitaries.ImageProcessingUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.SQLException;
import java.util.Date;
import java.util.UUID;

@SpringBootApplication
public class MedbuddyApplication {

	public static void main(String[] args) throws SQLException {
		String currentDir = System.getProperty("user.dir");
		System.out.println("Current working directory: " + currentDir);
		SpringApplication.run(MedbuddyApplication.class, args);
	}

}
