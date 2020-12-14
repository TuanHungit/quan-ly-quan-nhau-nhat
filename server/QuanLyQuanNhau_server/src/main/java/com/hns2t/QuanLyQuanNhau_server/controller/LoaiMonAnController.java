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

import com.hns2t.QuanLyQuanNhau_server.dao.LoaiMonAnRepository;
import com.hns2t.QuanLyQuanNhau_server.exception.ResourceNotFoundException;
import com.hns2t.QuanLyQuanNhau_server.model.LoaiMonAn;
import com.hns2t.QuanLyQuanNhau_server.model.MonAn;
import com.hns2t.QuanLyQuanNhau_server.service.LoaiMonAnService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/")
public class LoaiMonAnController {
//	@Autowired
//	private LoaiMonAnService service;
	@Autowired
	private LoaiMonAnRepository repo;
	
	@GetMapping("/loaimonans")
	public List<LoaiMonAn> getAll(){
		return repo.findAll();
	}
	
	@PostMapping("/loaimonans")
	public LoaiMonAn createLoaiMonAn(@RequestBody LoaiMonAn loaiMonAn) {
		return repo.save(loaiMonAn);
	}

	
	@GetMapping("/loaimonans/{id}")
	public ResponseEntity<LoaiMonAn> getLoaiMonAn(@PathVariable Long id){
		LoaiMonAn object = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Loai mon an khong ton tai with: " + id));
		return ResponseEntity.ok(object);
	}
	
	@PutMapping("/loaimonans/{id}")
	public ResponseEntity<LoaiMonAn> updateLoaiMonAn(@PathVariable Long id, @RequestBody LoaiMonAn loaiMonAnDetail){
		LoaiMonAn object =repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Loai mon an khong ton tai with: " + id));
		object.setLma_ten(loaiMonAnDetail.getLma_ten());
		LoaiMonAn updateLoaiMonAn = repo.save(object);
		return ResponseEntity.ok(updateLoaiMonAn);
	}
	
	@DeleteMapping("/loaimonans/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteLoaiMonAn(@PathVariable Long id){
		LoaiMonAn loaiMonAn = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Loai mon an khong ton tai with: " + id));
		repo.delete(loaiMonAn);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/loaimonans/{id}/monans")
	public ResponseEntity<List<MonAn>> getListMonAnOfLoaiMonAn(@PathVariable Long id){
		LoaiMonAn object = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Loai mon an khong ton tai with: " + id));
		List<MonAn> listMonAns = object.getMonans();
		System.out.println(listMonAns.toString());
		return ResponseEntity.ok(listMonAns);
		
	}
}








