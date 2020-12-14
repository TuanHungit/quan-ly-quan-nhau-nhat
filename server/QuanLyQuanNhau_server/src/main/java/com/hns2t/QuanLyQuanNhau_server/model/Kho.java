package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "kho")
public class Kho {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long k_id;
	private String k_vitri;
	
	@OneToMany(mappedBy = "kho")
	private List<NguyenLieu> nguyenLieus;
	
	
	
	public Kho() {
		super();
	}
	
	
}	
