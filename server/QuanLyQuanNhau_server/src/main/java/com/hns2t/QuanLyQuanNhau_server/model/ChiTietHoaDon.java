package com.hns2t.QuanLyQuanNhau_server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "cthd")
public class ChiTietHoaDon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cthd_id; 
	private Double cthd_gia;
	private Integer cthd_soluong;
	
	@ManyToOne
	@JoinColumn(name ="cthd_hdid")
	private HoaDon hoaDon;
	
	@ManyToOne
	@JoinColumn(name = "cthd_monanid")
	private MonAn monAn;	

	public ChiTietHoaDon() {
		super();
	}
	
	
}
