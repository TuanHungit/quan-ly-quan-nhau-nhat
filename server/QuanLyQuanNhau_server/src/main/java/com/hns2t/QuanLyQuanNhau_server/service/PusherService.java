package com.hns2t.QuanLyQuanNhau_server.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.pusher.rest.Pusher;


public class PusherService {

	
	public static Pusher getPusher()
	{
		Pusher pusher = null;
		try {
			pusher = new Pusher("1134980", "418932f279b2ed1937ab", "d6a796c3c689a6843ddd");
			pusher.setCluster("ap1");
			pusher.setEncrypted(true);
		}catch(Exception e)
		{
			
		}
		return pusher;
	}
}
