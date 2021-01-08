package com.hns2t.QuanLyQuanNhau_server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hns2t.QuanLyQuanNhau_server.dao.TaiKhoanRepository;
import com.hns2t.QuanLyQuanNhau_server.exception.ResourceNotFoundException;
import com.hns2t.QuanLyQuanNhau_server.model.HoaDon;
import com.hns2t.QuanLyQuanNhau_server.model.LoaiMonAn;
import com.hns2t.QuanLyQuanNhau_server.model.TaiKhoan;
import com.hns2t.QuanLyQuanNhau_server.service.HoaDonService;
import com.hns2t.QuanLyQuanNhau_server.service.LoaiMonAnService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/taikhoans")
public class TaiKhoanController {
	@Autowired
	private TaiKhoanRepository repo;
	@GetMapping("")
	public List<TaiKhoan> getAll(){		
		return repo.findAll();
	}
	@GetMapping("/{tk_tendangnhap}")
	public ResponseEntity<TaiKhoan> getTaiKhoan(@PathVariable String tk_tendangnhap){
		TaiKhoan taiKhoan=repo.findByTenDangNhap(tk_tendangnhap);		
		return ResponseEntity.ok(taiKhoan);
	}
	

}
