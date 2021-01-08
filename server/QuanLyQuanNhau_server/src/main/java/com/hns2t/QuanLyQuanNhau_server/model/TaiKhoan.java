package com.hns2t.QuanLyQuanNhau_server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "taikhoan")
public class TaiKhoan {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long tk_id;
	private String tk_tendangnhap;
	private String tk_matkhau;
	private PhanQuyen tk_phanquyen;
	
	@OneToOne(mappedBy = "taiKhoan")
	@JsonIgnore
	private NhanVien tk_nhanVien;
	
	public TaiKhoan() {
		super();
	}

	public TaiKhoan(long tk_id, String tk_tendangnhap, String tk_matkhau, PhanQuyen tk_phanquyen,
			NhanVien tk_nhanVien) {
		super();
		this.tk_id = tk_id;
		this.tk_tendangnhap = tk_tendangnhap;
		this.tk_matkhau = tk_matkhau;
		this.tk_phanquyen = tk_phanquyen;
		this.tk_nhanVien = tk_nhanVien;
	}
	

	public TaiKhoan(String tk_tendangnhap, String tk_matkhau, PhanQuyen tk_phanquyen, NhanVien tk_nhanVien) {
		super();
		this.tk_tendangnhap = tk_tendangnhap;
		this.tk_matkhau = tk_matkhau;
		this.tk_phanquyen = tk_phanquyen;
		this.tk_nhanVien = tk_nhanVien;
	}

	public TaiKhoan(TaiKhoan taiKhoan) {
		super();
	}

	public long getTk_id() {
		return tk_id;
	}

	public void setTk_id(long tk_id) {
		this.tk_id = tk_id;
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

	public PhanQuyen getTk_phanquyen() {
		return tk_phanquyen;
	}

	public void setTk_phanquyen(PhanQuyen tk_phanquyen) {
		this.tk_phanquyen = tk_phanquyen;
	}

	public NhanVien getTk_nhanVien() {
		return tk_nhanVien;
	}

	public void setTk_nhanVien(NhanVien tk_nhanVien) {
		this.tk_nhanVien = tk_nhanVien;
	}
	
	
}
