package com.medbuddy.medbuddy.tests.repository.daos;

import com.medbuddy.medbuddy.controllers.AdminFunctionalityController;
import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.exceptions.UserDidSomethingWrongExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class UserDAOTest {

    @Autowired
    private AdminFunctionalityService adminFunctionalityService;
    @Autowired
    private UserDAO userDAO;
    // NU E UTILIZAT JPA SI UNELE FIELD URI NU SUNT SYNCED CU BAZA DE DATE
    // EXEMPLU CONCRET: isDeleted cand se da delete in baza de date nu e sincronizat cu cel de aici
    // Odata ce s-a actualizat statusul in db acolo ramane cu isDeleted=1 indiferent de valoarea bool din obiect
    // Astea sunt doar mock up-uri cu care sa putem utiliza functiile.
    // O data marcat ca deleted in db un user nu i se mai poate actualiza statusul, sa fiti atente la chestii marunte de genul i guess
    private static UUID userUUID = UUID.randomUUID();
    private static User user = new User();
    private static UUID medicUUID = UUID.randomUUID();
    private static Medic medic;

    static {
        user.setId(userUUID);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@doe.com");
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
    public void isMedic_MockUser_ShouldBeFalse() {
        assertThat(userDAO.isMedic(userUUID)).isFalse();
    }

    @Test
    @Order(4)
    public void signupMedic_NotExistingMedic_CreatesMedic() {
        assertDoesNotThrow(() -> userDAO.signupMedic(medic));
    }

    @Test
    @Order(5)
    public void signupMedic_ExistingMedic_ThrowsException() {
        assertThrows(DuplicateKeyException.class, () -> userDAO.signupMedic(medic));
    }

    @Test
    @Order(6)
    public void isApproved_MockUser_ShouldBeFalse() {
        assertThat(medic.isApproved()).isFalse();
    }

    @Test
    @Order(7)
    public void isMedic_MockUser_ShouldBeTrue() {
        assertThat(userDAO.isMedic(userUUID)).isTrue();
    }

    @Test
    @Order(8)
    public void approveMedic_MockUser_ChangesTheApprovalStatusToTrue() {
        assertDoesNotThrow(() -> adminFunctionalityService.allowMedic(medic.getId()));
    }

    @Test
    @Order(9)
    public void findByEmail_ExistingEmail_ShouldReturnUser() {
        Optional<User> foundUser = userDAO.findByEmail("john@doe.com");
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get()).isEqualTo(user);
    }

    @Test
    @Order(10)
    public void findByEmail_NonExistingEmail_ShouldReturnEmpty() {
        Optional<User> foundUser = userDAO.findByEmail("nonexistent@doe.com");
        assertThat(foundUser).isNotPresent();
    }

    @Test
    @Order(11)
    public void updateLastTimeLoggedOn_MockUser_ShouldUpdateDate() {
        LocalDate newLastTimeLoggedOn = LocalDate.now();
        userDAO.updateLastTimeLoggedOn(userUUID, newLastTimeLoggedOn);
        assertEquals(user.getLastTimeLoggedIn(), newLastTimeLoggedOn);
    }

    @Test
    @Order(12)
    public void getUserId_ExistingEmail_ShouldReturnUserId() {
        assertThat(userDAO.getUserId("john@doe.com")).isEqualTo(userUUID);
    }

    @Test
    @Order(13)
    public void getUserId_NonExistingEmail_ShouldReturnUserId() {
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.getUserId("nonexistent@doe.com"));
    }


    @Test
    @Order(14)
    public void checkIfUserWithEmailExists_ExistingEmail_ShouldThrowException() {
        assertThrows(UserDidSomethingWrongExceptions.UserWithEmailAlreadyExists.class, () -> userDAO.checkIfUserWithEmailExists("john@doe.com"));
    }

    @Test
    @Order(15)
    public void checkIfUserWithEmailExists_NonExistingEmail_ShouldNotThrowException() {
        assertDoesNotThrow(() -> userDAO.checkIfUserWithEmailExists("newuser@doe.com"));
    }

    @Test
    @Order(16)
    public void getMaxImageNumber_ShouldReturnMaxImageNumber() {
        assertThat(userDAO.getMaxImageNumber()).isEqualTo(10050); // ???
    }

    @Test
    @Order(11)
    public void getMaxCertificateNumber_ShouldReturnMaxCertificateNumber() {
        assertThat(userDAO.getMaxCertificateNumber()).isEqualTo(20010);
    }

    @Test
    @Order(12)
    public void getUserById_ExistingUserId_ShouldReturnUser() {
        assertThat(userDAO.getUserById(userUUID)).isEqualTo(user);
    }


    @Test
    @Order(13)
    public void getUserById_NonExistingUserId_ShouldThrowException() {
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.getUserById(UUID.randomUUID()));
    }

//---------------------------------------------------------

    @Test
    @Order(33)
    public void isDeleted_MockUser_DefaultValueIsFalse() {
        assertEquals(userDAO.getUserById(userUUID).isDeleted(), false);
    }

    @Test
    @Order(34)
    public void markUserAsDeleted_MockUser_UpdatesTheDeletionStatusToTrue() {
        userDAO.markUserAsDeleted(userUUID);

        assertEquals(userDAO.getUserById(userUUID).isDeleted(), true);
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

    @Test
    @Order(37)
    public void deleteUser_NonExistingUser_ThrowsException() {
        assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.deleteUser(userUUID));
    }


}

