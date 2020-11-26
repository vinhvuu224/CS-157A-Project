package com.CS157Ateam5.server;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class ProjectsController {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	 
	 @CrossOrigin(origins = "http://localhost:8080")
	 @GetMapping(value="/allProjects")
	 public List<String> getAllProjects(){
		 	List<String> projectsList = new ArrayList<>();
		 	String projectQuery = "SELECT name FROM projects ";
		 	projectsList.addAll(jdbcTemplate.queryForList(projectQuery, String.class));
		 	return projectsList;
		 	
	 }
}