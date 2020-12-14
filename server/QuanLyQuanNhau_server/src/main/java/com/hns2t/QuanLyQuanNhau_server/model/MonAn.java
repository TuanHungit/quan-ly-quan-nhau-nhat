package com.hns2t.QuanLyQuanNhau_server.model;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "monan")
public class MonAn {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ma_id; 
	private String ma_ten;
	private Double ma_giavon;
	private Double ma_giaban;
	private String ma_donvitinh;
	private Byte ma_hinhanh;
	private String ma_motachitiet;
	
	@ManyToOne
	@JoinColumn(name = "ma_lmaid")
	private LoaiMonAn loaiMonAn;
	
	@OneToMany(mappedBy = "monAn")
	private List<ChiTietHoaDon> chiTietHoaDons;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "ctnl",
				joinColumns = @JoinColumn(name = "ma_id", referencedColumnName = "ma_id"),
				inverseJoinColumns = @JoinColumn(name ="nl_id", referencedColumnName = "nl_id"))
	private List<NguyenLieu> nguyenLieus;
	
	public MonAn() {
		super();
	}
	
	
}
