package com.hns2t.QuanLyQuanNhau_server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hns2t.QuanLyQuanNhau_server.dao.ChiTietHoaDonRepository;
import com.hns2t.QuanLyQuanNhau_server.exception.ResourceNotFoundException;
import com.hns2t.QuanLyQuanNhau_server.model.ChiTietHoaDon;
import com.hns2t.QuanLyQuanNhau_server.model.HoaDon;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/cthds")
public class ChiTietHoaDonController {

	@Autowired
	private ChiTietHoaDonRepository repo;
	
	@DeleteMapping("{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCTHD(@PathVariable Long id){
		ChiTietHoaDon cthd = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Chi tiet hoa don khong ton tai with: " + id));
		repo.delete(cthd);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
