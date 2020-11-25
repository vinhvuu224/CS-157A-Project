package com.CS157Ateam5.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class UserController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin
    @GetMapping(value = "/")
    public @ResponseBody
    List<UsersDatabase> getUser(@RequestParam String username) {

        String userNameQuery = "SELECT * FROM users WHERE username = '" + username + "';";

        List<UsersDatabase> users = new ArrayList<>();
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(userNameQuery);
        for (Map row : rows) {
            UsersDatabase user = new UsersDatabase((int) row.get("user_id"), (String) row.get("email"),
                    (String) row.get("password"), (String) row.get("username"));
            users.add(user);
        }
        return users;
    }

    @PostMapping(value = "/")
    public @ResponseBody
    String addNewEntry(@RequestBody Users user) {
        //RegistErrorChecker myObj = new RegistErrorChecker("","","");
        List<String> usernameList = new ArrayList<>();
        List<String> emailList = new ArrayList<>();
        String usernameQuery = "SELECT username FROM users WHERE users.username = '" + user.getUsername() + "';";
        String emailQuery = "SELECT username FROM users WHERE users.email = '" + user.getEmail() + "';";

        usernameList.addAll(jdbcTemplate.queryForList(usernameQuery, String.class));
        emailList.addAll(jdbcTemplate.queryForList(emailQuery, String.class));


        if (usernameList.size() > 0) {
            //myObj.setUsernameError("Duplicate username.");

            return "Duplicate username.";
        } else if (emailList.size() > 0) {
            //myObj.setEmailError("Duplicate email.");
            return "Duplicate email.";
        } else if (user.getPassword().equals(user.getConfirmPassword()) == false) {
            //myObj.setConfirmPasswordError("Password does not match.");
            return "Password does not match.";
        } else {
            JWTUtil jwt = new JWTUtil();
            BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passEncoder.encode(user.getPassword());
            jdbcTemplate.update("INSERT INTO users(email,password,username) values('" + user.getEmail() + "','" + hashedPassword + "','" + user.getUsername() + "')");
            String token = jwt.generateToken(user.getEmail());
            return token;
        }
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("/login")
    public String login(@RequestBody UsersLogin userLogin) {
        JWTUtil jwt = new JWTUtil();
        BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
        List<String> userEmail = new ArrayList<>();
        List<String> userUsername = new ArrayList<>();

        if (userLogin.getUsernameEmail().contains("@")) {
            String passwordQuery = "SELECT password FROM users WHERE users.email = '" + userLogin.getUsernameEmail() + "';";
            userEmail.addAll(jdbcTemplate.queryForList(passwordQuery, String.class));
            if (userEmail.size() == 1) {
                if (passEncoder.matches(userLogin.getPassword(), userEmail.get(0))) {
                    String token = jwt.generateToken(userLogin.getUsernameEmail());
                    return token;
                } else {
                    return "Incorrect password.";
                }
            } else {
                return "Please enter a valid username/email.";
            }


        } else {
            String emailQuery = "SELECT password FROM users WHERE users.username = '" + userLogin.getUsernameEmail() + "';";
            userUsername.addAll(jdbcTemplate.queryForList(emailQuery, String.class));
            if (userUsername.size() == 1) {
                if (passEncoder.matches(userLogin.getPassword(), userUsername.get(0))) {
                    String token = jwt.generateToken(userLogin.getUsernameEmail());
                    return token;
                } else {
                    return "Incorrect password.";
                }
            } else {
                return "Please enter a valid username/email.";
            }
        }

    }

}
