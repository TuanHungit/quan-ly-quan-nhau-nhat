package com.hns2t.QuanLyQuanNhau_server.dto;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpStatusCodeException;

public class LoginResponse {
	 private String tk_tendangnhap;
	 private long nv_id;
	 private String nv_ten;
	 private String token;
	 private int code;
	 private String message;
	public LoginResponse(String tk_tendangnhap, long nv_id, String nv_ten, String token, int code, String message) {
		super();
		this.tk_tendangnhap = tk_tendangnhap;
		this.nv_id = nv_id;
		this.nv_ten = nv_ten;
		this.token = token;
		this.code = code;
		this.message = message;
	}
	public LoginResponse() {
		super();
	}
	public String getTk_tendangnhap() {
		return tk_tendangnhap;
	}
	public void setTk_tendangnhap(String tk_tendangnhap) {
		this.tk_tendangnhap = tk_tendangnhap;
	}
	public long getNv_id() {
		return nv_id;
	}
	public void setNv_id(long nv_id) {
		this.nv_id = nv_id;
	}
	public String getNv_ten() {
		return nv_ten;
	}
	public void setNv_ten(String nv_ten) {
		this.nv_ten = nv_ten;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	 
	
}
