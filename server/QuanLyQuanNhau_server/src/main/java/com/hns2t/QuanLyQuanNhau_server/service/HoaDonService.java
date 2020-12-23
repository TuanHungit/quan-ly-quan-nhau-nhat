package com.hns2t.QuanLyQuanNhau_server.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hns2t.QuanLyQuanNhau_server.dao.HoaDonRepository;

@Service
@Transactional
public class HoaDonService {
	@Autowired
	private HoaDonRepository repo;
	
	public List<Object[]> getAll(){
		return repo.getListHoaDon();
	}
}
