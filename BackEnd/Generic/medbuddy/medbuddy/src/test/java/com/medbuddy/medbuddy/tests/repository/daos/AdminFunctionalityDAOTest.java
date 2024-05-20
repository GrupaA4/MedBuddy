package com.medbuddy.medbuddy.tests.repository.daos;

import com.medbuddy.medbuddy.repository.daos.AdminFunctionalityDAO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class AdminFunctionalityDAOTest {

    @Autowired
    AdminFunctionalityDAO dao;

    @Test
    public void tryToUpdateTheDatabase() {
<<<<<<< HEAD
        //dao.reportUser(1, 2, "report");
=======
        dao.reportUser(UUID.randomUUID(), UUID.randomUUID(), "report");
>>>>>>> 176e7f35774234a208979d75994683beb0605b47
        assertThat(true).isTrue();
    }
}
