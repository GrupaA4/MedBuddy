package com.medbuddy.medbuddy;

import com.medbuddy.medbuddy.repository.daos.MessagerieDAO;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.SQLException;

@SpringBootApplication
public class MedbuddyApplication {

	public static void main(String[] args) throws SQLException {

		String currentDir = System.getProperty("user.dir");
		System.out.println("Current working directory: " + currentDir);

		SpringApplication.run(MedbuddyApplication.class, args);
	}

}
