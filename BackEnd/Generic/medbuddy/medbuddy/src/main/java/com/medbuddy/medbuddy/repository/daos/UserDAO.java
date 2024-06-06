package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;
import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.exceptions.UserDidSomethingWrongExceptions;
import com.medbuddy.medbuddy.exceptions.Warnings.UserWarnings;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Patient;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.rowmappers.MedicRowMapper;
import com.medbuddy.medbuddy.repository.rowmappers.UserRowMapper;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Repository
public class UserDAO {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * check to see if a user is in the database
     * @param email email in the credentials
     * @param password password in the credentials
     * @return true if the credentials match a user, false if not
     */
    public boolean loginUser(String email, String password) {
        String sql = "SELECT COUNT(1) FROM appuser WHERE email = ? AND password = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email, password);

        if(count == null) {
            throw new DatabaseExceptions.ErrorInExecutingStatement("Error executing login statement, no object returned!");
        }

        return switch (count) {
            case 0 -> false;
            case 1 -> true;
            default -> {
                UserWarnings.MultipleUsersSameCredentials.log(email, password);
                yield true;
            }
        };
    }

    public Optional<User> findByEmail(String email) {
        try {
            String sql = "SELECT * FROM appuser WHERE email = ?";
            User user = jdbcTemplate.queryForObject(sql, new UserRowMapper(), email);
            return Optional.ofNullable(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public void softDeleteReportsOnUser(UUID userId) {
        jdbcTemplate.update("UPDATE reports SET isDeleted = 1 WHERE reportedUser = ?", userId.toString());
    }

    public void updateLastTimeLoggedOn(UUID userId, LocalDate date) {
        String sql = "UPDATE appuser SET lastTimeLoggedIn = ? WHERE id = ?";
        int numberOfUsersUpdated = jdbcTemplate.update(sql,
                Date.valueOf(date),
                userId.toString());

        switch (numberOfUsersUpdated) {
            case 0:
                throw new NotFoundExceptions.UserNotFound("No user with id " + userId + " was found");
            case 1:
                return;
            default:
                throw new DatabaseExceptions.NonUniqueIdentifier("Multiple users with id " + userId + " was found");
        }
    }

    /**
     * provides the id of a user based on their email
     *
     * @param email email of the user
     * @return the userid as a UUID
     */
    public UUID getUserId(String email) {
        String sql = "SELECT id FROM appuser WHERE email = ?";
        List<String> ids = jdbcTemplate.queryForList(sql, String.class, email);

        return switch (ids.size()) {
            case 0 -> throw new NotFoundExceptions.UserNotFound("No user with email: " + email + " found!");
            case 1 -> UUID.fromString(ids.get(0));
            default -> {
                UserWarnings.MultipleUsersSameEmail.log(ids.get(0), ids.get(1), email);
                yield UUID.fromString(ids.get(0));
            }
        };
    }

    public void checkIfUserWithEmailExists(String email) {
        String sqlCheck = "SELECT COUNT(1) FROM appuser WHERE email = ?";
        Integer numberOfExistingUsers = jdbcTemplate.queryForObject(sqlCheck, Integer.class, email);

        if (numberOfExistingUsers == null)
            throw new DatabaseExceptions.ErrorInExecutingStatement("Error while checking to see if a user already exists or not!");

        if (numberOfExistingUsers > 0)
            throw new UserDidSomethingWrongExceptions.UserWithEmailAlreadyExists("Error: User with this email already exists!");
    }

    public int getMaxImageNumber() {
        String sql = "SELECT MAX(profileImageNumber) FROM appuser";
        Integer maxImageNumber = jdbcTemplate.queryForObject(sql, Integer.class);

        if (maxImageNumber == null) {
            return 0;
        }

        return maxImageNumber;
    }

    public void signupUser(User user) {
        String sqlInsert = "INSERT INTO appuser (" +
                "id, " +
                "email, " +
                "password, " +
                "lastName, " +
                "firstName, " +
                "gender, " +
                "pronoun1, " +
                "pronoun2, " +
                "dateOfBirth, " +
                "language, " +
                "country, " +
                "city, " +
                "phoneNumber, " +
                "profileImageNumber, " +
                "imageExtension, " +
                "lastTimeLoggedIn, " +
                "isAdmin, " +
                "isDeleted) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sqlInsert,
                user.getId().toString(),
                user.getEmail(),
                user.getPassword(),
                user.getLastName(),
                user.getFirstName(),
                DataConvertorUtil.turnBooleanInto0or1(user.isGender()),
                user.getPronoun1(),
                user.getPronoun2(),
                Date.valueOf(user.getDateOfBirth()),
                user.getLanguage(),
                user.getCountry(),
                user.getCity(),
                user.getPhoneNumber(),
                user.getProfileImageNumber(),
                user.getImageExtension(),
                Date.valueOf(user.getLastTimeLoggedIn()),
                DataConvertorUtil.turnBooleanInto0or1(user.isAdmin()),
                DataConvertorUtil.turnBooleanInto0or1(user.isDeleted())
        );
    }

    public int getMaxCertificateNumber() {
        String sql = "SELECT MAX(certificateImageNumber) FROM medic";
        Integer maxCertificateNumber = jdbcTemplate.queryForObject(sql, Integer.class);

        return Objects.requireNonNullElse(maxCertificateNumber, 0);
    }

    public void signupMedic(Medic medic) {
        String sqlInsert = "INSERT INTO medic (" +
                "id, " +
                "userId, " +
                "typeOfMedic, " +
                "clinic, " +
                "certificateImageNumber, " +
                "imageExtension, " +
                "isApproved) " +
                "VALUES(?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sqlInsert,
                medic.getMedicId().toString(),
                medic.getId().toString(),
                medic.getTypeOfMedic(),
                medic.getClinic(),
                medic.getCertificateImageNumber(),
                medic.getImageExtension(),
                DataConvertorUtil.turnBooleanInto0or1(medic.isApproved()));
    }

    public User getUserById(UUID id) {
        String sql = "SELECT * FROM appuser WHERE id = ?";
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper(), id.toString());
        return switch (users.size()) {
            case 0 -> throw new NotFoundExceptions.UserNotFound("No user with id " + id + " found");
            case 1 -> users.get(0);
            default -> throw new DatabaseExceptions.NonUniqueIdentifier("Found more users with the same id: " + id);
        };
    }

