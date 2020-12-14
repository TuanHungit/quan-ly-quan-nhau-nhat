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
@Table(name = "phieunhap")
public class PhieuNhap {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pn_id; 
	private Date pn_thoigian;
	private Double pn_tongtien;
	
	@ManyToMany(mappedBy = "phieuNhaps")
	private List<NguyenLieu> nguyenLieus;
	
	@ManyToOne
	@JoinColumn(name = "pn_nvid")
	private NhanVien nhanvien;
	
	public PhieuNhap() {
		super();
	}
	
	
}
