package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "loainhanvien")
public class LoaiNhanVien {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long lnv_id;
	private String lnv_hoten;
	private Double lnv_luong;
	
	@OneToMany(mappedBy = "loaiNhanVien")
	private List<NhanVien> nhanViens;
	
	public LoaiNhanVien() {
		super();
	}
	
	
	
}
