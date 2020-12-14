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

	public Long getLma_id() {
		return lma_id;
	}

	public void setLma_id(Long lma_id) {
		this.lma_id = lma_id;
	}

	public String getLma_ten() {
		return lma_ten;
	}

	public void setLma_ten(String lma_ten) {
		this.lma_ten = lma_ten;
	}

	public List<MonAn> getMonans() {
		return monans;
	}

	public void setMonans(List<MonAn> monans) {
		this.monans = monans;
	}
	
	
	
	
}
