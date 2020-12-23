package com.hns2t.QuanLyQuanNhau_server.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hns2t.QuanLyQuanNhau_server.model.HoaDon;

public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {

	@Query(value = "Select * From hoadon",nativeQuery = true)
	public List<Object[]> getListHoaDon();
}
