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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "ban")
public class Ban {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long b_id;
	@Column(unique = true)
	private Long b_stt;
	private Integer b_soghe;
	private TrangThaiBan b_trangthai;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "nhanvien_ban",
				joinColumns = @JoinColumn(name = "b_id", referencedColumnName = "b_id"),
				inverseJoinColumns = @JoinColumn(name ="nv_id", referencedColumnName = "nv_id"))
	private List<NhanVien> nhanviens;
 	
	@OneToMany(mappedBy = "ban")
	private List<HoaDon> hoadons;

	public Ban() {
		super();
	}
	
	
}
