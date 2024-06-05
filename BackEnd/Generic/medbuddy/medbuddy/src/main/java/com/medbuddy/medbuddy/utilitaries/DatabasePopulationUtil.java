package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.models.*;
import com.medbuddy.medbuddy.repository.daos.*;
import com.medbuddy.medbuddy.services.UserService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

public class DatabasePopulationUtil {
    private final UserDAO userDAO;
    private final MedicalHistoryDAO medicalHistoryDAO;
    private final AdminFunctionalityDAO adminFunctionalityDAO;
    private final NotificationsDAO notificationsDAO;
    private final BCryptPasswordEncoder encoder;
    private final List<User> users;

    public DatabasePopulationUtil(UserDAO userDAO, MedicalHistoryDAO medicalHistoryDAO, AdminFunctionalityDAO adminFunctionalityDAO, NotificationsDAO notificationsDAO) {
        this.userDAO = userDAO;
        this.medicalHistoryDAO = medicalHistoryDAO;
        this.adminFunctionalityDAO = adminFunctionalityDAO;
        this.notificationsDAO = notificationsDAO;
        this.encoder = new BCryptPasswordEncoder();
        users = new ArrayList<>();
    }

    public static void main(String[] args) {
        JdbcTemplate jdbcTemplate = getJdbcTemplate();
        MedicalHistoryDAO medicalHistoryDAO = new MedicalHistoryDAO(jdbcTemplate);
        UserDAO userDAO = new UserDAO(jdbcTemplate);
        NotificationsDAO notificationsDAO = new NotificationsDAO(jdbcTemplate);
        AdminFunctionalityDAO adminFunctionalityDAO = new AdminFunctionalityDAO(jdbcTemplate);
        DatabasePopulationUtil util = new DatabasePopulationUtil(userDAO, medicalHistoryDAO, adminFunctionalityDAO, notificationsDAO);
        addFirst(util);
        addSecond(util);
        addThird(util);
        commenceUserDeletion(util);
    }

    public static void addFirst(DatabasePopulationUtil util) {
        util.processUserFile("src/main/java/com/medbuddy/medbuddy/utilitaries/databasepopulationfiles/user.txt");
        util.processMedicFile("src/main/java/com/medbuddy/medbuddy/utilitaries/databasepopulationfiles/medic.txt");
    }

    public static void addSecond(DatabasePopulationUtil util) {
        util.processMedicalHistoryFile("src/main/java/com/medbuddy/medbuddy/utilitaries/databasepopulationfiles/medical_history.txt");
    }

    public static void addThird(DatabasePopulationUtil util) {
        util.processReportFile("src/main/java/com/medbuddy/medbuddy/utilitaries/databasepopulationfiles/report.txt");
        util.processNotificationsFile("src/main/java/com/medbuddy/medbuddy/utilitaries/databasepopulationfiles/notification.txt");
    }

    private static JdbcTemplate getJdbcTemplate() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
        dataSource.setUrl("jdbc:oracle:thin:@localhost:1521:XE");
        dataSource.setUsername("Medbuddy");
        dataSource.setPassword("Medbuddy");
        return new JdbcTemplate(dataSource);
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
                    String password = encoder.encode(data[2]);
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
                    users.add(user);
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
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 7) {
                    try {
                        UUID id = UUID.fromString(data[0]);
                        UUID medicId = UUID.fromString(data[1]);
                        UUID patientId = UUID.fromString(data[2]);
                        String diagnosis = data[3];
                        LocalDate date_diagnosis = LocalDate.parse(data[4], dateFormat);
                        String treatment = data[5];
                        boolean isDeleted = data[6].equals("1");

                        MedicalHistoryEntry entry = new MedicalHistoryEntry();
                        entry.setId(id);
                        entry.setMedicId(medicId);
                        entry.setPatientId(patientId);
                        entry.setDiagnosis(diagnosis);
                        entry.setDate_diagnosis(date_diagnosis);
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

    public void processNotificationsFile(String csvFile) {
        String line;
        String delimiter = "\\|";
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 4) {
                    try {
                        UUID id = UUID.fromString(data[0]);
                        UUID medicId = UUID.fromString(data[1]);
                        UUID patientId = UUID.fromString(data[2]);
                        String diagnosis = data[3];

                        Notification entry = new Notification();
                        entry.setId(id);
                        entry.setMedicId(medicId);
                        entry.setPatientId(patientId);
                        entry.setDiagnosis(diagnosis);

                        notificationsDAO.addNotification(entry);
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

    public void processReportFile(String csvFile) {
        String line;
        String delimiter = "\\|";
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(delimiter);
                if (data.length == 6) {
                    try {
                        UUID id = UUID.fromString(data[0]);
                        UUID reportedUser = UUID.fromString(data[1]);
                        UUID reportedBy = UUID.fromString(data[2]);
                        String reportMessage = data[3];
                        LocalDate timeCreated = LocalDate.parse(data[4], dateFormat);
                        boolean isDeleted = data[5].equals("1");

                        Report entry = new Report();
                        entry.setId(id);
                        entry.setReportedUser(reportedUser);
                        entry.setReportedBy(reportedBy);
                        entry.setReportMessage(reportMessage);
                        entry.setTimeCreated(timeCreated);
                        entry.setDeleted(isDeleted);


                        adminFunctionalityDAO.reportUser(entry);
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

    public static void commenceUserDeletion(DatabasePopulationUtil util){
        util.deleteUsers();;
    }
    public void deleteUsers(){
        for(User user : users){
            Random random = new Random();
            if(random.nextInt(100) >= 95){
                userDAO.markUserAsDeleted(user.getId());
                userDAO.softDeleteMedicalHistoryForUser(user.getId());
                userDAO.softDeleteReportsOnUser(user.getId());
            }
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
