package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.models.Admin;
import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.MedicalHistoryDAO;
import com.medbuddy.medbuddy.repository.daos.MessagerieDAO;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Component
public class DatabasePopulationUtil {

    private final MessagerieDAO messagerieDAO;
    private final UserDAO userDAO;
    private final MedicalHistoryDAO medicalHistoryDAO;

    @Autowired
    public DatabasePopulationUtil(MessagerieDAO messagerieDAO, UserDAO userDAO, MedicalHistoryDAO medicalHistoryDAO) {
        this.messagerieDAO = messagerieDAO;
        this.userDAO = userDAO;
        this.medicalHistoryDAO = medicalHistoryDAO;
    }

    public void processMessagerieFile(String csvFile) {
        String line;
        String delimiter = "\\|";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 11) {
                    UUID id = UUID.fromString(data[0]);
                    UUID senderId = UUID.fromString(data[1]);
                    UUID conversationId = UUID.fromString(data[2]);
                    String timeSent = data[3];
                    String message = data[4];
                    int messageType = Integer.parseInt(data[5]);
                    String imagePath = data[6].equals("NULL") ? null : data[6];
                    int isFromMedBuddy = Integer.parseInt(data[7]);
                    UUID repliesTo = data[8].equals("NULL") ? null : UUID.fromString(data[8]);
                    int isRead = Integer.parseInt(data[9]);
                    int isDeleted = Integer.parseInt(data[10]);
                    System.out.println(id);
                    try {
                        messagerieDAO.addMessageToConversation(id, senderId, conversationId, message, imagePath, repliesTo, isFromMedBuddy);
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                } else {
                    System.err.println("invalid : " + line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void processUserFile(String csvFile) {
        String line;
        String delimiter = "\\|";
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 18) {
                    try {
                        UUID id = UUID.fromString(data[0]);
                        String email = data[1];
                        String password = data[2];
                        String lastName = data[3];
                        String firstName = data[4];
                        Boolean gender = data[5].equals("1");
                        String pronoun1 = data[6];
                        String pronoun2 = data[7];
                        Date dateOfBirth = dateFormat.parse(data[8]);
                        String language = data[9];
                        String country = data[10];
                        String city = data[11];
                        int postalNumber = Integer.parseInt(data[12]);
                        int phoneNumber = Integer.parseInt(data[13]);
                        String profileImagePath = data[14];
                        Boolean isAdmin = data[15].equals("1");
                        Boolean isDeleted = data[16].equals("1");

                        User user = new User(id, email, password, lastName, firstName, gender, pronoun1, pronoun2, dateOfBirth, language, country, city, postalNumber, phoneNumber, profileImagePath, isAdmin, isDeleted);
                        userDAO.signupUser(user);
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                } else {
                    System.err.println("invalid : " + line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void processMedicalHistoryFile(String csvFile) {
        String line;
        String delimiter = "\\|";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 7) {
                    try {
                        UUID id = UUID.fromString(data[0]);
                        UUID medicId = UUID.fromString(data[1]);
                        UUID patientId = UUID.fromString(data[2]);
                        String diagnosis = data[3];
                        String period = data[4];
                        String treatment = data[5];
                        boolean isDeleted = data[6].equals("1");

                        MedicalHistoryEntry entry = new MedicalHistoryEntry();
                        entry.setId(id);
                        entry.setMedicId(medicId);
                        entry.setPatientId(patientId);
                        entry.setDiagnosis(diagnosis);
                        entry.setPeriod(period);
                        entry.setTreatment(treatment);
                        entry.setDeleted(isDeleted);

                        medicalHistoryDAO.createMedicalHistoryEntry(entry);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    System.err.println("invalid : " + line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void processAdminFile(String csvFile) {
        String line;
        String delimiter = "\\|";
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 18) {
                    try {
                        UUID id = UUID.fromString(data[0]);
                        String email = data[1];
                        String password = data[2];
                        String lastName = data[3];
                        String firstName = data[4];
                        Boolean gender = data[5].equals("1");
                        String pronoun1 = data[6];
                        String pronoun2 = data[7];
                        Date dateOfBirth = dateFormat.parse(data[8]);
                        String language = data[9];
                        String country = data[10];
                        String city = data[11];
                        int postalNumber = Integer.parseInt(data[12]);
                        int phoneNumber = Integer.parseInt(data[13]);
                        String profileImagePath = data[14];
                        Boolean isAdmin = data[15].equals("1");
                        Boolean isDeleted = data[16].equals("1");

                        Admin admin = new Admin(id, email, password, lastName, firstName, gender, pronoun1, pronoun2, dateOfBirth, language, country, city, postalNumber, phoneNumber, profileImagePath, isAdmin, isDeleted);
                        userDAO.signupUser(admin);
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                } else {
                    System.err.println("invalid : " + line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
