package com.hns2t.QuanLyQuanNhau_server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hns2t.QuanLyQuanNhau_server.model.NhanVien;


public interface NhanVienRepository extends JpaRepository<NhanVien, Long> {
	@Query(value="select * from nhanvien where nv_tkid = ?1", nativeQuery = true)
	public NhanVien findNhanVienBuTk_id(Long nv_tkid);
}
