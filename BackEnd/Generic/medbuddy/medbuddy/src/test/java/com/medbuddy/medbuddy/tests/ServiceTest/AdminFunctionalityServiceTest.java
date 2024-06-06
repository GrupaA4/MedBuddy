package com.medbuddy.medbuddy.tests.ServiceTest;

import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.models.Admin;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Report;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.AdminFunctionalityDAO;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import com.medbuddy.medbuddy.exceptions.UserDidSomethingWrongExceptions;

import java.util.*;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AdminFunctionalityServiceTest {

    @Autowired
    private AdminFunctionalityDAO adminFunctionalityRepository;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private AdminFunctionalityService adminFunctionalityService;

    private static UUID reportedUserUUID = UUID.randomUUID();
    private static User reportedUser = new User();

    private static UUID userThatMadeTheReportUUID = UUID.randomUUID();
    private static User userThatMadeTheReport = new User();

    private static UUID notAValidUserToMakeReportsUUID = UUID.randomUUID();
    private static User notAValidUserToMakeReports = new User();

    private static UUID adminUUID = UUID.randomUUID();
    private static Admin admin;

    private static Medic medic;
    private static UUID medicUUID = UUID.randomUUID();


    private static Report report = new Report();
    private static UUID reportUUID = UUID.randomUUID();


    static {
        reportedUser.setId(reportedUserUUID);
        reportedUser.setFirstName("John");
        reportedUser.setLastName("Doe");
        reportedUser.setEmail("john@doe.com");
        reportedUser.setPassword("password");
        reportedUser.setAdmin(false);
        reportedUser.setLastTimeLoggedIn(LocalDate.now());
        reportedUser.setCity("Iasi");
        reportedUser.setCountry("Romania");
        reportedUser.setDateOfBirth(LocalDate.of(1999, 12, 5));
        reportedUser.setProfileImageNumber(1);
        reportedUser.setImageExtension("png");
        reportedUser.setGender(true);
        reportedUser.setLanguage("RO");
        reportedUser.setPhoneNumber("0712345678");
        reportedUser.setPronoun1("he");
        reportedUser.setPronoun1("him");
        reportedUser.setDeleted(false);
    }

    static {
        userThatMadeTheReport.setId(userThatMadeTheReportUUID);
        userThatMadeTheReport.setFirstName("Fake");
        userThatMadeTheReport.setLastName("Admin");
        userThatMadeTheReport.setEmail("fakeAdmin@gmail.com");
        userThatMadeTheReport.setPassword("passwordForFakeAdmin123");
        userThatMadeTheReport.setAdmin(true);
        userThatMadeTheReport.setLastTimeLoggedIn(LocalDate.now());
        userThatMadeTheReport.setCity("Iasi");
        userThatMadeTheReport.setCountry("Romania");
        userThatMadeTheReport.setDateOfBirth(LocalDate.of(1989, 10, 12));
        userThatMadeTheReport.setProfileImageNumber(1);
        userThatMadeTheReport.setImageExtension("png");
        userThatMadeTheReport.setGender(true);
        userThatMadeTheReport.setLanguage("RO");
        userThatMadeTheReport.setPhoneNumber("071111111");
        userThatMadeTheReport.setPronoun1("she");
        userThatMadeTheReport.setPronoun1("her");
        userThatMadeTheReport.setDeleted(false);
    }

    static {
        notAValidUserToMakeReports.setId(notAValidUserToMakeReportsUUID);
        notAValidUserToMakeReports.setFirstName("Ion");
        notAValidUserToMakeReports.setLastName("Pop");
        notAValidUserToMakeReports.setEmail("ion@pop.com");
        notAValidUserToMakeReports.setPassword("passwordForIonPop");
        notAValidUserToMakeReports.setAdmin(false);
        notAValidUserToMakeReports.setLastTimeLoggedIn(LocalDate.now());
        notAValidUserToMakeReports.setCity("Iasi");
        notAValidUserToMakeReports.setCountry("Romania");
        notAValidUserToMakeReports.setDateOfBirth(LocalDate.of(1999, 12, 5));
        notAValidUserToMakeReports.setProfileImageNumber(1);
        notAValidUserToMakeReports.setImageExtension("png");
        notAValidUserToMakeReports.setGender(true);
        notAValidUserToMakeReports.setLanguage("RO");
        notAValidUserToMakeReports.setPhoneNumber("072222222");
        notAValidUserToMakeReports.setPronoun1("he");
        notAValidUserToMakeReports.setPronoun1("him");
        notAValidUserToMakeReports.setDeleted(false);
    }

    static {
        Medic tempMedic = new Medic();
        tempMedic.setMedicId(medicUUID);
        tempMedic.setTypeOfMedic("Chirurg");
        tempMedic.setClinic("Policlinica Iasi");
        tempMedic.setCertificateImageNumber(2);
        tempMedic.setCertificateExtension("png");
        tempMedic.setApproved(false);
        medic = new Medic(reportedUser, tempMedic);
    }


    static {
        report.setId(reportUUID);
        report.setReportedUser(reportedUserUUID);
        report.setReportedBy(userThatMadeTheReportUUID);
        report.setReportMessage("someRandomMotive");
        report.setTimeCreated(LocalDate.now());
        report.setDeleted(false);
    }


    @BeforeEach
    public void setUp() {
        SecurityContextHolder.clearContext();
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userThatMadeTheReport.getEmail(), userThatMadeTheReport.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    @Order(1)
    public void signupUser_NonExistingUser1_ShouldAddUser() {
        userDAO.signupUser(reportedUser);
        assertDoesNotThrow(() -> userDAO.getUserById(reportedUserUUID));
    }

    @Test
    @Order(2)
    public void signupUser_NonExistingUser2_ShouldAddUser() {
        userDAO.signupUser(userThatMadeTheReport);
        assertDoesNotThrow(() -> userDAO.getUserById(userThatMadeTheReportUUID));
    }

    @Test
    @Order(3)
    public void signupUser_NonExistingUser3_ShouldAddUser() {
        userDAO.signupUser(notAValidUserToMakeReports);
        assertDoesNotThrow(() -> userDAO.getUserById(notAValidUserToMakeReportsUUID));
    }

    @Test
    @Order(4)
    public void reportUser_ValidUserToMakeReportAndUserExists_ShouldCreateReport() {
        assertDoesNotThrow(() -> adminFunctionalityService.reportUser(reportedUserUUID, "Inappropriate behavior"));
    }

    @Test
    @Order(5)
    public void reportUser_ValidUserToMakeReportButUserDoesNotExists_ShouldThrowException() {
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> adminFunctionalityService.reportUser(UUID.randomUUID(), "This should not be in the DB"));
    }

    @Test
    @Order(6)
    public void getReports_WithValidRangeAndReportsAvailable_ShouldReturnReportsInRange() {

        addTestReports();
        int fromReport = 1;
        int toReport = 5;

        List<Report> actualReports = adminFunctionalityService.getReports(fromReport, toReport);

        assertEquals(toReport - fromReport + 1, actualReports.size());
    }

    public void addTestReports() {
        assertDoesNotThrow(() -> adminFunctionalityService.reportUser(reportedUserUUID, "Test Report 1"));
        assertDoesNotThrow(() -> adminFunctionalityService.reportUser(reportedUserUUID, "Test Report 2"));
        assertDoesNotThrow(() -> adminFunctionalityService.reportUser(reportedUserUUID, "Test Report 3"));
        assertDoesNotThrow(() -> adminFunctionalityService.reportUser(reportedUserUUID, "Test Report 4"));
        assertDoesNotThrow(() -> adminFunctionalityService.reportUser(reportedUserUUID, "Test Report 5"));
        assertDoesNotThrow(() -> adminFunctionalityService.reportUser(reportedUserUUID, "Test Report 6"));
    }

    @Test
    @Order(7)
    public void getReports_WithInvalidRange_ShouldThrowIllegalArgumentException() {
        int fromReport = 5;
        int toReport = 1;

        assertThrows(IllegalArgumentException.class, () -> adminFunctionalityService.getReports(fromReport, toReport));
    }

    @Test
    @Order(8)
    public void getReports_WithOutOfRange_ShouldReturnReportsInRange() {
        int fromReport = 1;
        int toReport = 15;

        List<Report> actualReports = adminFunctionalityService.getReports(fromReport, toReport);

        assertEquals(7, actualReports.size());
    }

    @Test
    @Order(9)
    public void getReports_WithNegativeRange_ShouldThrowIllegalArgumentException() {
        int fromReport = -5;
        int toReport = -1;


        assertThrows(IllegalArgumentException.class, () -> adminFunctionalityService.getReports(fromReport, toReport));
    }

    @Test
    @Order(10)
    public void getOldestUsers_ValidRange_ShouldReturnOldestUsers() {
        List<User> oldestUsers = adminFunctionalityService.getOldestUsers(1, 2);

        assertEquals(2, oldestUsers.size());
        assertEquals(oldestUsers.get(0).getEmail(), "sibyl.murphy@yahoo.com");
        assertEquals(oldestUsers.get(1).getEmail(), "rubin.smitham@hotmail.com");
    }

    @Test
    @Order(11)
    public void getOldestUsers_InvalidRange_ShouldReturnAnEmptyList() {
        assertThrows(IllegalArgumentException.class, () -> adminFunctionalityService.getOldestUsers(500, 1000));

    }

    @Test
    @Order(12)
    public void signUpMedic_NonExistingMedic_CreatesMedic() {
        assertDoesNotThrow(() -> userDAO.signupMedic(medic));
    }

    @Test
    @Order(13)
    public void getRequestingMedics_MedicThatIsNotApproved_ShouldReturnANonEmptyList() {
        List<Medic> requestingMedics = adminFunctionalityService.getRequestingMedics();

        assertFalse(requestingMedics.isEmpty());
        assertEquals(1, requestingMedics.size());
        assertEquals(requestingMedics.get(0).getMedicId(), medicUUID);

    }

    @Test
    @Order(14)
    public void approveMedic_ExistingMedic_ChangesTheApprovalStatusToTrue() {
        assertDoesNotThrow(() -> adminFunctionalityService.allowMedic(medicUUID));
    }

    @Test
    @Order(15)
    public void approveMedic_MedicAlreadyApproved_NothingBadHappens() {
        assertDoesNotThrow(() -> adminFunctionalityService.allowMedic(medicUUID));
    }

    @Test
    @Order(16)
    public void approveMedic_ForAUserThatDidNotSignedUpAsMedic_ThrowsException() {
        assertThrows(NotFoundExceptions.MedicNotFound.class, () -> adminFunctionalityService.allowMedic(userThatMadeTheReportUUID));
    }

    @Test
    @Order(17)
    public void findUserByName_ValidFormat_ShouldFindTheUserWithTheSpecificLastName() {
        List<User> foundUsers = adminFunctionalityService.findUserByName("QuiteA+");

        assertEquals(1, foundUsers.size());
        assertEquals(foundUsers.get(0).getLastName(), "QuiteA");
    }

    @Test
    @Order(18)
    public void findUserByName_ValidFormat_ShouldFindTheUserWithTheSpecificFirstName() {
        List<User> foundUsers = adminFunctionalityService.findUserByName("+FirstNameTest");

        assertEquals(1, foundUsers.size());
        assertEquals(foundUsers.get(0).getFirstName(), "FirstNameTest");
    }

    @Test
    @Order(19)
    public void findUserByName_ValidFormat_ShouldFindTheUserWithTheSpecificFirstNameAndLstName() {
        List<User> foundUsers = adminFunctionalityService.findUserByName("LastNameTest+FirstNameTest");

        assertEquals(1, foundUsers.size());
        assertEquals(foundUsers.get(0).getLastName(), "LastNameTest");
        assertEquals(foundUsers.get(0).getFirstName(), "FirstNameTest");
    }


    @Test
    @Order(20)
    public void findUserByName_InvalidFormatTriesToGetAllUsers_ThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> {
            adminFunctionalityService.findUserByName("+");
        });
    }

    @Test
    @Order(21)
    public void findUserByName_InvalidFormatForgotThePlusSign_ThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> {
            adminFunctionalityService.findUserByName("");
        });
    }

    @Test
    @Order(22)
    public void findUserByName_TooManyParts_ThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> {
            adminFunctionalityService.findUserByName("something+something+something");
        });
    }

    @Test
    @Order(23)
    public void findUserByName_TooManyParts2_ThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> {
            adminFunctionalityService.findUserByName("+something+something");
        });
    }

    @Test
    @Order(24)
    public void findUserByName_TooManyParts3_ThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> {
            adminFunctionalityService.findUserByName("something+something+nxaskn");
        });
    }

    @Test
    @Order(25)
    public void getRequestingMedics_AllDoctorsAreApproved_ShouldReturnAnEmptyList() {
        List<Medic> requestingMedics = adminFunctionalityService.getRequestingMedics();
        assertTrue(requestingMedics.isEmpty());
    }


    // ----------------------------------------------------

    @Test
    @Order(36)
    public void deleteUser_ExistingUser1_RemovesTheUserFromTheDatabase() {
        assertDoesNotThrow(() -> userDAO.deleteUser(reportedUserUUID));
    }

    @Test
    @Order(37)
    public void deleteUser_ExistingUser2_RemovesTheUserFromTheDatabase() {
        assertDoesNotThrow(() -> userDAO.deleteUser(userThatMadeTheReportUUID));
    }

    @Test
    @Order(38)
    public void deleteUser_ExistingUser3_RemovesTheUserFromTheDatabase() {
        assertDoesNotThrow(() -> userDAO.deleteUser(notAValidUserToMakeReportsUUID));
    }
}
