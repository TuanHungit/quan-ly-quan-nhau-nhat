package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "nhacungcap")
public class NhaCungCap {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ncc_id; 
	private String ncc_name;
	private String ncc_sdt;
	private String ncc_email;
	private Double ncc_tongmua;
	
	@OneToMany(mappedBy = "nhaCungCap")
	private List<NguyenLieu> nguyenLieus;
	
	public NhaCungCap() {
		super();
	}
	
	
}
