package com.medbuddy.medbuddy.tests.ServiceTest;

import com.medbuddy.medbuddy.controllers.AdminFunctionalityController;
import com.medbuddy.medbuddy.controllers.UserController;
import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.exceptions.UserDidSomethingWrongExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import com.medbuddy.medbuddy.services.UserService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;

import java.time.LocalDate;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserServiceTest {
    @Autowired
    private AdminFunctionalityService adminFunctionalityService;
    @Autowired
    private UserDAO userDAO;
    private static UUID userUUID = UUID.randomUUID();
    private static UUID userUUID1 = UUID.randomUUID();
    private static User user = new User();
    private static User newUser = new User();
    private static UUID medicUUID = UUID.randomUUID();

    private static UUID medicUUID1 = UUID.randomUUID();
    private static Medic medic;

    private static Medic medic1;

    static
    {
        user.setId(userUUID);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@jjjoan14.com");
        user.setPassword("password");
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
        user.setPronoun1("he");
        user.setPronoun1("him");
        user.setDeleted(false);
    }

    static{
        Medic tempMedic = new Medic();
        tempMedic.setMedicId(medicUUID);
        tempMedic.setTypeOfMedic("Chirurg");
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
        assertDoesNotThrow(() -> adminFunctionalityService.allowMedic(medic.getId()));
    }

//	@Test
//	@Order(9) //No user with id shfihf found
//	public void getMedicProfile_MockUser_ReturnsMedicProfile1()
//	{
//		//userDAO.signupUser(user); //No medic with the user id shfihf found
//		assertDoesNotThrow(() -> userService.getMedicProfile(medicUUID));
//	}

    @Test
    @Order(9)
    public void getUserIdOfMedic_ExistingMedic_ReturnsId()
    {
        assertDoesNotThrow(() -> userService.getUserIdOfMedic(medicUUID));
    }

    @Test
    @Order(10)
    public void getUser_ExistingUser_ReturnsUser()
    {
        assertDoesNotThrow(() -> userService.getUser(userUUID));
    }

    @Test
    @Order(11)
    public void getUserIdByEmail_MockUser_ReturnsId()
    {
        assertDoesNotThrow(() -> userService.getUserIdByEmail(user.getEmail()));
    }

    @Test
    @Order(12)
    public void isDeleted_MockUser_DefaultValueIsFalse(){
        assertEquals(userDAO.getUserById(userUUID).isDeleted(), false);
    }

    @Test
    @Order(13)
    public void markUserAsDeleted_MockUser_UpdatesTheDeletionStatusToTrue(){
        userDAO.markUserAsDeleted(userUUID);

        assertEquals(userDAO.getUserById(userUUID).isDeleted(), true);
    }

    @Test
    @Order(14)
    public void deleteMedic_ExistingMedic_RemovesTheMedicFromTheDatabase(){
        assertDoesNotThrow(() -> userDAO.deleteMedic(medicUUID));
    }

    @Test
    @Order(15)
    public void deleteUser_ExistingUser_RemovesTheUserFromTheDatabase(){
        assertDoesNotThrow(() -> userDAO.deleteUser(userUUID));
    }

    @Test
    @Order(16)
    public void deleteUser_NonExistingUser_ThrowsException(){
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.deleteUser(userUUID));
    }

    @Test
    @Order(17)
    public void deleteMedic_NonExistingMedic_ThrowsException(){
        assertThrows(NotFoundExceptions.MedicNotFound.class, () -> userDAO.deleteMedic(medicUUID));
    }

    @Autowired
    private UserService userService;

    @Autowired
    private UserController userController = new UserController(userService);

    @Test
    @Order(18)
    public void createUser_NonExistingUser_CreatesUser()
    {

        assertDoesNotThrow(() -> userService.createUser(user, new byte[]{}));
    }

    @Test
    @Order(19)
    public void createUser_ExistingUser_ThrowsException()
    {
        assertThrows(UserDidSomethingWrongExceptions.UserWithEmailAlreadyExists.class, () -> userService.createUser(user, new byte[]{}));
    }

    static
    {
        newUser.setId(userUUID1);
        newUser.setFirstName("John");
        newUser.setLastName("Doe");
        newUser.setEmail("john@jjoan14.com");
        newUser.setPassword("password");
        newUser.setAdmin(false);
        newUser.setLastTimeLoggedIn(LocalDate.now());
        newUser.setCity("Iasi");
        newUser.setCountry("Romania");
        newUser.setDateOfBirth(LocalDate.of(1999, 12, 5));
        newUser.setProfileImageNumber(1);
        newUser.setImageExtension("png");
        newUser.setGender(true);
        newUser.setLanguage("RO");
        newUser.setPhoneNumber("0712345678");
        newUser.setPronoun1("he");
        newUser.setPronoun1("him");
        newUser.setDeleted(false);
    }

    static{
        Medic temppMedic = new Medic();
        temppMedic.setMedicId(medicUUID1);
        temppMedic.setTypeOfMedic("Chirurg");
        temppMedic.setClinic("Policlinica Iasi");
        temppMedic.setCertificateImageNumber(2);
        temppMedic.setCertificateExtension("png");
        temppMedic.setApproved(false);
        medic1 = new Medic(newUser, temppMedic);
    }

    @Test
    @Order(20)
    public void createMedic_NonExistingMedic_CreatesMedic()
    {
        assertDoesNotThrow(() -> userService.createMedic(medic1, new byte[]{}, new byte[]{}));
    }

    @Test
    @Order(21)
    public void createMedic_ExistingMedic_ThrowsException()
    {
        assertThrows(UserDidSomethingWrongExceptions.UserWithEmailAlreadyExists.class, () -> userService.createMedic(medic1, new byte[]{}, new byte[]{}));
    }

//	@Test
//	@Order(22) //No user with id shfihf found
//	public void getMedicProfile_MockUser_ReturnsMedicProfile()
//	{
//		//userDAO.signupUser(medic1); //eroare urata rau
//		assertDoesNotThrow(() -> userService.getMedicProfile(medicUUID1));
//	}


    @Test
    @Order(22)
    public void getUser_NonExistingUser_ThrowsException()
    {
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userService.getUser(userUUID));
    }

    @Test
    @Order(23)
    public void getUserIdOfMedic_NonExistingMedic_ThrowsException()
    {
        assertThrows(NotFoundExceptions.MedicNotFound.class, () -> userService.getUserIdOfMedic(medicUUID));
    }

    @Test
    @Order(24)
    public void deleteUser_ExistingUser_RemovesTheUserFromTheDatabase1(){
        assertDoesNotThrow(() -> userDAO.deleteUser(medic1.getId()));
    }

    @Test
    @Order(25)
    public void deleteUser_ExistingUser_RemovesTheUserFromTheDatabase2(){
        assertDoesNotThrow(() -> userDAO.deleteUser(user.getId()));
    }
}
