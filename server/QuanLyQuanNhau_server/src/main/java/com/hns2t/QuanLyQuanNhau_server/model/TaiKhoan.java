package com.hns2t.QuanLyQuanNhau_server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "taikhoan")
public class TaiKhoan {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long tk_id;
	private String tk_tendangnhap;
	private Double tk_matkhau;
	private PhanQuyen tk_phanquyen;
	
	@OneToOne(mappedBy = "taiKhoan")
	private NhanVien tk_nhanVien;
	
	public TaiKhoan() {
		super();
	}
	
	
}
