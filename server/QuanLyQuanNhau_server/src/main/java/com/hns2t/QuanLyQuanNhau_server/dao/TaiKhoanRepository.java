package com.hns2t.QuanLyQuanNhau_server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hns2t.QuanLyQuanNhau_server.model.TaiKhoan;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long>{
	@Query(value="select tk.* from taikhoan tk where tk.tk_tendangnhap = ?1", nativeQuery = true)
	TaiKhoan findByTenDangNhap(String tk_tendangnhap);
}
