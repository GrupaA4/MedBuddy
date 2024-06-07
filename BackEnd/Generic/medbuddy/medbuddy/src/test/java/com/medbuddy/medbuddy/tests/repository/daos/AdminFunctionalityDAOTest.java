package com.medbuddy.medbuddy.tests.repository.daos;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;
import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Report;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.AdminFunctionalityDAO;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import com.medbuddy.medbuddy.services.UserService;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
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
public class AdminFunctionalityDAOTest {

    @Autowired
    private AdminFunctionalityDAO adminFunctionalityDAO;
    @Autowired
    private AdminFunctionalityService adminFunctionalityService;

    @Autowired
    AdminFunctionalityDAO dao;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private UserService userService;

    private static Medic unapprovedMedic = new Medic();

    private static UUID reportUUID = UUID.randomUUID();
    private static UUID userUUID = UUID.randomUUID();
    private static UUID reportedByUUID = UUID.randomUUID();

    private static Report report;

    private static User user ;
    private static User reportedByUser;
    private static UUID medicUUID = UUID.randomUUID();
    private static Medic medic;

    static {
        user = new User();
        user.setId(userUUID);
        user.setFirstName("Nina");
        user.setLastName("Smith");
        user.setEmail("nina@smith.com");
        user.setPassword("pass");
        user.setAdmin(false);
        user.setLastTimeLoggedIn(LocalDate.now());
        user.setCity("Timisoara");
        user.setCountry("Romania");
        user.setDateOfBirth(LocalDate.of(1999, 11, 9));
        user.setProfileImageNumber(9);
        user.setImageExtension("png");
        user.setGender(true);
        user.setLanguage("RO");
        user.setPhoneNumber("0717845678");
        user.setPronoun1("she");
        user.setPronoun1("her");
        user.setDeleted(false);

        reportedByUser = new User();
        reportedByUser.setId(reportedByUUID);
        reportedByUser.setFirstName("Vlad");
        reportedByUser.setLastName("Doe");
        reportedByUser.setEmail("vlad@doe.com");
        reportedByUser.setPassword("password");
        reportedByUser.setAdmin(false);
        reportedByUser.setLastTimeLoggedIn(LocalDate.now());
        reportedByUser.setCity("Oradea");
        reportedByUser.setCountry("Romania");
        reportedByUser.setDateOfBirth(LocalDate.of(1990, 1, 1));
        reportedByUser.setProfileImageNumber(10);
        reportedByUser.setImageExtension("jpg");
        reportedByUser.setGender(true);
        reportedByUser.setLanguage("RO");
        reportedByUser.setPhoneNumber("0717890123");
        reportedByUser.setPronoun1("he");
        reportedByUser.setPronoun1("him");
        reportedByUser.setDeleted(false);

        report = new Report();
        report.setId(reportUUID);
        report.setReportedUser(userUUID);
        report.setReportedBy(reportedByUUID);
        report.setReportMessage("Test report");
        report.setTimeCreated(LocalDate.now());
        report.setDeleted(false);
    }
    static{
        Medic tempMedic = new Medic();
        tempMedic.setMedicId(medicUUID);
        tempMedic.setTypeOfMedic("Psihiatru");
        tempMedic.setClinic("Policlinica Iasi");
        tempMedic.setCertificateImageNumber(2);
        tempMedic.setCertificateExtension("png");
        tempMedic.setApproved(false);
        medic = new Medic(user, tempMedic);
    }


    @Test
    @Order(1)
    public void signupUser_NonExistingUser_CreatesNewUser() {
        userDAO.signupUser(user);
        userDAO.signupUser(reportedByUser);

        assertDoesNotThrow(() -> userDAO.getUserById(userUUID));
        assertDoesNotThrow(() -> userDAO.getUserById(reportedByUUID));
    }

    @Test
    @Order(2)
    public void signupUser_ExistingUser_ThrowsException() {
        assertThrows(DuplicateKeyException.class, () -> userDAO.signupUser(user));
        assertThrows(DuplicateKeyException.class, () -> userDAO.signupUser(reportedByUser));
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
        assertDoesNotThrow(() -> adminFunctionalityService.allowMedic(medic.getId()));
    }
    @Test
    @Order(9)
    public void reportUser_ValidReport_SuccessfullyReportsUser() {
        assertDoesNotThrow(() -> adminFunctionalityDAO.reportUser(report));

        List<Report> reports = adminFunctionalityDAO.getReports();
        assertThat(reports).extracting(Report::getId).contains(reportUUID);
    }

    @Test
    @Order(10)
    public void getReports_ShouldReturnListOfReports() {
        List<Report> reports = adminFunctionalityDAO.getReports();
        assertNotNull(reports);
        assertFalse(reports.isEmpty());
    }

    @Test
    @Order(11)
    public void getOldestUsers_ShouldReturnListOfUsers() {
        List<User> users = adminFunctionalityDAO.getOldestUsers();
        assertNotNull(users);
        assertFalse(users.isEmpty());
    }

    @Test
    @Order(13)
    public void allowMedic_ValidMedicId_SuccessfullyAllowsMedic() {
        assertDoesNotThrow(() -> adminFunctionalityDAO.allowMedic(medic.getMedicId()));
    }

    @Test
    @Order(14)
    public void allowMedic_NonExistingMedicId_ThrowsException() {
        UUID nonExistingMedicId = UUID.randomUUID();
        assertThrows(NotFoundExceptions.MedicNotFound.class, () -> adminFunctionalityDAO.allowMedic(nonExistingMedicId));
    }

