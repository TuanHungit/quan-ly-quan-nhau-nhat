package com.hns2t.QuanLyQuanNhau_server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hns2t.QuanLyQuanNhau_server.dao.HoaDonRepository;
import com.hns2t.QuanLyQuanNhau_server.exception.ResourceNotFoundException;
import com.hns2t.QuanLyQuanNhau_server.model.HoaDon;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/hoadons")
public class HoaDonController {
	
	@Autowired
	private HoaDonRepository repo;

	
	@GetMapping("")
	public List<HoaDon> getAll(){
		return repo.findAll();
	}
	
	@PostMapping("")
	public HoaDon createHoaDon(@RequestBody HoaDon hoaDon) {
		return repo.save(hoaDon);
	}

	
	@GetMapping("/{id}")
	public ResponseEntity<HoaDon> getHoaDon(@PathVariable Long id){
		HoaDon object = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
		return ResponseEntity.ok(object);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<HoaDon> updateHoaDon(@PathVariable Long id, @RequestBody HoaDon hoaDonDetail){
		HoaDon object =repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
//		object.setB_soghe(banDetail.getB_soghe());
//		object.setB_stt(banDetail.getB_stt());
//		object.setB_trangthai(banDetail.getB_trangthai());
		HoaDon hoaDon = repo.save(object);
		return ResponseEntity.ok(hoaDon);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteHoaDon(@PathVariable Long id){
		HoaDon hoaDon = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
		repo.delete(hoaDon);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
