package com.hns2t.QuanLyQuanNhau_server.controller;

import java.util.Collections;


import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hns2t.QuanLyQuanNhau_server.service.PusherService;
import com.pusher.rest.Pusher;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/messages")
public class PusherController {
	Pusher pusher = PusherService.getPusher();
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("")
	public Integer triggerMessage(@RequestBody  String inputJson) {
		JSONParser parser = new JSONParser();
		try {
			JSONObject json = (JSONObject) parser.parse(inputJson);
			pusher.trigger("my-channel", "supply", Collections.singletonMap("message",json));
		}catch(ParseException e) {
			e.printStackTrace();
		}
		return 1;
	}

}
