package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name = "nguyenlieu")
public class NguyenLieu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long nl_id; 
	private String nl_ten;
	private String nl_donvitinh;
	private Date nl_hansudung;
	private Integer nl_tonkho;
	
	@ManyToMany(mappedBy = "nguyenLieus")
	private List<MonAn> monAns;
	
	@ManyToOne
	@JoinColumn(name = "nl_nccid")
	private NhaCungCap nhaCungCap;
	
	@ManyToOne
	@JoinColumn(name = "nl_khoid")
	private Kho kho;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "ctpx",
				joinColumns = @JoinColumn(name = "nl_id", referencedColumnName = "nl_id"),
				inverseJoinColumns = @JoinColumn(name ="px_id", referencedColumnName = "px_id"))
	private List<PhieuXuat> phieuXuats = new ArrayList<PhieuXuat>();
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "ctpn",
				joinColumns = @JoinColumn(name = "nl_id", referencedColumnName = "nl_id"),
				inverseJoinColumns = @JoinColumn(name ="pn_id", referencedColumnName = "pn_id"))
	private List<PhieuNhap> phieuNhaps = new ArrayList<PhieuNhap>();
	

	public NguyenLieu() {
		super();
	}
	
	
	
}
