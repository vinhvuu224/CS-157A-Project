package com.CS157Asection09team5.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;


@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

		private static final Logger log = LoggerFactory.getLogger(BackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public void run(String... strings) throws Exception {

		log.info("Querying to select user records");
		jdbcTemplate.query(
				"SELECT user_id, username, email FROM users", (rs, rowNum) ->
						new Users(rs.getLong("user_id"), rs.getString("username"),
						rs.getString("email"), "")
		).forEach(user -> log.info(user.toString()));
	}
}

