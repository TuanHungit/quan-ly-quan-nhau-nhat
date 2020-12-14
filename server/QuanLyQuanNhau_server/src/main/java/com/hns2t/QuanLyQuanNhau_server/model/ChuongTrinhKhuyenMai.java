package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "ctkm")
public class ChuongTrinhKhuyenMai {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ctkm_id;
	private String ctkm_ten;
	private Double ctkm_discount;
	private Date ctkm_ngaybatdau;
	private Date ctkm_ngayketthuc;
	private String ctkm_dieukien;
	
	@OneToMany(mappedBy = "chuongTrinhKhuyenMai")
	private List<HoaDon> hoandons;

	public ChuongTrinhKhuyenMai() {
		super();
	}
	
	
}