    public UUID getUserIdOfMedic(UUID medicId) {
        String sql = "SELECT userId FROM medic WHERE id = ?";
        List<String> ids = jdbcTemplate.queryForList(sql, String.class, medicId.toString());
        return switch (ids.size()) {
            case 0 -> throw new NotFoundExceptions.UserNotFound("No medic with id " + medicId + " found");
            case 1 -> UUID.fromString(ids.get(0));
            default ->
                    throw new DatabaseExceptions.NonUniqueIdentifier("Found more medics with the same id: " + medicId);
        };
    }

    public Medic getMedicSpecificInfoByUserId(UUID id) {
        String sql = "SELECT * FROM medic WHERE userId = ?";
        List<Medic> medics = jdbcTemplate.query(sql, new MedicRowMapper(), id.toString());
        return switch (medics.size()) {
            case 0 -> throw new NotFoundExceptions.UserNotFound("No medic with the user id " + id + " found");
            case 1 -> medics.get(0);
            default -> {
                UserWarnings.MultipleMedicsSameUserId.log(medics.get(0).getMedicId(), medics.get(1).getMedicId(), id);
                yield medics.get(0);
            }
        };
    }

    public void updateUser(User user, UUID id) {
        String sql = "UPDATE appuser SET " +
                "email = ?, " +
                "password = ?, " +
                "lastName = ?, " +
                "firstName = ?, " +
                "gender = ?, " +
                "pronoun1 = ?, " +
                "pronoun2 = ?, " +
                "dateOfBirth = ?, " +
                "language = ?, " +
                "country = ?, " +
                "city = ?, " +
                "phoneNumber = ?, " +
                "profileImageNumber = ?, " +
                "imageExtension = ?, " +
                "isAdmin = ?, " +
                "isDeleted = ? " +
                "WHERE id = ?";
        int numberOfUsersUpdated = jdbcTemplate.update(sql,
                user.getEmail(),
                user.getPassword(),
                user.getLastName(),
                user.getFirstName(),
                DataConvertorUtil.turnBooleanInto0or1(user.isGender()),
                user.getPronoun1(),
                user.getPronoun2(),
                Date.valueOf(user.getDateOfBirth()),
                user.getLanguage(),
                user.getCountry(),
                user.getCity(),
                user.getPhoneNumber(),
                user.getProfileImageNumber(),
                user.getImageExtension(),
                DataConvertorUtil.turnBooleanInto0or1(user.isAdmin()),
                DataConvertorUtil.turnBooleanInto0or1(user.isDeleted()),
                id.toString());
        switch (numberOfUsersUpdated) {
            case 0:
                throw new NotFoundExceptions.UserNotFound("User with id " + user.getId() + " was not found");
            case 1:
                break;
            default:
                throw new DatabaseExceptions.NonUniqueIdentifier("Found more users with id " + user.getId());
        }
    }

