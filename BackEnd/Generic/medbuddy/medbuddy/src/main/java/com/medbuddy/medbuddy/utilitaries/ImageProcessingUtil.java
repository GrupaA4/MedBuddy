package com.medbuddy.medbuddy.utilitaries;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageProcessingUtil {
    public static void saveImage(MultipartFile imageFile, String directory) throws IOException {
        //byte[] imageBytes = imageFile.getBytes();
        String filename = imageFile.getOriginalFilename();
        if(filename != null) {
            int indexOfDot = filename.lastIndexOf('.');
            if (indexOfDot != -1) {
                String extension = filename.substring(indexOfDot + 1);
                if (extension.equals("jpg") || extension.equals("jpeg") || extension.equals("png")) {
                    Path path = Paths.get(directory + "/" + filename);
                }
            }
        }
    }
}
