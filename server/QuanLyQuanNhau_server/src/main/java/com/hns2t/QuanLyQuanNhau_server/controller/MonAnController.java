package com.hns2t.QuanLyQuanNhau_server.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.jasper.tagplugins.jstl.core.If;
import org.junit.experimental.theories.FromDataPoints;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import com.hns2t.QuanLyQuanNhau_server.dao.MonAnRepository;
import com.hns2t.QuanLyQuanNhau_server.exception.ResourceNotFoundException;
import com.hns2t.QuanLyQuanNhau_server.model.LoaiMonAn;
import com.hns2t.QuanLyQuanNhau_server.model.MonAn;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/monans")
public class MonAnController {
	@Autowired
	private MonAnRepository repo;
	@Autowired
	private ServletContext servletContext;
	
	@GetMapping("")
	public List<MonAn> getAll(){
		return repo.findAll();
	}
	
//	@PostMapping("")
//	public MonAn createMonAn(@RequestBody MonAn monAn) {
//		return repo.save(monAn);
//	}
	
	@PostMapping("")
	public MonAn createMonAn(@RequestParam("ma_ten") String ma_ten,@RequestParam("ma_giavon") Double ma_giavon,
			@RequestParam("ma_giaban") Double ma_giaban,@RequestParam("ma_donvitinh") String ma_donvitinh,
			@RequestParam("ma_hinhanh") MultipartFile image,
			@RequestParam("ma_motachitiet") String ma_motachitiet,
			@RequestParam("ma_lmaid") LoaiMonAn loaiMonAn) throws IOException {
		MonAn monAn=new MonAn();
		monAn.ma_ten=ma_ten;
		monAn.ma_giavon=ma_giavon;
		monAn.ma_giaban=ma_giaban;
		monAn.ma_donvitinh=ma_donvitinh;
		monAn.ma_hinhanh="";
		monAn.setLoaiMonAn(loaiMonAn);
		if (!image.isEmpty()) {
			monAn=repo.save(monAn);
			byte[] bytes = image.getBytes();
			Path path= Paths.get(servletContext.getRealPath("/WEB-INF/image/").toString()+monAn.getMa_id() +"_"+ image.getOriginalFilename());
			Files.write(path, bytes);
			monAn.ma_hinhanh= monAn.getMa_id() +"_"+ image.getOriginalFilename();
		}
		monAn.ma_motachitiet=ma_motachitiet;
		monAn=repo.save(monAn);
		return monAn;
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<MonAn> getMonAn(@PathVariable Long id){
		MonAn object = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mon an khong ton tai with: " + id));
		return ResponseEntity.ok(object);
	}
	
	@PutMapping("/{id}")
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
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteMonAn(@PathVariable Long id){
		MonAn monAn = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mon an khong ton tai with: " + id));
		repo.delete(monAn);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	

}
