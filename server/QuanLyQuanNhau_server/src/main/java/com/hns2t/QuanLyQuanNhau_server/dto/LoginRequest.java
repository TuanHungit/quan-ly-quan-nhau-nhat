package com.hns2t.QuanLyQuanNhau_server.dto;

public class LoginRequest {
	private String tk_tendangnhap;
	private String tk_matkhau;
	public LoginRequest(String tk_tendangnhap, String tk_matkhau) {
		super();
		this.tk_tendangnhap = tk_tendangnhap;
		this.tk_matkhau = tk_matkhau;
	}
	public String getTk_tendangnhap() {
		return tk_tendangnhap;
	}
	public void setTk_tendangnhap(String tk_tendangnhap) {
		this.tk_tendangnhap = tk_tendangnhap;
	}
	public String getTk_matkhau() {
		return tk_matkhau;
	}
	public void setTk_matkhau(String tk_matkhau) {
		this.tk_matkhau = tk_matkhau;
	}
	  
}
