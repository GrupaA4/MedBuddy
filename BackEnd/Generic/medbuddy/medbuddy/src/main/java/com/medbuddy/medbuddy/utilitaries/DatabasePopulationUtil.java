package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.MedicalHistoryDAO;
import com.medbuddy.medbuddy.repository.daos.MessagerieDAO;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class DatabasePopulationUtil {
    private final MessagerieDAO messagerieDAO;
    private final UserDAO userDAO;
    private final MedicalHistoryDAO medicalHistoryDAO;

    public DatabasePopulationUtil(MessagerieDAO messagerieDAO, UserDAO userDAO, MedicalHistoryDAO medicalHistoryDAO) {
        this.messagerieDAO = messagerieDAO;
        this.userDAO = userDAO;
        this.medicalHistoryDAO = medicalHistoryDAO;
    }

    public static void main(String[] args) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
        dataSource.setUrl("jdbc:oracle:thin:@localhost:1521:XE");
        dataSource.setUsername("student");
        dataSource.setPassword("STUDENT");
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        MessagerieDAO messagerieDAO = new MessagerieDAO();
        MedicalHistoryDAO medicalHistoryDAO = new MedicalHistoryDAO(jdbcTemplate);
        UserDAO userDAO = new UserDAO(jdbcTemplate);
        DatabasePopulationUtil util = new DatabasePopulationUtil(messagerieDAO, userDAO, medicalHistoryDAO);
       // util.processUserFile("C:\\Users\\User\\Downloads\\user.txt");
        //util.processMessagerieFile("C:\\Users\\User\\Downloads\\message (3).txt");
        util.processMedicalHistoryFile("C:\\Users\\User\\Downloads\\medical_history.txt");
        //util.processMedicFile("C:\\Users\\User\\Downloads\\medic.txt");
    }

    public void processMedicFile(String csvFile) {
        String line;
        String delimiter = "\\|";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 7) {
                    try {
                        UUID medicId = UUID.fromString(data[0]);
                        UUID userId = UUID.fromString(data[1]);
                        String typeOfMedic = data[2];
                        String clinic = data[3];
                        int certificateImageNumber = Integer.parseInt(data[4]);
                        String certificateExtension = data[5];
                        boolean isApproved = data[6].equals("1");

                        Medic medic = new Medic();
                        medic.setMedicId(medicId);
                        medic.setId(userId);
                        medic.setTypeOfMedic(typeOfMedic);
                        medic.setClinic(clinic);
                        medic.setCertificateImageNumber(certificateImageNumber);
                        medic.setCertificateExtension(certificateExtension);
                        medic.setApproved(isApproved);

                        userDAO.signupMedic(medic);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    System.err.println("Invalid entry: " + line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void processMessagerieFile(String csvFile) {
        String line;
        String delimiter = "\\|";
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 11) {
                    UUID id = UUID.fromString(data[0]);
                    UUID senderId = UUID.fromString(data[1]);
                    UUID conversationId = UUID.fromString(data[2]);
                    LocalDate timeSent = LocalDate.parse(data[3], dateFormat);
                    String message = data[4];
                    int imageNumber = Integer.parseInt(data[5]);
                    String imageExtension = data[6];
                    boolean isRead = Boolean.parseBoolean(data[7]);
                    UUID repliesTo = UUID.fromString(data[8]);
                    boolean isFromMedBuddy = Boolean.parseBoolean(data[9]);
                    boolean isDeleted = Boolean.parseBoolean(data[10]);
                    Message messages = new Message(conversationId, id, senderId, message, imageNumber, imageExtension, isRead, repliesTo, timeSent, isFromMedBuddy, isDeleted);
                    System.out.println(id);
                    messagerieDAO.addMessageToConversation(messages);
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
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 18) {
                    UUID id = UUID.fromString(data[0]);
                    String email = data[1];
                    String password = data[2];
                    String lastName = data[3];
                    String firstName = data[4];
                    boolean gender = data[5].equals("1");
                    String pronoun1 = data[6];
                    String pronoun2 = data[7];
                    LocalDate dateOfBirth = LocalDate.parse(data[8], dateFormat);
                    String language = data[9];
                    String country = data[10];
                    String city = data[11];
                    String phoneNumber = data[12];
                    int profileImageNumber = Integer.parseInt(data[13]);
                    String imageExtension = data[14];
                    LocalDate lastTimeLoggedIn = LocalDate.parse(data[15], dateFormat);
                    boolean isAdmin = data[16].equals("1");
                    boolean isDeleted = data[17].equals("1");

                    User user = new User(id, email, password, lastName, firstName, gender, pronoun1, pronoun2, dateOfBirth, language, country, city, phoneNumber, profileImageNumber, imageExtension, lastTimeLoggedIn, isAdmin, isDeleted);
                    userDAO.signupUser(user);
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

//    public void processAdminFile(String csvFile) {
//        String line;
//        String delimiter = "\\|";
//        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd.MM.yyyy");
//
//        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
//            while ((line = br.readLine()) != null) {
//                String[] data = line.split(delimiter);
//                if (data.length == 18) {
//                    UUID id = UUID.fromString(data[0]);
//                    String email = data[1];
//                    String password = data[2];
//                    String lastName = data[3];
//                    String firstName = data[4];
//                    Boolean gender = data[5].equals("1");
//                    String pronoun1 = data[6];
//                    String pronoun2 = data[7];
//                    LocalDate dateOfBirth = LocalDate.parse(data[8], dateFormat);
//                    String language = data[9];
//                    String country = data[10];
//                    String city = data[11];
//                    int profileImageNumber = Integer.parseInt(data[12]);
//                    String phoneNumber = data[13];
//                    String imageExtension = data[14];
//                    LocalDate lastTimeLoggedIn = LocalDate.parse(data[15], dateFormat);
//                    Boolean isAdmin = data[16].equals("1");
//                    Boolean isDeleted = data[17].equals("1");
//
//                    Admin admin = new Admin(id, email, password, lastName, firstName, gender, pronoun1, pronoun2, dateOfBirth, language, country, city, phoneNumber, profileImageNumber, imageExtension, lastTimeLoggedIn, isAdmin, isDeleted);
//                    userDAO.signupUser(admin);
//                } else {
//                    System.err.println("invalid : " + line);
//                }
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

}
