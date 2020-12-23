package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name= "nhanvien")
public class NhanVien {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long nv_id;
	private String nv_hoten;
	@Column(unique = true)
	private String nv_cmnd;
	@Temporal(TemporalType.TIMESTAMP)
	private Date nv_ngaysinh;
	private String nv_diachi;
	private String nv_sdt;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "nv_lnvid")
	private LoaiNhanVien loaiNhanVien;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "nv_tkid")
	private TaiKhoan taiKhoan;
	
	@ManyToMany(mappedBy = "nhanviens")
	@JsonIgnore
	private List<Ban> bans;
	
	@OneToMany(mappedBy = "hd_nhanvien")
	@JsonIgnore
	private List<HoaDon> hoaDons;
	
	@OneToMany(mappedBy = "nhanvien")
	@JsonIgnore
	private List<PhieuXuat> phieuXuats;
	
	@OneToMany(mappedBy = "nhanvien")
	@JsonIgnore
	private List<PhieuNhap> phieuNhaps;
	
	public NhanVien() {
		super();
	}

	public long getNv_id() {
		return nv_id;
	}

	public void setNv_id(long nv_id) {
		this.nv_id = nv_id;
	}

	public String getNv_hoten() {
		return nv_hoten;
	}

	public void setNv_hoten(String nv_hoten) {
		this.nv_hoten = nv_hoten;
	}

	public String getNv_cmnd() {
		return nv_cmnd;
	}

	public void setNv_cmnd(String nv_cmnd) {
		this.nv_cmnd = nv_cmnd;
	}

	public Date getNv_ngaysinh() {
		return nv_ngaysinh;
	}

	public void setNv_ngaysinh(Date nv_ngaysinh) {
		this.nv_ngaysinh = nv_ngaysinh;
	}

	public String getNv_diachi() {
		return nv_diachi;
	}

	public void setNv_diachi(String nv_diachi) {
		this.nv_diachi = nv_diachi;
	}

	public String getNv_sdt() {
		return nv_sdt;
	}

	public void setNv_sdt(String nv_sdt) {
		this.nv_sdt = nv_sdt;
	}

	public LoaiNhanVien getLoaiNhanVien() {
		return loaiNhanVien;
	}

	public void setLoaiNhanVien(LoaiNhanVien loaiNhanVien) {
		this.loaiNhanVien = loaiNhanVien;
	}

	public TaiKhoan getTaiKhoan() {
		return taiKhoan;
	}

	public void setTaiKhoan(TaiKhoan taiKhoan) {
		this.taiKhoan = taiKhoan;
	}

	public List<Ban> getBans() {
		return bans;
	}

	public void setBans(List<Ban> bans) {
		this.bans = bans;
	}

	public List<HoaDon> getHoaDons() {
		return hoaDons;
	}

	public void setHoaDons(List<HoaDon> hoaDons) {
		this.hoaDons = hoaDons;
	}

	public List<PhieuXuat> getPhieuXuats() {
		return phieuXuats;
	}

	public void setPhieuXuats(List<PhieuXuat> phieuXuats) {
		this.phieuXuats = phieuXuats;
	}

	public List<PhieuNhap> getPhieuNhaps() {
		return phieuNhaps;
	}

	public void setPhieuNhaps(List<PhieuNhap> phieuNhaps) {
		this.phieuNhaps = phieuNhaps;
	}
	
	
	
}
