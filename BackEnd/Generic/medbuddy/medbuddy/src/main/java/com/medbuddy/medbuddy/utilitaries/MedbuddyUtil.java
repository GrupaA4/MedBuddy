package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.models.Message;
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