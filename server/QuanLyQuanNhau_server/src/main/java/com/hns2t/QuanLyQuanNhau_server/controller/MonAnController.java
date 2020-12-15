package com.hns2t.QuanLyQuanNhau_server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hns2t.QuanLyQuanNhau_server.dao.MonAnRepository;
import com.hns2t.QuanLyQuanNhau_server.exception.ResourceNotFoundException;
import com.hns2t.QuanLyQuanNhau_server.model.MonAn;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/")
public class MonAnController {
	@Autowired
	private MonAnRepository repo;
	
	@GetMapping("/monans")
	public List<MonAn> getAll(){
		return repo.findAll();
	}
	
	@PostMapping("/monans")
	public MonAn createMonAn(@RequestBody MonAn monAn) {
		return repo.save(monAn);
	}

	
	@GetMapping("/monans/{id}")
	public ResponseEntity<MonAn> getMonAn(@PathVariable Long id){
		MonAn object = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mon an khong ton tai with: " + id));
		return ResponseEntity.ok(object);
	}
	
	@PutMapping("/monans/{id}")
	public ResponseEntity<MonAn> updateMonAn(@PathVariable Long id, @RequestBody MonAn monAnDetail){
		MonAn object =repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mon an khong ton tai with: " + id));
		object.setMa_ten(monAnDetail.getMa_ten());
		object.setMa_giaban(monAnDetail.getMa_giaban());
		object.setMa_donvitinh(monAnDetail.getMa_donvitinh());
		object.setMa_giavon(monAnDetail.getMa_giavon());
		object.setMa_hinhanh(monAnDetail.getMa_hinhanh());
		object.setMa_motachitiet(monAnDetail.getMa_motachitiet());
		MonAn updateMonAn = repo.save(object);
		return ResponseEntity.ok(updateMonAn);
	}
	
	@DeleteMapping("/monans/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteMonAn(@PathVariable Long id){
		MonAn monAn = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mon an khong ton tai with: " + id));
		repo.delete(monAn);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	

}
