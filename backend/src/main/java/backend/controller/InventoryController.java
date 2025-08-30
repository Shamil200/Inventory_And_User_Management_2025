package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.InventoryModel;
import backend.repository.InventoryRepository;
import org.apache.tomcat.util.http.fileupload.UploadContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.multipart.MultipartFile;



import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystem;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    //post Data
    @PostMapping("/inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventoryModel) {
        return inventoryRepository.save(newInventoryModel);
    }

    //Image Insert Part
    @PostMapping("/inventory/itemImage")
    public String itemImage(@RequestParam("file") MultipartFile file) {
        String folder = "src/main/upload/";
        String itemImage = file.getOriginalFilename();

        try {
            File uploadDir = new File(folder);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            file.transferTo(Paths.get(folder + itemImage));
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file:" + itemImage;
        }
        return itemImage;
    }

    //Get
    @GetMapping("/inventory")
    List<InventoryModel> getAllItems() {
        return inventoryRepository.findAll();
    }

    @GetMapping("/inventory/{id}")
    InventoryModel getItemId(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElseThrow(() -> new InventoryNotFoundException(id));
    }

    private final String UPLOAD_DIR = "src/main/upload/";

    @GetMapping("/upload/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename) {
        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }


    @DeleteMapping("/inventory/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {
        InventoryModel inventoryItem = inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));

        String itemImage = inventoryItem.getItemImage();
        if (itemImage != null && !itemImage.isEmpty()) {
            File imageFile = new File(UPLOAD_DIR + itemImage);
            if (imageFile.exists()) {
                if (imageFile.delete()) {
                    System.out.println("Image Deleted");
                } else {
                    System.out.println("Failed to delete image");
                }
            }
        }

        inventoryRepository.deleteById(id);

        return ResponseEntity.ok("Data with id " + id + " and image deleted");
    }

    @PutMapping("/inventory/{id}")
    public InventoryModel updateItem(
            @RequestPart(value = "itemDetails") String itemDetails,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable Long id
    ) {
        System.out.println("Item Details: " + itemDetails);
        if (file != null && !file.isEmpty()) {
            System.out.println("File received: " + file.getOriginalFilename());
        } else {
            System.out.println("No file uploaded");
        }

        ObjectMapper mapper = new ObjectMapper();
        InventoryModel newInventory;
        try {
            newInventory = mapper.readValue(itemDetails, InventoryModel.class);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing itemDetails", e);
        }

        return inventoryRepository.findById(id).map(existingInventory -> {
            existingInventory.setItemId(newInventory.getItemId());
            existingInventory.setItemName(newInventory.getItemName());
            existingInventory.setItemCategory(newInventory.getItemCategory());
            existingInventory.setItemQty(newInventory.getItemQty());
            existingInventory.setItemDetails(newInventory.getItemDetails());

            if (file != null && !file.isEmpty()) {
                String folder = "src/main/upload/";
                String itemImage = file.getOriginalFilename();
                try {
                    file.transferTo(Paths.get(folder + itemImage));
                    existingInventory.setItemImage(itemImage);
                } catch (IOException e) {
                    throw new RuntimeException("Error saving uploaded file", e);
                }
            }
            return inventoryRepository.save(existingInventory);
        }).orElseThrow(() -> new InventoryNotFoundException(id));
    }
}