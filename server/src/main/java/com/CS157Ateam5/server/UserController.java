package com.CS157Ateam5.server;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;





@RestController
@CrossOrigin
public class UserController {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	 
	 @CrossOrigin
	 @PostMapping(value="/")
	 public @ResponseBody String addNewEntry(@RequestBody Users user) {
		 	int count = 24;
		 	List<String> usernameList = new ArrayList<>();
			usernameList.addAll(jdbcTemplate.queryForList("SELECT firstname FROM users WHERE users.email = '"+user.getEmail()+"' OR users.username = '"+user.getUsername()+"';", String.class));
		    if(usernameList.size()>0) {
		    	return "duplicate";
		    }
		    else {
		    	jdbcTemplate.update("INSERT INTO users(user_id,firstname,lastname,email,password,username) values("+count+",'joe','biden','"+user.getEmail()+"','"+user.getPassword()+"','"+user.getUsername()+"')");

		    	count ++;
		    }
		    return "SUCCESS!";
		}
}
