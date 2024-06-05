package com.medbuddy.medbuddy.tests.repository.daos;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Notification;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.NotificationsDAO;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.repository.rowmappers.NotificationsRowMapper;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class NotificationsDAOTest {

    @Autowired
    private UserDAO userDAO;
    private static UUID pacientUUID = UUID.randomUUID();
    private static User pacient = new User();
    private static UUID medicUUID = UUID.randomUUID();
    private static Medic medic;
    @Autowired
    private NotificationsDAO notificationsDAO;
    private static Notification notification = new Notification();
    private static UUID notificationUUID = UUID.randomUUID();
    private static UUID userUUID = UUID.randomUUID();
    private static User user = new User();

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private AdminFunctionalityService adminFunctionalityService;

    static {
        pacient.setId(pacientUUID);
        pacient.setFirstName("John");
        pacient.setLastName("Doe");
        pacient.setEmail("john@doe.com");
        pacient.setPassword("password");
        pacient.setAdmin(false);
        pacient.setLastTimeLoggedIn(LocalDate.now());
        pacient.setCity("Iasi");
        pacient.setCountry("Romania");
        pacient.setDateOfBirth(LocalDate.of(1999, 12, 5));
        pacient.setProfileImageNumber(1);
        pacient.setImageExtension("png");
        pacient.setGender(true);
        pacient.setLanguage("RO");
        pacient.setPhoneNumber("0712345678");
        pacient.setPronoun1("he");
        pacient.setPronoun1("him");
        pacient.setDeleted(false);
    }

    static {
        user.setId(userUUID);
        user.setFirstName("Alice");
        user.setLastName("Brown");
        user.setEmail("alice@brown.com");
        user.setPassword("password123");
        user.setAdmin(false);
        user.setLastTimeLoggedIn(LocalDate.now());
        user.setCity("Iasi");
        user.setCountry("Romania");
        user.setDateOfBirth(LocalDate.of(1989, 10, 12));
        user.setProfileImageNumber(1);
        user.setImageExtension("png");
        user.setGender(true);
        user.setLanguage("RO");
        user.setPhoneNumber("071111111");
        user.setPronoun1("she");
        user.setPronoun1("her");
        user.setDeleted(false);
    }

    static {
        Medic tempMedic = new Medic();
        tempMedic.setMedicId(medicUUID);
        tempMedic.setTypeOfMedic("Chirurg");
        tempMedic.setClinic("Policlinica Iasi");
        tempMedic.setCertificateImageNumber(2);
        tempMedic.setCertificateExtension("png");
        tempMedic.setApproved(false);
        medic = new Medic(user, tempMedic);
    }

    static {
        notification.setId(notificationUUID);
        notification.setPatientId(pacientUUID);
        notification.setMedicId(userUUID);
        notification.setDiagnosis("someRandomDiagnosis");
    }

    @Test
    @Order(1)
    public void signupUser_NonExistingPacient_ShouldAddPacient() {
        userDAO.signupUser(pacient);
        assertDoesNotThrow(() -> userDAO.getUserById(pacientUUID));
    }

    @Test
    @Order(2)
    public void signupUser_NonExistingTempUser_ShouldAddTempUser() {
        userDAO.signupUser(user);
        assertDoesNotThrow(() -> userDAO.getUserById(userUUID));
    }

    @Test
    @Order(3)
    public void signupMedic_NonExistingMedic_ShouldAddMedic() {
        assertDoesNotThrow(() -> userDAO.signupMedic(medic));
    }

    @Test
    @Order(4)
    public void approveMedic_MockUser_ChangesTheApprovalStatusToTrue() {
        assertDoesNotThrow(() -> adminFunctionalityService.allowMedic(medicUUID));
    }

    @Test
    @Order(5)
    public void addNotification_ShouldInsertNotificationIntoDatabase() {

        notificationsDAO.addNotification(notification);

        String sql = "SELECT * FROM AppNotifications WHERE id = ?";
        List<Notification> addedNotification = jdbcTemplate.query(sql, new NotificationsRowMapper(), notificationUUID.toString());

        assertNotNull(addedNotification);

    }


    @Test
    @Order(6)
    public void getAllNotifications_NotificationExistsForAMedic_ShouldReturnNonEmptyList() {
        assertFalse(notificationsDAO.getAllNotifications(userUUID).isEmpty());
    }

    @Test
    @Order(7)
    public void getAllNotifications_NonMedic_ShouldReturnEmptyList() {
        assertTrue(notificationsDAO.getAllNotifications(pacientUUID).isEmpty());
    }

    @Test
    @Order(8)
    public void deleteNotification_ExistingNotification_ShouldDeleteNotification() {
        notificationsDAO.deleteNotification(notificationUUID);

        String sql = "SELECT * FROM AppNotifications WHERE id = ?";
        List<Notification> deletedNotification = jdbcTemplate.query(sql, new NotificationsRowMapper(), notificationUUID.toString());

        assertTrue(deletedNotification.isEmpty());
    }


    //-------------------------------------------------------------------------


    @Test
    @Order(36)
    public void deleteUser_ExistingPacient_RemovesThePacientFromTheDatabase() {
        assertDoesNotThrow(() -> userDAO.deleteUser(pacientUUID));
    }

    @Test
    @Order(35)
    public void deleteMedic_ExistingMedic_RemovesTheMedicFromTheDatabase() {
        assertDoesNotThrow(() -> userDAO.deleteMedic(medicUUID));
    }

    @Test
    @Order(36)
    public void deleteUser_ExistingUser_RemovesTheUserFromTheDatabase() {
        assertDoesNotThrow(() -> userDAO.deleteUser(userUUID));
    }


}
