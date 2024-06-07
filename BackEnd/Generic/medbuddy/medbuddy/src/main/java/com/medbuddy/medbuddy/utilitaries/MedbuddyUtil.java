package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
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

    public static void main(String[] args) {
        MedbuddyUtil obj = new MedbuddyUtil();
        Scanner scanner = new Scanner(System.in);
        String message;

        while (true) {
            message = scanner.nextLine();
            System.out.println(message);
            sendMessageToMedbuddy(message, UUID.randomUUID());
            receiveMessageFromMedbuddy(UUID.randomUUID());
        }
    }

    public void assignMedic(Message message) {
        String[] parts = message.getMessage().split("\n");
        if (parts.length > 1) {
            String category = parts[1];
            String email = SecurityUtil.getEmail();
            UUID userId = userService.getUserIdByEmail(email);
            String medicsInfo;

            switch (category) {
                case "General Medical Condition":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "General Practitioner");
                    break;
                case "Oncological Diseases":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Oncologist");
                    break;
                case "Neurological Disorders":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Neurologist");
                    break;
                case "Infectious Diseases":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Infectious Disease Specialist");
                    break;
                case "Cardiovascular Diseases":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Cardiologist");
                    break;
                case "Hematological Diseases":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Hematologist");
                    break;
                case "Dermatological Diseases":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Dermatologist");
                    break;
                case "Pulmonary Disorders":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Pulmonologist");
                    break;
                case "Gastrointestinal Disorders":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Gastroenterologist");
                    break;
                case "Ear, Nose, and Throat Disorders (ENT)":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "ENT Specialist");
                    break;
                case "Renal and Urological Disorders":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Nephrologist");
                    break;
                case "Ophthalmological Disorders":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Ophthalmologist");
                    break;
                case "Musculoskeletal Disorders":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Orthopedic Specialist");
                    break;
                case "Metabolic Disorders":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Endocrinologist");
                    break;
                case "Psychiatric Disorders":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Psychiatrist");
                    break;
                case "Autoimmune Diseases":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Rheumatologist");
                    break;
                case "Reproductive Health Issues":
                    medicsInfo = userDAO.getMedics(userDAO.getUserById(userId), "Gynecologist");
                    break;
                default:
                    medicsInfo = "No specialists found.";
                    break;
            }

            System.out.println(medicsInfo);
            sendMessageToMedbuddy(medicsInfo, userId);
        }
    }

    public static void closeConversation(UUID userId) {
        sendMessageToMedbuddy("exit", UUID.randomUUID());
    }

    public static Message receiveMessageFromMedbuddy(UUID userId) {
        try {
            WatchService watcher = FileSystems.getDefault().newWatchService();
            Path directory = Paths.get("Backend");
            directory.register(watcher, ENTRY_CREATE, ENTRY_MODIFY, ENTRY_DELETE);
            while (true) {
                WatchKey key = watcher.take();
                List<WatchEvent<?>> events = key.pollEvents();
                for (WatchEvent<?> event : events) {
                    if (event.kind() == ENTRY_MODIFY) {
                        Path modifiedFile = (Path) event.context();
                        System.out.println("File modified: " + modifiedFile);
                        FileReader reader = new FileReader("Backend" + File.separator + modifiedFile.toFile());
                        BufferedReader bufferedReader = new BufferedReader(reader);
                        String line;
                        List<String> inputs = new ArrayList<>();
                        while ((line = bufferedReader.readLine()) != null) {
                            inputs.add(line);
                        }
                        String message = null;
                        String category = null;
                        String diagnostic = null;
                        if(!inputs.isEmpty()) {
                            message = inputs.get(0);
                            if (inputs.size() > 1) {
                                category = inputs.get(1);
                                if (message.equalsIgnoreCase("Exit") && inputs.size() > 2) {
                                    diagnostic = inputs.get(2);
                                }
                            }
                        }
                        System.out.println(message);
                        System.out.println(category);
                        System.out.println(diagnostic);
                        bufferedReader.close();
                        return new Message(message);
                    }
                }
                key.reset();
            }
        }
        catch (IOException | InterruptedException e){
            e.printStackTrace();
            return null;
        }
        //medbuddyComUtoG
        //receive message
        //check for diagnosis
        //  if diagnosis, then create a MedicalHistoryEntry
    }

    public static void sendMessageToMedbuddy(String messageToBeSent, UUID userId) {
        //send message
        try {
            File inputFile = new File("Backend" + File.separator + "medbuddyComGtoU.txt");
            FileWriter writer = new FileWriter(inputFile);
            writer.write(messageToBeSent);
            writer.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

}