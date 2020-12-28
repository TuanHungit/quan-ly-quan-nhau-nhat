package com.hns2t.QuanLyQuanNhau_server.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class LoadImageController {
	@Value( "${file.upload-dir}" )
	private String UPLOADED_FOLDER;
	@Autowired
	private ServletContext servletContext;
	
	@PostMapping({"/upload"}) 
	public String save(@RequestParam("file") MultipartFile file) {  
		if (file.isEmpty()) {
			return("Please select a file to upload");
		}
		try {
			byte[] bytes = file.getBytes();
		
			Path path = Paths.get(UPLOADED_FOLDER +  file.getOriginalFilename());
			Files.write(path, bytes);
		} catch (IOException e) {
			e.printStackTrace();			
		}
		
		return "OK";
	}
	@GetMapping("/storefiles/{fileName:.+}")
	public void downloadFile(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("fileName") String fileName) {
		String dataDirectory = UPLOADED_FOLDER;
		Path file = Paths.get(servletContext.getRealPath("/WEB-INF/image/").toString(), fileName);
		System.out.println("Download file");
		if (Files.exists(file)) {
			// response.setContentType("application/txt");
			response.addHeader("Content-Disposition", "attachment; filename=" + fileName);
			try {
				Files.copy(file, response.getOutputStream());
				response.getOutputStream().flush();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}

	}
}