    public void deleteUser(UUID id) {
        String sql = "DELETE FROM appuser WHERE id = ?";
        int numberOfUsersDeleted = jdbcTemplate.update(sql, id.toString());
        switch (numberOfUsersDeleted) {
            case 0:
                throw new NotFoundExceptions.UserNotFound("No user with id " + id + " was found");
            case 1:
                break;
            default:
                throw new DatabaseExceptions.NonUniqueIdentifier("More users with the same id (" + id + ") were found");
        }
    }

    public void deleteMedic(UUID id) {
        String sql = "DELETE FROM medic WHERE id = ?";
        int numberOfMedicsDeleted = jdbcTemplate.update(sql, id.toString());
        switch (numberOfMedicsDeleted) {
            case 0:
                throw new NotFoundExceptions.MedicNotFound("No medic with id " + id + " was found");
            case 1:
                break;
            default:
                throw new DatabaseExceptions.NonUniqueIdentifier("More medics with the same id (" + id + ") were found");
        }
    }

    public void markUserAsDeleted(UUID id) {
        String sql = "UPDATE appuser SET isDeleted = 1 WHERE id = ?";
        int numberOfUsersDeleted = jdbcTemplate.update(sql, id.toString());
        switch (numberOfUsersDeleted) {
            case 0:
                throw new NotFoundExceptions.UserNotFound("No user with id " + id + " was found");
            case 1:
                break;
            default:
                throw new DatabaseExceptions.NonUniqueIdentifier("More users with the same id (" + id + ") were found");
        }
    }

    public void softDeleteReportsOnUser(UUID userId) {
        jdbcTemplate.update("UPDATE reports SET isDeleted = 1 WHERE reportedUser = ?", userId.toString());
    }

    public void softDeleteMedicalHistoryForUser(UUID userId) {
        jdbcTemplate.update("UPDATE medicalHistory SET isDeleted = 1 WHERE patientId = ? OR medicId = ?", userId.toString(), userId.toString());
    }

    public void deleteReportsMadeByUser(UUID userId) {
        jdbcTemplate.update("DELETE FROM reports WHERE reportedBy = ?", userId.toString());
    }

    public boolean isMedic(UUID userId) {
        String sql = "SELECT COUNT(1) FROM medic WHERE userId = ?";
        Integer numberOfMedicsFound = jdbcTemplate.queryForObject(sql, Integer.class, userId.toString());

        if (numberOfMedicsFound == null) {
            throw new DatabaseExceptions.ErrorInExecutingStatement("Error while trying to determine weather a user is a medic");
        }

        return switch (numberOfMedicsFound) {
            case 0 -> false;
            case 1 -> true;
            default -> {
                UserWarnings.MultipleMedicsSameUserId.log(null, null, userId);
                yield true;
            }
        };
    }

    public String chooseMedic(Patient patient, String typeOfMedic) {
        //specializare
        String sqlType = "select * from medic where typeOfMedic = ?";
        List<Medic> medics = jdbcTemplate.query(sqlType, new MedicRowMapper(), typeOfMedic);
        if (medics.isEmpty()) {
            return "No medics available for the given type.";
        }
        List<Medic> optimal = new ArrayList<>();
        for (Medic medic : medics) {
            if (!Objects.equals(medic.getCountry(), patient.getCountry())) {
                optimal.add(medic);
                if (Objects.equals(medic.getLanguage(), patient.getLanguage())) {
                    return "###Diagnosis###" + medic.getTypeOfMedic() + ". Pentru mai multe informatii apelati  (" + medic.getEmail() + ") ";
                }
            }
        }
        if (optimal.isEmpty()) {
            return "###Diagnosis###" + medics.get(0).getTypeOfMedic() + ". Pentru mai multe informatii apelati  (" + medics.get(0).getEmail() + ") ";
        }
        return "###Diagnosis###" + optimal.get(0).getTypeOfMedic() + ". Pentru mai multe informatii apelati  (" + optimal.get(0).getEmail() + ") ";
    }
}
