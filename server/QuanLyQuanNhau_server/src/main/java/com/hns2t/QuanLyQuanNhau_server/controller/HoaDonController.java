package com.hns2t.QuanLyQuanNhau_server.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.server.PathParam;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.ser.BeanPropertyWriter;
import com.hns2t.QuanLyQuanNhau_server.dao.BanRepository;
import com.hns2t.QuanLyQuanNhau_server.dao.ChiTietHoaDonRepository;
import com.hns2t.QuanLyQuanNhau_server.dao.HoaDonRepository;
import com.hns2t.QuanLyQuanNhau_server.dao.MonAnRepository;
import com.hns2t.QuanLyQuanNhau_server.dao.NhanVienRepository;
import com.hns2t.QuanLyQuanNhau_server.exception.ResourceNotFoundException;
import com.hns2t.QuanLyQuanNhau_server.model.Ban;
import com.hns2t.QuanLyQuanNhau_server.model.ChiTietHoaDon;
import com.hns2t.QuanLyQuanNhau_server.model.HoaDon;
import com.hns2t.QuanLyQuanNhau_server.model.MonAn;
import com.hns2t.QuanLyQuanNhau_server.model.TrangThaiBan;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/hoadons")
public class HoaDonController {
	
	@Autowired
	private HoaDonRepository repo;
	
	@Autowired
	private NhanVienRepository nhanVienRepo;
	
	@Autowired
	private BanRepository banRepo;
	 
	@Autowired
	private MonAnRepository monAnRepo;

	@Autowired
	private ChiTietHoaDonRepository cthdRepo;

	
	@GetMapping("")
	public List<HoaDon> getAll(){
		return repo.findAll();
	}
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(value = "")
	public ResponseEntity<HoaDon> createHoaDon(@RequestBody  String inputJson) {
		JSONParser parser = new JSONParser();
		HoaDon hoaDon = new HoaDon();
		try {
			JSONObject json = (JSONObject) parser.parse(inputJson);
			Long ban_id =(long) json.get("ban_id");
			Ban object = banRepo.findById(ban_id)
					.orElseThrow(() -> new ResourceNotFoundException("Ban khong ton tai with: " + ban_id));
			hoaDon.setBan(object);
		
			hoaDon.setHd_ngaythanhtoan(new Date());
			repo.save(hoaDon);
			List<JSONObject> listMonans = (ArrayList<JSONObject>)json.get("monans");
			for (JSONObject monan : listMonans) {
				ChiTietHoaDon chiTietHoaDon  = new ChiTietHoaDon();
				Long id = (long) monan.get("id");
				MonAn monAn = monAnRepo.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("Mon an khong ton tai with: " + id));
				int soLuong = Integer.parseInt(monan.get("amount").toString());
				double gia = Double.parseDouble(monan.get("price").toString());
				chiTietHoaDon.setMonAn(monAn);
				chiTietHoaDon.setCthd_soluong(soLuong);
				chiTietHoaDon.setCthd_gia(gia);
				chiTietHoaDon.setHoaDon(hoaDon);
				cthdRepo.save(chiTietHoaDon);
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ResponseEntity<>(hoaDon, HttpStatus.OK);
	}
//	@ResponseStatus(HttpStatus.CREATED)
//	@PostMapping("{id}/cthd")
//	public HoaDon createChiTietHoaDon(@PathVariable(value = "id") Long id, @RequestBody List<ChiTietHoaDon> chiTietHoaDons) {
//		HoaDon hoaDon = repo.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
//		
//		for (ChiTietHoaDon chiTietHoaDon : chiTietHoaDons) {
//			chiTietHoaDon.setHoaDon(hoaDon);
//			chiTietHoaDon.setMonAn(chiTietHoaDon.getMonAn());
//			hoaDon.getChiTietHoaDons().add(chiTietHoaDon);
//			repo.save(hoaDon);
//		}
//		return repo.save(hoaDon);
//	}
//	
//	@GetMapping("/cthd")
//	public List<ChiTietHoaDon> getAllChiTietHoaDons(){
//		return cthdRepo.findAll();
//	}
//	
//	@GetMapping("/{id}")
//	public ResponseEntity<HoaDon> getHoaDon(@PathVariable Long id){
//		HoaDon object = repo.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
//		return ResponseEntity.ok(object);
//	}
//	
//	@PutMapping("/{id}")
//	public ResponseEntity<HoaDon> updateHoaDon(@PathVariable(value = "id") Long id, @RequestBody HoaDon hoaDonDetail, @PathParam(value = "ban") Long ban){
//		HoaDon object =repo.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
//		object.setHd_ngaythanhtoan(hoaDonDetail.getHd_ngaythanhtoan());
//		object.setHd_tongtien(hoaDonDetail.getHd_tongtien());
//		object.setHd_trangthai(hoaDonDetail.getHd_trangthai());
//		HoaDon hoaDon = repo.save(object);
//		return ResponseEntity.ok(hoaDon);
//	}
//	
//	@DeleteMapping("/{id}")
//	public ResponseEntity<Map<String, Boolean>> deleteHoaDon(@PathVariable Long id){
//		HoaDon hoaDon = repo.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
//		repo.delete(hoaDon);
//		Map<String, Boolean> response = new HashMap<>();
//		response.put("deleted", Boolean.TRUE);
//		return ResponseEntity.ok(response);
//	}
//	
}
