package com.hns2t.QuanLyQuanNhau_server.controller;

import static org.hamcrest.CoreMatchers.nullValue;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
import com.hns2t.QuanLyQuanNhau_server.model.NhanVien;
import com.hns2t.QuanLyQuanNhau_server.model.StatusHoaDon;
import com.hns2t.QuanLyQuanNhau_server.service.PusherService;
import com.pusher.rest.Pusher;
import com.sun.xml.bind.v2.schemagen.xmlschema.Any;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/hoadons")
public class HoaDonController {
	Pusher pusher = PusherService.getPusher();
	@Autowired
	private HoaDonRepository repo;
	@Autowired
	private ChiTietHoaDonRepository cthdrepo ;
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
	
	@GetMapping("/date")
	public List<HoaDon> getAllWithDate(@Param("fromDate") String fromDate){
		return repo.findAllWithDate(fromDate);
	}
	
	@GetMapping("/month")
	public List<HoaDon> getAllWithMonth(@Param("fromMonth") String fromMonth){
		return repo.findAllWithMonth(fromMonth);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<HoaDon> getHoaDon(@PathVariable Long id) {
		HoaDon object =repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
		return ResponseEntity.ok(object);
	}
	
	@GetMapping("/{id}/cthd")
	public ResponseEntity<?> getChiTietHoaDon(@PathVariable Long id) {
		HoaDon object =repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
		Object objects = repo.findListChiTietHoaDonById(id);
		return ResponseEntity.ok(objects);
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(value = "")
	public ResponseEntity<HoaDon> createHoaDon(@RequestBody  String inputJson) {
		JSONParser parser = new JSONParser();
		HoaDon hoaDon = new HoaDon();
		try {
			JSONObject json = (JSONObject) parser.parse(inputJson);
			Long ban_id =Long.parseLong(json.get("ban_id").toString());
			if(json.get("hd_tongtien") != null) {
				Double hd_tongtien = Double.parseDouble(json.get("hd_tongtien").toString());
				hoaDon.setHd_tongtien(hd_tongtien);
			}
	
			if(json.get("hd_nhanvienid") != null) {
				Long hd_nhanvienid = Long.parseLong(json.get("hd_nhanvienid").toString());		
				NhanVien objectNV = nhanVienRepo.findById(hd_nhanvienid)
						.orElseThrow(() -> new ResourceNotFoundException("Nhan vien khong ton tai with: " + hd_nhanvienid));
				hoaDon.setHd_nhanvien(objectNV);
			}
			Ban object = banRepo.findById(ban_id)
					.orElseThrow(() -> new ResourceNotFoundException("Ban khong ton tai with: " + ban_id));

			hoaDon.setBan(object);
			hoaDon.setHd_ngaythanhtoan(new Date());
			
			hoaDon.setHd_trangthai(StatusHoaDon.ChuaThanhToan);
			
			repo.save(hoaDon);
			List<JSONObject> listMonans = (ArrayList<JSONObject>)json.get("monans");		
			for (JSONObject monan : listMonans) {
				ChiTietHoaDon chiTietHoaDon  = new ChiTietHoaDon();
				Long id =Long.parseLong(monan.get("id").toString());
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

		
			pusher.trigger("my-channel", "notice", Collections.singletonMap("message",json));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ResponseEntity<>(hoaDon, HttpStatus.OK);
	}
	

	
	@PutMapping("/{id}")
	public ResponseEntity<HoaDon> updateHoaDon(@PathVariable(value = "id") Long id, @RequestBody HoaDon hoaDonDetail){
		HoaDon object =repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
		object.setHd_tongtien(hoaDonDetail.getHd_tongtien());
		object.setHd_trangthai(hoaDonDetail.getHd_trangthai());
		HoaDon hoaDon = repo.save(object);
		return ResponseEntity.ok(hoaDon);
	}
	
	@PutMapping("/{id}/thanhtoan")
	public ResponseEntity<HoaDon> thanhToanHoaDon(@PathVariable(value = "id") Long id){
		HoaDon object =repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
//		object.setHd_tongtien(hoaDonDetail.getHd_tongtien());
		object.setHd_trangthai(StatusHoaDon.ThanhToan);
		object.setHd_ngaythanhtoan(new Date());
		HoaDon hoaDon = repo.save(object);
		return ResponseEntity.ok(hoaDon);
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("{id}/cthd")
	public HoaDon createChiTietHoaDon(@PathVariable(value = "id") Long id, @RequestBody List<JSONObject> chiTietHoaDons) {
		HoaDon hoaDon = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
	
		for (JSONObject chiTietHoaDon : chiTietHoaDons) {
			ChiTietHoaDon chiTietHoaDon1  = new ChiTietHoaDon();
			Long monAnId = Long.parseLong(chiTietHoaDon.get("id").toString());
			MonAn monAn = monAnRepo.findById(monAnId)
					.orElseThrow(() -> new ResourceNotFoundException("Mon an khong ton tai with: " + id));
			chiTietHoaDon1.setMonAn(monAn);
			chiTietHoaDon1.setCthd_soluong(Integer.parseInt(chiTietHoaDon.get("amount").toString()));
			chiTietHoaDon1.setCthd_gia(Double.parseDouble(chiTietHoaDon.get("price").toString()));
			chiTietHoaDon1.setHoaDon(hoaDon);
			cthdRepo.saveAndFlush(chiTietHoaDon1);
			pusher.trigger("my-channel", "notice", Collections.singletonMap("message",chiTietHoaDon1));
		}
		
		return repo.save(hoaDon);
	}
	
	
	@GetMapping("bans/{id}")
	public Long getAllChiTietHoaDons(@PathVariable(value = "id") Long id){
		return repo.getIdByTable(id);
	}
	
	
	@DeleteMapping("{id}")
	public ResponseEntity<Map<String, Boolean>> deleteHoaDon(@PathVariable Long id){
		HoaDon hoaDon = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hoa Don khong ton tai with: " + id));
		repo.delete(hoaDon);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	

}
