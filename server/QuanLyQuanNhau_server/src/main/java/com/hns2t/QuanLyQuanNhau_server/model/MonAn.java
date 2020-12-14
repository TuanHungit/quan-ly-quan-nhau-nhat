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

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@JsonIgnore
	private LoaiMonAn loaiMonAn;
	
	@OneToMany(mappedBy = "monAn")
	@JsonIgnore
	private List<ChiTietHoaDon> chiTietHoaDons;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "ctnl",
				joinColumns = @JoinColumn(name = "ma_id", referencedColumnName = "ma_id"),
				inverseJoinColumns = @JoinColumn(name ="nl_id", referencedColumnName = "nl_id"))
	@JsonIgnore
	private List<NguyenLieu> nguyenLieus;
	
	public MonAn() {
		super();
	}

	
	public MonAn(Long ma_id, String ma_ten, Double ma_giavon, Double ma_giaban, String ma_donvitinh, Byte ma_hinhanh,
			String ma_motachitiet, LoaiMonAn loaiMonAn, List<ChiTietHoaDon> chiTietHoaDons,
			List<NguyenLieu> nguyenLieus) {
		super();
		this.ma_id = ma_id;
		this.ma_ten = ma_ten;
		this.ma_giavon = ma_giavon;
		this.ma_giaban = ma_giaban;
		this.ma_donvitinh = ma_donvitinh;
		this.ma_hinhanh = ma_hinhanh;
		this.ma_motachitiet = ma_motachitiet;
		this.loaiMonAn = loaiMonAn;
		this.chiTietHoaDons = chiTietHoaDons;
		this.nguyenLieus = nguyenLieus;
	}


	public Long getMa_id() {
		return ma_id;
	}

	public void setMa_id(Long ma_id) {
		this.ma_id = ma_id;
	}

	public String getMa_ten() {
		return ma_ten;
	}

	public void setMa_ten(String ma_ten) {
		this.ma_ten = ma_ten;
	}

	public Double getMa_giavon() {
		return ma_giavon;
	}

	public void setMa_giavon(Double ma_giavon) {
		this.ma_giavon = ma_giavon;
	}

	public Double getMa_giaban() {
		return ma_giaban;
	}

	public void setMa_giaban(Double ma_giaban) {
		this.ma_giaban = ma_giaban;
	}

	public String getMa_donvitinh() {
		return ma_donvitinh;
	}

	public void setMa_donvitinh(String ma_donvitinh) {
		this.ma_donvitinh = ma_donvitinh;
	}

	public Byte getMa_hinhanh() {
		return ma_hinhanh;
	}

	public void setMa_hinhanh(Byte ma_hinhanh) {
		this.ma_hinhanh = ma_hinhanh;
	}

	public String getMa_motachitiet() {
		return ma_motachitiet;
	}

	public void setMa_motachitiet(String ma_motachitiet) {
		this.ma_motachitiet = ma_motachitiet;
	}

	public LoaiMonAn getLoaiMonAn() {
		return loaiMonAn;
	}

	public void setLoaiMonAn(LoaiMonAn loaiMonAn) {
		this.loaiMonAn = loaiMonAn;
	}

	public List<ChiTietHoaDon> getChiTietHoaDons() {
		return chiTietHoaDons;
	}

	public void setChiTietHoaDons(List<ChiTietHoaDon> chiTietHoaDons) {
		this.chiTietHoaDons = chiTietHoaDons;
	}

	public List<NguyenLieu> getNguyenLieus() {
		return nguyenLieus;
	}

	public void setNguyenLieus(List<NguyenLieu> nguyenLieus) {
		this.nguyenLieus = nguyenLieus;
	}
	
	
	
	
}
