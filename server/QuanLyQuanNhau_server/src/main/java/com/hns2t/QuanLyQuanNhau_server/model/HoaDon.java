package com.hns2t.QuanLyQuanNhau_server.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "hoadon")
public class HoaDon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hd_id;
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
	
	@OneToMany(mappedBy = "hoaDon")
	private List<ChiTietHoaDon> chiTietHoaDons;
	
	public HoaDon() {
		super();
	}
	
	
}
