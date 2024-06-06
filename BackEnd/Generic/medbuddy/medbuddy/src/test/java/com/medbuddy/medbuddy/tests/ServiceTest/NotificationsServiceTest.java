package com.medbuddy.medbuddy.tests.ServiceTest;

import com.medbuddy.medbuddy.controllers.responsebodies.NotificationsResponseBodies;
import com.medbuddy.medbuddy.models.Notification;
import com.medbuddy.medbuddy.repository.daos.NotificationsDAO;
import com.medbuddy.medbuddy.services.NotificationsService;
import com.medbuddy.medbuddy.services.UserService;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class NotificationsServiceTest {

    @Mock
    private NotificationsDAO notificationsDAO;

    @Mock
    private UserService userService;

    @InjectMocks
    private NotificationsService notificationsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllNotifications_ShouldReturnListOfNotifications() {
        UUID userId = UUID.randomUUID();
        List<Notification> notifications = new ArrayList<>();

        // Mocking behavior
        when(notificationsDAO.getAllNotifications(userId)).thenReturn(notifications);
        List<NotificationsResponseBodies.NotificationResponseBody> result = notificationsService.getAllNotifications(userId);
        assertThat(result).isNotNull();

    }

    @Test
    void sendNotification_ShouldSendNotification() {
        UUID medicId = UUID.randomUUID();
        String diagnosis = "Some diagnosis";

        when(userService.getUserIdByEmail(anyString())).thenReturn(UUID.randomUUID());

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn("testPrincipal");
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        notificationsService.sendNotification(medicId, diagnosis);
        verify(notificationsDAO, times(1)).addNotification(any(Notification.class));
    }
    @Test
    void deleteNotification_ShouldDeleteNotification() {
        UUID notificationId = UUID.randomUUID();

        notificationsService.deleteNotification(notificationId);
        verify(notificationsDAO, times(1)).deleteNotification(notificationId);
    }
}



