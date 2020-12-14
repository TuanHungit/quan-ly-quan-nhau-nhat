package com.hns2t.QuanLyQuanNhau_server.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hns2t.QuanLyQuanNhau_server.dao.LoaiMonAnRepository;
import com.hns2t.QuanLyQuanNhau_server.model.LoaiMonAn;

@Service
@Transactional
public class LoaiMonAnService {

	@Autowired
	private LoaiMonAnRepository repo;
	
	public List<LoaiMonAn> listAll() {
        return repo.findAll();
       
    }
     
    public LoaiMonAn save(LoaiMonAn loaiMonAn) {
        return repo.save(loaiMonAn);
    }
     
   
     
    public void delete(long id) {
        repo.deleteById(id);   
    }
    
}

