package com.hns2t.QuanLyQuanNhau_server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;
import com.hns2t.QuanLyQuanNhau_server.dao.BanRepository;
import com.hns2t.QuanLyQuanNhau_server.exception.ResourceNotFoundException;
import com.hns2t.QuanLyQuanNhau_server.model.Ban;
import com.hns2t.QuanLyQuanNhau_server.model.TrangThaiBan;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/bans")
public class BanController {
	@Autowired
	private BanRepository repo;

	@GetMapping("")
	public List<Ban> getAll() {
		return repo.findAll();
	}

	@PostMapping("")
	public Ban createBan(@RequestBody Ban ban) {
		return repo.save(ban);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Ban> getBan(@PathVariable Long id) {
		Ban object = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ban khong ton tai with: " + id));
		return ResponseEntity.ok(object);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Ban> updateBan(@PathVariable Long id, @RequestBody Ban banDetail) {
		Ban object = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ban khong ton tai with: " + id));
		if (banDetail.getB_soghe() != null) {
			object.setB_stt(banDetail.getB_stt());
			object.setB_soghe(banDetail.getB_soghe());
		}
		if (banDetail.getB_stt() != null) {
			object.setB_stt(banDetail.getB_stt());
		}
		object.setB_trangthai(banDetail.getB_trangthai());

		Ban ban = repo.save(object);
		return ResponseEntity.ok(ban);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteBan(@PathVariable Long id) {
		Ban ban = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Ban khong ton tai with: " + id));
		repo.delete(ban);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

//	@PutMapping("/{id}" )
//	public ResponseEntity<Ban> updateBan(@PathVariable Long id, @RequestBody String trangThaiBan){
//		Ban object =repo.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Ban khong ton tai with: " + id));
////		if(banDetail.getB_soghe()!= null) {
////			object.setB_soghe(banDetail.getB_soghe());
////		}
////		if(banDetail.getB_stt()!=null) {
////			object.setB_stt(banDetail.getB_stt());
////		}
//			
//		TrangThaiBan newTrangThaiBan = (TrangThaiBan)trangThaiBan.toString();
//		
//		object.setB_trangthai();
//
//		Ban ban = repo.save(object);
//		return ResponseEntity.ok(ban);
//	}

}
