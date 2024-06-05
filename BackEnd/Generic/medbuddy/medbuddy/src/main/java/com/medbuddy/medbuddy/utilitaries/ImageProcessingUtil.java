package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.models.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Base64;

//This is all untested as I currently can not access the application
public class ImageProcessingUtil {
    /**
     * Saves an image with the provided number into the database
     *
     * @param imageNumber the image number
     * @param directory   the directory in which to save the image
     * @param imageFile   the image file received
     * @throws IOException
     */
    public static void saveImage(int imageNumber, String directory, byte[] imageFile, String imageExtension) {
        try {
            File image = new File(directory + File.separator + "image" + imageNumber + "." + imageExtension);
            image.createNewFile();
            FileOutputStream outputStream = new FileOutputStream(image);
            outputStream.write(imageFile);
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Gets the byte data of an image with the corresponding image number and file extension, from the specified directory
     *
     * @param imageNumber   the number corresponding to the image
     * @param fileExtension the file extension
     * @param directory     the directory from which the data is extracted
     * @return the byte data of the specified image in Base64
     * @throws IOException
     */
    public static String extractImage(int imageNumber, String fileExtension, String directory) {
        try {
            String imagePath = directory + File.separator + "image" + imageNumber + "." + fileExtension;
            File imageFile = new File(imagePath);
            FileInputStream inputStream = new FileInputStream(imageFile);
            byte[] imageData = new byte[(int) imageFile.length()];
            inputStream.read(imageData);
            inputStream.close();
            return Base64.getEncoder().encodeToString(imageData);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Boolean doesImageCorrespondToUser(byte[] newImageData, User user) {
        try{
            String imagePath = "src\\Database\\Profiles" + File.separator +"image" + user.getProfileImageNumber() + "." + user.getImageExtension();
            File imageFile = new File(imagePath);
            FileInputStream inputStream = new FileInputStream(imageFile);
            byte[] imageData = new byte[(int) imageFile.length()];
            inputStream.read(imageData);
            inputStream.close();
            return Arrays.equals(imageData, newImageData);
        } catch (IOException e)
        {
            e.printStackTrace();
            return null;
        }
    }

    public static byte[] getImageDataAsBytes(String imageData) {
        // Remove the "data:image/jpeg;base64," prefix if present
        if (imageData.startsWith("data:image/jpeg;base64,")) {
            return java.util.Base64.getDecoder().decode(imageData.substring(23));
        }
        return java.util.Base64.getDecoder().decode(imageData);
    }
}
