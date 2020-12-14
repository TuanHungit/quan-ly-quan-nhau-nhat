package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "phieuxuat")
public class PhieuXuat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long px_id; 
	private Date px_thoigian;
	
	@ManyToMany(mappedBy = "phieuXuats")
	private List<NguyenLieu> nguyenLieus;
	
	@ManyToOne
	@JoinColumn(name = "px_nvid")
	private NhanVien nhanvien;
	
	public PhieuXuat() {
		super();
	} 
	
	
	
	
}
