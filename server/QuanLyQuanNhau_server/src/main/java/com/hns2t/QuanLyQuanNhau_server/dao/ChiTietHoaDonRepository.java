package com.hns2t.QuanLyQuanNhau_server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hns2t.QuanLyQuanNhau_server.model.ChiTietHoaDon;

public interface ChiTietHoaDonRepository extends JpaRepository<ChiTietHoaDon, Long> {

	@Query(value = "select * from cthd  where cthd.cthd_hdid = :hdid and cthd.cthd_monanid= :monAnId", nativeQuery = true)
	ChiTietHoaDon findByHdidAndMaid(@Param("monAnId") Long monAnId, @Param("hdid") Long hoaDonId);

}
