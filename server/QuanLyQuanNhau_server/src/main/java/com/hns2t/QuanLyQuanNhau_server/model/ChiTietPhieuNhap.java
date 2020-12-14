package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "ctpn")
public class ChiTietPhieuNhap {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ctpn_id; 
	private Double ctpn_soluong;
	private Double ctpn_gia;



	public ChiTietPhieuNhap() {
		super();
	}
	
	
}
