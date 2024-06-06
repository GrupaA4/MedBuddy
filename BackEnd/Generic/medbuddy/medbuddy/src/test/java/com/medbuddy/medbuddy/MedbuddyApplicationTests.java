package com.medbuddy.medbuddy;

import com.medbuddy.medbuddy.controllers.AdminFunctionalityController;
import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.exceptions.UserDidSomethingWrongExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import com.medbuddy.medbuddy.services.UserService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class MedbuddyApplicationTests {

	@Autowired
	private AdminFunctionalityService adminFunctionalityService;
	@Autowired
	private UserDAO userDAO;
	@Autowired
	private UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	// NU E UTILIZAT JPA SI UNELE FIELD URI NU SUNT SYNCED CU BAZA DE DATE
	// EXEMPLU CONCRET: isDeleted cand se da delete in baza de date nu e sincronizat cu cel de aici
	// Odata ce s-a actualizat statusul in db acolo ramane cu isDeleted=1 indiferent de valoarea bool din obiect
	// Astea sunt doar mock up-uri cu care sa putem utiliza functiile.
	// O data marcat ca deleted in db un user nu i se mai poate actualiza statusul, sa fiti atente la chestii marunte de genul i guess
	private static UUID userUUID = UUID.randomUUID();
	private static User user = new User();
	private static UUID medicUUID = UUID.randomUUID();
	private static Medic medic;

	static
	{
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
		assertDoesNotThrow(() -> adminFunctionalityService.allowMedic(medicUUID));
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
	@Order(17)
	public void getMaxCertificateNumber_ShouldReturnMaxCertificateNumber() {
		assertThat(userDAO.getMaxCertificateNumber()).isEqualTo(20010);
	}

	@Test
	@Order(18)
	public void getUserById_ExistingUserId_ShouldReturnUser() {
		assertThat(userDAO.getUserById(userUUID)).isEqualTo(user);
	}


	@Test
	@Order(19)
	public void getUserById_NonExistingUserId_ShouldThrowException() {
		assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.getUserById(UUID.randomUUID()));
	}


	@Test
	@Order(25)
	public void updateUser_ExistingUser_UpdatesUserDetails() {
		User updatedUser = new User();
		updatedUser.setId(userUUID);
		updatedUser.setFirstName("Jane");
		updatedUser.setLastName("Park");
		updatedUser.setEmail("jane@park.com");
		updatedUser.setPassword("newpassword");
		updatedUser.setAdmin(false);
		updatedUser.setLastTimeLoggedIn(LocalDate.now());
		updatedUser.setCity("Brasov");
		updatedUser.setCountry("Romania");
		updatedUser.setDateOfBirth(LocalDate.of(1985, 5, 15));
		updatedUser.setProfileImageNumber(2);
		updatedUser.setImageExtension("png");
		updatedUser.setGender(true);
		updatedUser.setLanguage("RO");
		updatedUser.setPhoneNumber("0787654321");
		updatedUser.setPronoun1("she");
		updatedUser.setPronoun2("her");
		updatedUser.setDeleted(false);

		userService.updateUser(userUUID, updatedUser);

		User userFromDb = userDAO.getUserById(userUUID);
		assertEquals("Jane", userFromDb.getFirstName());
		assertEquals("Park", userFromDb.getLastName());
		assertEquals("jane@park.com", userFromDb.getEmail());
		assertTrue(passwordEncoder.matches("newpassword", userFromDb.getPassword()), "Password should match after update");
		assertFalse(userFromDb.isAdmin());
		assertEquals("Brasov", userFromDb.getCity());
		assertEquals("Romania", userFromDb.getCountry());
		assertEquals(LocalDate.of(1985, 5, 15), userFromDb.getDateOfBirth());
		assertEquals(2, userFromDb.getProfileImageNumber());
		assertEquals("png", userFromDb.getImageExtension());
		assertTrue(userFromDb.isGender());
		assertEquals("RO", userFromDb.getLanguage());
		assertEquals("0787654321", userFromDb.getPhoneNumber());
		assertEquals("she", userFromDb.getPronoun1());
		assertEquals("her", userFromDb.getPronoun2());
		assertFalse(userFromDb.isDeleted());
	}
	@Test
	@Order(26)
	public void updateUser_ExistingUserDAO_UpdatesUserDetails() {
		User existingUser = userDAO.getUserById(userUUID);
		existingUser.setId(userUUID);
		existingUser.setFirstName("Tom");
		existingUser.setLastName("Cruise");
		existingUser.setEmail("tom@cruise.com");
		existingUser.setCity("New York");
		existingUser.setCountry("SUA");
		existingUser.setPhoneNumber("0723456789");

		userDAO.updateUser(existingUser, userUUID);
		User updatedUser = userDAO.getUserById(userUUID);

		assertEquals("Tom", updatedUser.getFirstName());
		assertEquals("Cruise", updatedUser.getLastName());
		assertEquals("tom@cruise.com", updatedUser.getEmail());
		assertEquals("New York", updatedUser.getCity());
		assertEquals("SUA", updatedUser.getCountry());
		assertEquals("0723456789", updatedUser.getPhoneNumber());
	}

	@Test
	@Order(27)
	public void getUserIdOfMedic_ExistingMedicId_ReturnsCorrectUserId() {
		assertEquals(userUUID, userDAO.getUserIdOfMedic(medicUUID));
	}


	@Test
	@Order(28)
	public void getUserIdOfMedic_NonExistingMedicId_ThrowsException() {
		UUID nonExistingMedicId = UUID.randomUUID();
		assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.getUserIdOfMedic(nonExistingMedicId));
	}

	@Test
	@Order(29)
	public void getMedicSpecificInfoByUser_ExistingUserId_ReturnsCorrectMedicInfo() {

		Medic actualMedic = userDAO.getMedicSpecificInfoByUserId(userUUID);
		assertNotNull(actualMedic);
		assertEquals(medic.getMedicId(), actualMedic.getMedicId());
		assertEquals(medic.getTypeOfMedic(), actualMedic.getTypeOfMedic());
		assertEquals(medic.getClinic(), actualMedic.getClinic());
		assertEquals(medic.getCertificateImageNumber(), actualMedic.getCertificateImageNumber());
		assertEquals(medic.getCertificateExtension(), actualMedic.getCertificateExtension());
		assertEquals( actualMedic.isApproved() , true);
	}

	@Test
	@Order(30)
	public void getMedicSpecificInfoByUser_NonExistingUserId_ThrowsException() {
		UUID nonExistingUserId = UUID.randomUUID();
		assertThrows(NotFoundExceptions.UserNotFound.class, () -> userDAO.getMedicSpecificInfoByUserId(nonExistingUserId));
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

}
