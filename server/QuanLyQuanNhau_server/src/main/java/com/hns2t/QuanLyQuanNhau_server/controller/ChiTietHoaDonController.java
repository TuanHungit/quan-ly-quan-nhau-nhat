package com.hns2t.QuanLyQuanNhau_server.controller;

import static org.hamcrest.CoreMatchers.nullValue;

import java.util.HashMap;
import java.util.Map;

import org.aspectj.weaver.patterns.IfPointcut.IfFalsePointcut;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PutMapping("")
	public ChiTietHoaDon updateChiTietHoaDon(@RequestBody JSONObject chiTietHoaDons) {
		Long monAnId = Long.parseLong(chiTietHoaDons.get("monan").toString());
		Long hoaDonId = Long.parseLong(chiTietHoaDons.get("hoadon").toString());
		Integer amount = Integer.parseInt(chiTietHoaDons.get("amount").toString());

		ChiTietHoaDon cthd = repo.findByHdidAndMaid(monAnId, hoaDonId);
		if(cthd != null) {
			cthd.setCthd_soluong(amount);
			return repo.save(cthd);
		}
		return null;
	}
	
	
	@DeleteMapping("")
	public ResponseEntity<Map<String, Boolean>> deleteCTHD(@RequestBody JSONObject jsonObject){
		Long monAnId = Long.parseLong(jsonObject.get("monan").toString());
		Long hoaDonId = Long.parseLong(jsonObject.get("hoadon").toString());

		ChiTietHoaDon cthd = repo.findByHdidAndMaid(monAnId, hoaDonId);
		Map<String, Boolean> response = new HashMap<>();
		if(cthd != null) {
			repo.delete(cthd);
			response.put("deleted", Boolean.TRUE);
			
		}
		else {
			response.put("deleted", Boolean.FALSE);
		}
		return ResponseEntity.ok(response);
	}

}
