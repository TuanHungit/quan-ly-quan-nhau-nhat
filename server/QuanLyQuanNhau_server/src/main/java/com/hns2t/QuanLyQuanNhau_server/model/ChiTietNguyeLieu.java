package com.hns2t.QuanLyQuanNhau_server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ctnl")
public class ChiTietNguyeLieu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ctnl_id; 
	private String ctnl_mota;
	public ChiTietNguyeLieu() {
		super();
	}
	
}