    /*@Test
    @Order(15)
    public void allowMedic_DuplicateMedicId_ThrowsException() {
        UUID duplicateMedicId = UUID.randomUUID();
        assertThrows(DatabaseExceptions.NonUniqueIdentifier.class, () -> adminFunctionalityDAO.allowMedic(duplicateMedicId));
        //assertThrows(DatabaseExceptions.NonUniqueIdentifier.class, () -> userDAO.signupMedic(medic));
    }*/

    @Test
    @Order(16)
    public void findUserByName_ExistingName_ShouldReturnUserList() {
        List<User> users = adminFunctionalityDAO.findUserByName("Nina", "Smith");
        assertNotNull(users);
        assertFalse(users.isEmpty());
    }

    /*@Test
    @Order(12)
    public void getRequestingMedics_ShouldReturnListOfMedics() {
        List<Medic> medics = adminFunctionalityDAO.getRequestingMedics();
        assertNotNull(medics);
        assertFalse(medics.isEmpty());
        for (Medic medic : medics) {
            assertFalse(medic.isApproved());
        }
    }*/
    @Test
    @Order(12)
    public void getRequestingMedics_ShouldReturnListOfMedics() {
        unapprovedMedic.setFirstName("Nina");
        unapprovedMedic.setLastName("Smith");
        unapprovedMedic.setEmail("19@smith.com");
        unapprovedMedic.setPassword("pass");
        unapprovedMedic.setAdmin(false);
        unapprovedMedic.setLastTimeLoggedIn(LocalDate.now());
        unapprovedMedic.setCity("Timisoara");
        unapprovedMedic.setCountry("Romania");
        unapprovedMedic.setDateOfBirth(LocalDate.of(1999, 11, 9));
        unapprovedMedic.setProfileImageNumber(9);
        unapprovedMedic.setImageExtension("png");
        unapprovedMedic.setGender(true);
        unapprovedMedic.setLanguage("RO");
        unapprovedMedic.setPhoneNumber("0717845678");
        unapprovedMedic.setPronoun1("she");
        unapprovedMedic.setPronoun1("her");
        unapprovedMedic.setDeleted(false);
        unapprovedMedic.setMedicId(UUID.randomUUID());
        unapprovedMedic.setId(UUID.randomUUID());
        unapprovedMedic.setTypeOfMedic("Dermatolog");
        unapprovedMedic.setClinic("Policlinica Iasi");
        unapprovedMedic.setCertificateImageNumber(4);
        unapprovedMedic.setCertificateExtension("png");
        unapprovedMedic.setApproved(false);
        userService.createMedic(unapprovedMedic, new byte[]{}, new byte[]{});


        List<Medic> medics = adminFunctionalityDAO.getRequestingMedics();
        assertNotNull(medics);
        assertFalse(medics.isEmpty());

        for (Medic medic : medics) {
            assertFalse(medic.isApproved());
        }
    }

    @Test
    @Order(20)
    public void isDeleted_MockUser_DefaultValueIsFalse(){
        assertEquals(userDAO.getUserById(userUUID).isDeleted(), false);
    }

    @Test
    @Order(21)
    public void markUserAsDeleted_MockUser_UpdatesTheDeletionStatusToTrue(){
        userDAO.markUserAsDeleted(userUUID);

        assertEquals(userDAO.getUserById(userUUID).isDeleted(), true);
    }

    @Test
    @Order(22)
    public void deleteMedic_ExistingMedic_RemovesTheMedicFromTheDatabase(){
        assertDoesNotThrow(() -> userDAO.deleteMedic(medicUUID));
    }

    @Test
    @Order(23)
    public void softDeleteUser_ExistingUser_UpdatesTheDeletionStatusToTrue() {

        userService.softDeleteUser(userUUID);
        assertEquals(userDAO.getUserById(userUUID).isDeleted(), true);
    }
    @Test
    @Order(24)
    public void hardDeleteUser_ExistingUser_RemovesUserFromDatabase() {
        userService.hardDeleteUser(userUUID);
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.getUserById(userUUID));
    }
    @Test
    @Order(25)
    public void deleteUser_NonExistingUser_ThrowsException(){
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.deleteUser(userUUID));
    }

    @Test
    @Order(26)
    public void deleteMedic_ExistingMedicUsingIdSearch_RemovesTheMedicFromTheDatabase(){
        assertDoesNotThrow(() -> userDAO.deleteMedic(userDAO.getMedicSpecificInfoByUserId(userDAO.findByEmail(unapprovedMedic.getEmail()).get().getId()).getMedicId()));
    }

    @Test
    @Order(27)
    public void hardDeleteUser_ExistingUserUsingIdSearch_RemovesUserFromDatabase() {
        UUID userId = userDAO.findByEmail(unapprovedMedic.getEmail()).get().getId();
        userService.hardDeleteUser(userId);
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.getUserById(userId));
    }

}




/*package com.medbuddy.medbuddy.tests.repository.daos;

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
        /*
<<<<<<< HEAD
        //dao.reportUser(1, 2, "report");
=======
        dao.reportUser(UUID.randomUUID(), UUID.randomUUID(), "report");
>>>>>>> 176e7f35774234a208979d75994683beb0605b47
        assertThat(true).isTrue();


    }
}*/