package com.hns2t.QuanLyQuanNhau_server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hns2t.QuanLyQuanNhau_server.model.TaiKhoan;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long> {
	@Query(value="select * from taikhoan where tk_tendangnhap = ?1", nativeQuery = true)
	public TaiKhoan findByTenTaiKhoan(String tendangnhap);
}