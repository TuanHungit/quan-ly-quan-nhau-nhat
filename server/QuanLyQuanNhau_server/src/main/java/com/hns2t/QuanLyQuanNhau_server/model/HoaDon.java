package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "hoadon")
public class HoaDon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hd_id;
	@Temporal(TemporalType.TIMESTAMP)
	private Date hd_ngaythanhtoan;
	private Double hd_tongtien;
	private StatusHoaDon hd_trangthai;
	
	@ManyToOne
	@JoinColumn(name ="hd_ctkmid")
	private ChuongTrinhKhuyenMai chuongTrinhKhuyenMai;
	
	@ManyToOne
	@JoinColumn(name = "hd_nhanvienid")
	private NhanVien hd_nhanvien;
	
	@ManyToOne
	@JoinColumn(name="hd_banid")
	private Ban ban;
	
	@OneToMany(mappedBy = "hoaDon", cascade = CascadeType.REMOVE)
	
	@JsonIgnore
	private List<ChiTietHoaDon> chiTietHoaDons;
	
	public HoaDon() {
		super();
	}
	
	public HoaDon(Long hd_id, Date hd_ngaythanhtoan, Double hd_tongtien, StatusHoaDon hd_trangthai,
			ChuongTrinhKhuyenMai chuongTrinhKhuyenMai, NhanVien hd_nhanvien, Ban ban,
			List<ChiTietHoaDon> chiTietHoaDons) {
		super();
		this.hd_id = hd_id;
		this.hd_ngaythanhtoan = hd_ngaythanhtoan;
		this.hd_tongtien = hd_tongtien;
		this.hd_trangthai = hd_trangthai;
		this.chuongTrinhKhuyenMai = chuongTrinhKhuyenMai;
		this.hd_nhanvien = hd_nhanvien;
		this.ban = ban;
		this.chiTietHoaDons = chiTietHoaDons;
	}



	public Long getHd_id() {
		return hd_id;
	}

	public void setHd_id(Long hd_id) {
		this.hd_id = hd_id;
	}

	public Date getHd_ngaythanhtoan() {
		return hd_ngaythanhtoan;
	}

	public void setHd_ngaythanhtoan(Date hd_ngaythanhtoan) {
		this.hd_ngaythanhtoan = hd_ngaythanhtoan;
	}

	public Double getHd_tongtien() {
		return hd_tongtien;
	}

	public void setHd_tongtien(Double hd_tongtien) {
		this.hd_tongtien = hd_tongtien;
	}

	public StatusHoaDon getHd_trangthai() {
		return hd_trangthai;
	}

	public void setHd_trangthai(StatusHoaDon hd_trangthai) {
		this.hd_trangthai = hd_trangthai;
	}

	public ChuongTrinhKhuyenMai getChuongTrinhKhuyenMai() {
		return chuongTrinhKhuyenMai;
	}

	public void setChuongTrinhKhuyenMai(ChuongTrinhKhuyenMai chuongTrinhKhuyenMai) {
		this.chuongTrinhKhuyenMai = chuongTrinhKhuyenMai;
	}

	public NhanVien getHd_nhanvien() {
		return hd_nhanvien;
	}

	public void setHd_nhanvien(NhanVien hd_nhanvien) {
		this.hd_nhanvien = hd_nhanvien;
	}

	public Ban getBan() {
		return ban;
	}

	public void setBan(Ban ban) {
		this.ban = ban;
	}

	public List<ChiTietHoaDon> getChiTietHoaDons() {
		return chiTietHoaDons;
	}

	public void setChiTietHoaDons(List<ChiTietHoaDon> chiTietHoaDons) {
		this.chiTietHoaDons = chiTietHoaDons;
	}
	
	
	
	
}
