package com.medbuddy.medbuddy;

import com.medbuddy.medbuddy.controllers.AdminFunctionalityController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class MedbuddyApplicationTests {

	@Autowired
	AdminFunctionalityController controller;

	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
	}

}
