package com.hns2t.QuanLyQuanNhau_server.controller;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.Unauthorized;

import javax.validation.Valid;

import com.hns2t.QuanLyQuanNhau_server.dao.TaiKhoanRepository;
import com.hns2t.QuanLyQuanNhau_server.dto.LoginRequest;
import com.hns2t.QuanLyQuanNhau_server.dto.LoginResponse;
import com.hns2t.QuanLyQuanNhau_server.exception.ResourceNotFoundException;
import com.hns2t.QuanLyQuanNhau_server.model.HoaDon;
import com.hns2t.QuanLyQuanNhau_server.model.LoaiMonAn;
import com.hns2t.QuanLyQuanNhau_server.model.TaiKhoan;
import com.hns2t.QuanLyQuanNhau_server.service.HoaDonService;
import com.hns2t.QuanLyQuanNhau_server.service.LoaiMonAnService;
//import com.hns2t.QuanLyQuanNhau_server.service.TaiKhoanService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/taikhoans")
public class TaiKhoanController {
	
	@Autowired
	private TaiKhoanRepository repo;
	
	@GetMapping("")
	public List<TaiKhoan> getAll() {
		return repo.findAll();
	}
	@PostMapping("/login")
	public LoginResponse login(@RequestBody LoginRequest loginRequest) {
		LoginResponse loginResponse = new LoginResponse();
		TaiKhoan taiKhoan=repo.findByTenTaiKhoan(loginRequest.getUsername());
		if (taiKhoan!=null) {
			if (taiKhoan.getTk_matkhau().equals(loginRequest.getPassword())) {
				String token = getJWTToken(taiKhoan.getTk_tendangnhap());
				loginResponse.setTk_tendangnhap(taiKhoan.getTk_tendangnhap());
				loginResponse.setToken(token);
				loginResponse.setCode(0);
				loginResponse.setMessage("Login success!");
			}	
			else {
				loginResponse.setCode(422);
				loginResponse.setMessage("Invalid password supplied!");
			}
		}
		else {
			loginResponse.setCode(404);
			loginResponse.setMessage("The username doesn't exist!");
		}	
		return loginResponse;	
	}
	private String getJWTToken(String username) {
		String secretKey = "mySecretKey";
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils
				.commaSeparatedStringToAuthorityList("ROLE_USER");
		String token = Jwts
				.builder()
				.setId("softtekJWT")
				.setSubject(username)
				.claim("authorities",
						grantedAuthorities.stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*24))
				.signWith(SignatureAlgorithm.HS512,
						secretKey.getBytes()).compact();
		return "Bearer " + token;

	
	}
	
}
