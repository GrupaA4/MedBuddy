package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.NotificationsService;
import com.medbuddy.medbuddy.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.UUID;

import static java.nio.file.StandardWatchEventKinds.*;

@Component
public class MedbuddyUtil {

    @Autowired
    UserService userService;
    @Autowired
    UserDAO userDAO;
    @Autowired
    NotificationsService notificationsService;
    /*public static void main(String[] args) {
        MedbuddyUtil obj = new MedbuddyUtil();
        Scanner scanner = new Scanner(System.in);
        String message;

        while (true) {
            message = scanner.nextLine();
            System.out.println(message);
            sendMessageToMedbuddy(message, UUID.randomUUID());
            receiveMessageFromMedbuddy(UUID.randomUUID());
        }
    }*/

    public void closeConversation(UUID userId) {
        sendMessageToMedbuddy("EXIT", UUID.randomUUID());
    }

    public Message receiveMessageFromMedbuddy(UUID userId) {
        try {
            WatchService watcher = FileSystems.getDefault().newWatchService();
            Path directory = Paths.get("C:\\UNIVERSITY STUFF\\II-II Ingineria Programarii\\Project\\MedBuddy\\BackEnd\\Generic\\medbuddy\\medbuddy\\src\\main\\java\\com\\medbuddy\\medbuddy\\utilitaries\\communication\\frommedbuddy");
            directory.register(watcher, ENTRY_CREATE, ENTRY_MODIFY, ENTRY_DELETE);
            while (true) {
                WatchKey key = watcher.take();
                List<WatchEvent<?>> events = key.pollEvents();
                for (WatchEvent<?> event : events) {
                    if (event.kind() == ENTRY_MODIFY) {
                        Path modifiedFile = (Path) event.context();
                        System.out.println("File modified: " + modifiedFile);
                        FileReader reader = new FileReader("C:\\UNIVERSITY STUFF\\II-II Ingineria Programarii\\Project\\MedBuddy\\BackEnd\\Generic\\medbuddy\\medbuddy\\src\\main\\java\\com\\medbuddy\\medbuddy\\utilitaries\\communication\\frommedbuddy" + File.separator + modifiedFile.toFile());
                        BufferedReader bufferedReader = new BufferedReader(reader);
                        String line;
                        List<String> inputs = new ArrayList<>();
                        while ((line = bufferedReader.readLine()) != null) {
                            inputs.add(line);
                        }
                        String message = null;
                        String category = null;
                        String diagnostic = null;
                        if (!inputs.isEmpty()) {
                            message = inputs.get(0);
                            if (inputs.size() > 1) {
                                category = inputs.get(1);
                                if (message.equalsIgnoreCase("DONE") && inputs.size() > 2) {
                                    diagnostic = inputs.get(2);
                                }
                            }
                        }
                        if (diagnostic != null) {
                            return assignMedics(new Message(message + "\n" + category + "\n" + diagnostic));
                        }
                        bufferedReader.close();
                        return new Message(message);
                    }
                }
                key.reset();
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
        //medbuddyComUtoG.txt
        //receive message
        //check for diagnosis
        //  if diagnosis, then create a MedicalHistoryEntry
    }

    public void sendMessageToMedbuddy(String messageToBeSent, UUID userId) {
        //send message
        try {
            File inputFile = new File("C:\\UNIVERSITY STUFF\\II-II Ingineria Programarii\\Project\\MedBuddy\\BackEnd\\Generic\\medbuddy\\medbuddy\\src\\main\\java\\com\\medbuddy\\medbuddy\\utilitaries\\communication\\tomedbuddy" + File.separator + "medbuddyComGtoU.txt");
            FileWriter writer = new FileWriter(inputFile);
            writer.write(messageToBeSent);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Message assignMedics(Message message) {
        String[] parts = message.getMessage().split("\n");
        if (parts.length > 1) {
            String category = parts[1];
            String email = SecurityUtil.getEmail();
            UUID userId = userService.getUserIdByEmail(email);
            StringBuilder medicsInfo = new StringBuilder();
            List<Medic> medics;

            switch (category) {
                case "General Medical Condition":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "General Practitioner", parts[2]));
                    break;
                case "Oncological Diseases":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Oncologist", parts[2]));
                    break;
                case "Neurological Disorders":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Neurologist", parts[2]));
                    break;
                case "Infectious Diseases":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Infectious Disease Specialist", parts[2]));
                    break;
                case "Cardiovascular Diseases":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Cardiologist", parts[2]));
                    break;
                case "Hematological Diseases":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Hematologist", parts[2]));
                    break;
                case "Dermatological Diseases":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Dermatologist", parts[2]));
                    break;
                case "Pulmonary Disorders":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Pulmonologist", parts[2]));
                    break;
                case "Gastrointestinal Disorders":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Gastroenterologist", parts[2]));
                    break;
                case "Ear, Nose, and Throat Disorders (ENT)":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "ENT Specialist", parts[2]));
                    break;
                case "Renal and Urological Disorders":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Nephrologist", parts[2]));
                    break;
                case "Ophthalmological Disorders":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Ophthalmologist", parts[2]));
                    break;
                case "Musculoskeletal Disorders":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Orthopedic Specialist", parts[2]));
                    break;
                case "Metabolic Disorders":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Endocrinologist", parts[2]));
                    break;
                case "Psychiatric Disorders":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Psychiatrist", parts[2]));
                    break;
                case "Autoimmune Diseases":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Rheumatologist", parts[2]));
                    break;
                case "Reproductive Health Issues":
                    medics = new ArrayList<>(userDAO.getMedics(userDAO.getUserById(userId), "Gynecologist", parts[2]));
                    break;
                default:
                    medics = new ArrayList<>();
                    break;
            }

            System.out.println(medics);

            medicsInfo.append("###Diagnosis###").append(parts[2]).append(". Please contact one of the following medics: (");
            if (medics.isEmpty()) {
                medicsInfo.append(" No medics found");
            } else {
                for (var medic : medics) {
                    notificationsService.sendNotification(medic.getId(), parts[2]);
                    medicsInfo.append(medic.getEmail());
                    if (medic != medics.get(medics.size() - 1)) {
                        medicsInfo.append(", ");
                    }
                }
            }
            medicsInfo.append(")");

            System.out.println(medicsInfo);
            return new Message(medicsInfo.toString());
        }
        return null;
    }
}