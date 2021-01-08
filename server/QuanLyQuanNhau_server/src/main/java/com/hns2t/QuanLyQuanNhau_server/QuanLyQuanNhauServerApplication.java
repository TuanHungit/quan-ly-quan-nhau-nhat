package com.hns2t.QuanLyQuanNhau_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//import com.hns2t.QuanLyQuanNhau_server.security.JWTAuthorizationFilter;

@SpringBootApplication
public class QuanLyQuanNhauServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuanLyQuanNhauServerApplication.class, args);
	}
	@EnableWebSecurity
	@Configuration
	class WebSecurityConfig extends WebSecurityConfigurerAdapter {
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.cors();
//				.and()
//				.csrf().disable()
//				.addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
//				.authorizeRequests()
//				.antMatchers(HttpMethod.POST, "/api/v1/taikhoans/login").permitAll()
//				.anyRequest().authenticated();
		}
		
	}
	

}