/*package com.medbuddy.medbuddy.tests.ServiceTest;

import com.medbuddy.medbuddy.controllers.AdminFunctionalityController;
import com.medbuddy.medbuddy.controllers.responsebodies.NotificationsResponseBodies;
import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Notification;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.NotificationsDAO;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import com.medbuddy.medbuddy.services.NotificationsService;
import com.medbuddy.medbuddy.services.UserService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class NotificationsServiceTest {

    @Autowired
    private NotificationsService notificationsService;

    @Autowired
    private NotificationsDAO notificationsDAO;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private UserService userService;
    @Autowired
    private AdminFunctionalityService adminFunctionalityService;

    private static UUID notificationId = UUID.randomUUID();
    private static UUID medicId = UUID.randomUUID();
    private static String diagnosis = "Test diagnosis";
    private static Medic medic;

    private static UUID userUUID = UUID.randomUUID();
    private static User user = new User();
    private static UUID medicUUID = UUID.randomUUID();


    static
    {
        user.setId(userUUID);
        user.setFirstName("Anna");
        user.setLastName("Snow");
        user.setEmail("anna@snow.com");
        user.setPassword("passwor");
        user.setAdmin(false);
        user.setLastTimeLoggedIn(LocalDate.now());
        user.setCity("Iasi");
        user.setCountry("Romania");
        user.setDateOfBirth(LocalDate.of(1999, 12, 5));
        user.setProfileImageNumber(1);
        user.setImageExtension("png");
        user.setGender(true);
        user.setLanguage("RO");
        user.setPhoneNumber("0712345678");
        user.setPronoun1("she");
        user.setPronoun1("her");
        user.setDeleted(false);
    }

    static{
        Medic tempMedic = new Medic();
        tempMedic.setMedicId(medicUUID);
        tempMedic.setTypeOfMedic("Stomatolog");
        tempMedic.setClinic("Policlinica Iasi");
        tempMedic.setCertificateImageNumber(2);
        tempMedic.setCertificateExtension("png");
        tempMedic.setApproved(false);
        medic = new Medic(user, tempMedic);
    }

    @Autowired
    private AdminFunctionalityController adminFunctionalityController;

    @Test
    @Order(1)
    public void signupUser_NonExistingUser_CreatesNewUser() {
        userDAO.signupUser(user);

        assertDoesNotThrow(() -> userDAO.getUserById(userUUID));
    }

    @Test
    @Order(2)
    public void signupUser_ExistingUser_ThrowsException() {
        assertThrows(DuplicateKeyException.class, () -> userDAO.signupUser(user));
    }

    @Test
    @Order(3)
    public void isMedic_MockUser_ShouldBeFalse(){
        assertThat(userDAO.isMedic(userUUID)).isFalse();
    }

    @Test
    @Order(4)
    public void signupMedic_NotExistingMedic_CreatesMedic(){
        assertDoesNotThrow(() -> userDAO.signupMedic(medic));
    }

    @Test
    @Order(5)
    public void signupMedic_ExistingMedic_ThrowsException(){
        assertThrows(DuplicateKeyException.class, () -> userDAO.signupMedic(medic));
    }

    @Test
    @Order(6)
    public void isApproved_MockUser_ShouldBeFalse(){
        assertThat(medic.isApproved()).isFalse();
    }

    @Test
    @Order(7)
    public void isMedic_MockUser_ShouldBeTrue(){
        assertThat(userDAO.isMedic(userUUID)).isTrue();
    }

    @Test
    @Order(8)
    public void approveMedic_MockUser_ChangesTheApprovalStatusToTrue(){
        assertDoesNotThrow(() -> adminFunctionalityService.allowMedic(medicUUID));
    }


    @Test
    @Order(9)
    public void sendNotification_NewNotification_SavesNotification() {
        assertDoesNotThrow(() -> notificationsService.sendNotification(medicId, diagnosis));
    }

    @Test
    @Order(10)
    public void sendNotification_DuplicateNotification_ThrowsException() {
        assertThrows(DuplicateKeyException.class, () -> notificationsService.sendNotification(medicId, diagnosis));
    }

    @Test
    @Order(11)
    public void getAllNotifications_ByMedicId_ReturnsNotifications() {
        List<NotificationsResponseBodies.NotificationResponseBody> notifications = notificationsService.getAllNotifications(medicId);
        assertNotNull(notifications);
        assertFalse(notifications.isEmpty());
    }

    @Test
    @Order(12)
    public void deleteNotification_ExistingNotification_RemovesNotification() {
        assertDoesNotThrow(() -> notificationsService.deleteNotification(notificationId));
    }

    @Test
    @Order(13)
    public void deleteNotification_NonExistingNotification_ThrowsException() {
        assertThrows(Exception.class, () -> notificationsService.deleteNotification(UUID.randomUUID()));
    }
    @Test
    @Order(31)
    public void isDeleted_MockUser_DefaultValueIsFalse(){
        assertEquals(userDAO.getUserById(userUUID).isDeleted(), false);
    }

    @Test
    @Order(32)
    public void markUserAsDeleted_MockUser_UpdatesTheDeletionStatusToTrue(){
        userDAO.markUserAsDeleted(userUUID);

        assertEquals(userDAO.getUserById(userUUID).isDeleted(), true);
    }

    @Test
    @Order(33)
    public void deleteMedic_ExistingMedic_RemovesTheMedicFromTheDatabase(){
        assertDoesNotThrow(() -> userDAO.deleteMedic(medicUUID));
    }

    @Test
    @Order(34)
    public void softDeleteUser_ExistingUser_UpdatesTheDeletionStatusToTrue() {

        userService.softDeleteUser(userUUID);
        assertEquals(userDAO.getUserById(userUUID).isDeleted(), true);
    }
    @Test
    @Order(35)
    public void hardDeleteUser_ExistingUser_RemovesUserFromDatabase() {
        userService.hardDeleteUser(userUUID);
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.getUserById(userUUID));
    }
    @Test
    @Order(36)
    public void deleteUser_NonExistingUser_ThrowsException(){
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.deleteUser(userUUID));
    }

}*/

