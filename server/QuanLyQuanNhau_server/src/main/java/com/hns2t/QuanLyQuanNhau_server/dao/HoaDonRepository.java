package com.hns2t.QuanLyQuanNhau_server.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.hns2t.QuanLyQuanNhau_server.model.HoaDon;

public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {

	@Query("select hd from HoaDon hd where DATE_FORMAT (hd.hd_ngaythanhtoan, '%Y-%m-%d') = :fromDate")
	List<HoaDon> findAllWithDate(@Param("fromDate")  String fromDate); 
	
	@Query("SELECT hd.hd_id FROM HoaDon hd WHERE hd.ban.b_id = ?1 AND hd.hd_trangthai='1'")
	Long getIdByTable( Long tableId);
	
	@Query(value =  "SELECT ma.ma_ten, cthd.cthd_soluong, cthd.cthd_gia \r\n"
			+ "FROM hoadon hd  \r\n"
			+ "join cthd cthd on hd.hd_id = cthd.cthd_hdid \r\n"
			+ "join monan ma on ma.ma_id = cthd.cthd_monanid\r\n"
			+ "where hd.hd_id = :hoaDonId", nativeQuery = true)
	List<Object> findListChiTietHoaDonById(@Param("hoaDonId") Long id);
	
	
	@Query(value ="select * from hoadon where DATE_FORMAT (hoadon.hd_ngaythanhtoan, '%Y-%m') = :fromMonth", nativeQuery = true)
	List<HoaDon> findAllWithMonth(@Param("fromMonth")  String fromMonth); 
	
}
