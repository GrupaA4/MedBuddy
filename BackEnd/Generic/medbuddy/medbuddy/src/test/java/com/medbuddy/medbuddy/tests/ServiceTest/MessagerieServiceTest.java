package com.medbuddy.medbuddy.tests.ServiceTest;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import com.medbuddy.medbuddy.services.MessagerieService;
import com.medbuddy.medbuddy.utilitaries.MedbuddyUtil;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class MessagerieServiceTest {
    @Autowired
    public MessagerieService messagerieService;

    @Autowired
    MedbuddyUtil medbuddyUtil;

    @Autowired
    private UserDAO userDAO;

    private static UUID userUUID = UUID.randomUUID();
    private static User user = new User();

    private static UUID userThatWillBecomeMedicUUID = UUID.randomUUID();
    private static User userThatWillBecomeMedic = new User();

    private static Medic medic;
    private static UUID medicUUID = UUID.randomUUID();

    @Autowired
    private AdminFunctionalityService adminFunctionalityService;

    static
    {
        user.setId(userUUID);
        user.setFirstName("Anne");
        user.setLastName("Vick");
        user.setEmail("anne@vick0.com");
        user.setPassword("password");
        user.setAdmin(false);
        user.setLastTimeLoggedIn(LocalDate.now());
        user.setCity("Iasi");
        user.setCountry("Romania");
        user.setDateOfBirth(LocalDate.of(2000, 11, 2));
        user.setProfileImageNumber(1);
        user.setImageExtension("png");
        user.setGender(true);
        user.setLanguage("RO");
        user.setPhoneNumber("0712345678");
        user.setPronoun1("she");
        user.setPronoun1("her");
        user.setDeleted(false);
    }

    static {
        userThatWillBecomeMedic.setId(userThatWillBecomeMedicUUID);
        userThatWillBecomeMedic.setFirstName("Fake");
        userThatWillBecomeMedic.setLastName("Medic");
        userThatWillBecomeMedic.setEmail("fakeMedic@gmail.com");
        userThatWillBecomeMedic.setPassword("passwordForFakeMedic123");
        userThatWillBecomeMedic.setAdmin(false);
        userThatWillBecomeMedic.setLastTimeLoggedIn(LocalDate.now());
        userThatWillBecomeMedic.setCity("Iasi");
        userThatWillBecomeMedic.setCountry("Romania");
        userThatWillBecomeMedic.setDateOfBirth(LocalDate.of(1989, 10, 12));
        userThatWillBecomeMedic.setProfileImageNumber(1);
        userThatWillBecomeMedic.setImageExtension("png");
        userThatWillBecomeMedic.setGender(true);
        userThatWillBecomeMedic.setLanguage("RO");
        userThatWillBecomeMedic.setPhoneNumber("071111111");
        userThatWillBecomeMedic.setPronoun1("she");
        userThatWillBecomeMedic.setPronoun1("her");
        userThatWillBecomeMedic.setDeleted(false);
    }

    static {
        Medic tempMedic = new Medic();
        tempMedic.setMedicId(medicUUID);
        tempMedic.setTypeOfMedic("Chirurg");
        tempMedic.setClinic("Policlinica Iasi");
        tempMedic.setCertificateImageNumber(2);
        tempMedic.setCertificateExtension("png");
        tempMedic.setApproved(false);
        medic = new Medic(userThatWillBecomeMedic, tempMedic);
    }

    @BeforeEach
    public void setUp() {
        SecurityContextHolder.clearContext();
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                medic.getEmail(), medic.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    @Order(1)
    public void signupUser_NonExistingUser_CreatesNewUser() {
        userDAO.signupUser(user);
        assertDoesNotThrow(() -> userDAO.getUserById(userUUID));
    }

    @Test
    @Order(2)
    public void signupUser_NonExistingUser2_CreatesNewUser() {
        userDAO.signupUser(userThatWillBecomeMedic);
        assertDoesNotThrow(() -> userDAO.getUserById(userThatWillBecomeMedicUUID));
    }

    @Test
    @Order(3)
    public void signUpMedic_NonExistingMedic_CreatesMedic() {
        assertDoesNotThrow(() -> userDAO.signupMedic(medic));
    }

    @Test
    @Order(4)
    public void approveMedic_ExistingMedic_ChangesTheApprovalStatusToTrue() {
        assertDoesNotThrow(() -> adminFunctionalityService.allowMedic(medicUUID));
    }

    @Test
    @Order(6)
    public void closeConversation_ExistingConvo_ClosesConversation()
    {
        assertDoesNotThrow(() -> messagerieService.closeConversation());
    }

    @Test
    @Order(5)
    public void sendMessageToMedbuddy_ExistingConvo_SendsMessage()
    {
        assertDoesNotThrow(() -> messagerieService.sendMessageToMedbuddy());
    }

    @Test
    @Order(7)
    public void deleteUser_ExistingUser1_RemovesTheUserFromTheDatabase() {
        assertDoesNotThrow(() -> userDAO.deleteUser(userUUID));
    }

    @Test
    @Order(8)
    public void deleteUser_ExistingUser2_RemovesTheUserFromTheDatabase() {
        assertDoesNotThrow(() -> userDAO.deleteUser(userThatWillBecomeMedicUUID));
    }

}

