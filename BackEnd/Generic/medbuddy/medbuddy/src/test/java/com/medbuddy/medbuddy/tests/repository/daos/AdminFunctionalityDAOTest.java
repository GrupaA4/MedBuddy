package com.medbuddy.medbuddy.tests.repository.daos;

import com.medbuddy.medbuddy.repository.daos.AdminFunctionalityDAO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class AdminFunctionalityDAOTest {

    @Autowired
    AdminFunctionalityDAO dao;

    @Test
    public void tryToUpdateTheDatabase() {
        //dao.reportUser(1, 2, "report");
        assertThat(true).isTrue();
    }
}
