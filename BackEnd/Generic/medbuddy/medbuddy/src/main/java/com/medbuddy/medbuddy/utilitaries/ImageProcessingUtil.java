package com.medbuddy.medbuddy.utilitaries;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

//This is all untested as I currently can not access the application
public class ImageProcessingUtil {
    /**
     * Saves an image with the provided number into the database
     * @param imageNumber the image number
     * @param directory the directory in which to save the image
     * @param imageFile the image file received
     * @throws IOException
     */
    public static void saveImage(int imageNumber, String directory, MultipartFile imageFile) throws IOException {
        String extension  = getFileExtension(imageFile);
        File image = new File(directory + File.separator + "image" + imageNumber + "." + extension);
        FileOutputStream outputStream = new FileOutputStream(image);
        outputStream.write(imageFile.getBytes());
        outputStream.close();
    }
    /**
     * Gets the byte data of an image with the corresponding image number and file extension, from the specified directory
     * @param imageNumber the number corresponding to the image
     * @param fileExtension the file extension
     * @param directory the directory from which the data is extracted
     * @return the byte data of the specified image in Base64
     * @throws IOException
     */
    public static byte[] extractImage(int imageNumber, String fileExtension, String directory) throws IOException {
        String imagePath = directory + "/image" + imageNumber + "." + fileExtension;
        File imageFile = new File(imagePath);
        FileInputStream inputStream = new FileInputStream(imageFile);
        byte[] imageData = new byte[(int) imageFile.length()];
        inputStream.read(imageData);
        inputStream.close();
        //No clue how frontend receives it
        byte[] encodedImageData = Base64.getEncoder().encode(imageData);
        return encodedImageData;
    }
    public static String getFileExtension(MultipartFile multipartFile) {
        String fileName = multipartFile.getOriginalFilename();
        if (fileName != null && fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") < fileName.length() - 1) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        }
        return "";
    }
}
