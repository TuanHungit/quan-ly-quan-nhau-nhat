package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "loaimonan")
public class LoaiMonAn {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long lma_id; 
	private String lma_ten;
	
	@OneToMany(mappedBy = "loaiMonAn")
	private List<MonAn> monans;
	
	public LoaiMonAn() {
		super();
	}
	
	
}
