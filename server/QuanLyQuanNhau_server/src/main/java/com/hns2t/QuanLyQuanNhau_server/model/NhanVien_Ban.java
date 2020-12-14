package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "nhanvien_ban")
public class NhanVien_Ban {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long nvb_id;
	private Date nvb_thoigian;
	public NhanVien_Ban() {
		super();
	}
	
}
