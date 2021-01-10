package com.hns2t.QuanLyQuanNhau_server.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import com.hns2t.QuanLyQuanNhau_server.model.HoaDon;

public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {

	@Query("select hd from HoaDon hd where DATE_FORMAT (hd.hd_ngaythanhtoan, '%Y-%m-%d') = :fromDate")
	List<HoaDon> findAllBetweenDate(@Param("fromDate")  String fromDate); 
	
	@Query("SELECT hd.hd_id FROM HoaDon hd WHERE hd.ban.b_id = ?1 AND hd.hd_trangthai='1'")
	Long getIdByTable( Long tableId);
}
