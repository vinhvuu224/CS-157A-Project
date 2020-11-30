package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class InController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public InController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @CrossOrigin

    /*
        List Issues in project
     */
    @GetMapping(value = "/in")
    public @ResponseBody List<Location> getEntry(@RequestParam long user_id) {
       String locationQuery = "SELECT location_id, city, state, country, time_zone FROM `in` JOIN location using" +
               " (location_id) WHERE user_id="+user_id+";";
       List<Map<String, Object>> rows = jdbcTemplate.queryForList(locationQuery);
       String username = jdbcTemplate.queryForObject("SELECT username from users where user_id="+user_id+";", String.class);
       List<Location> list = new ArrayList<>();
       for (Map row : rows) {
           Location loc = new Location((int) row.get("location_id"), username, (String) row.get("city"),
                   (String) row.get("state"), (String) row.get("country"), (String) row.get("time_zone"));
           list.add(loc);
       }
       return list;
    }

    @PostMapping(value="/in")
    public @ResponseBody String addNewEntry(long user_id, long location_id) {

        String existingQuery = "SELECT location_id FROM `in` WHERE user_id="+user_id+";";

        try {
            long exisitingLocationId = jdbcTemplate.queryForObject(existingQuery, long.class);
            return "Existing user location relationship";
        }
        catch(Exception e){
            String userLocationQuery = "INSERT INTO `in`(user_id, location_id) VALUES(" + user_id + ", " + location_id + ");";
            jdbcTemplate.update(userLocationQuery);
            return "Success";
        }
    }


    @PatchMapping(value = "/in")
    public @ResponseBody
    String updateEntry(@RequestParam long location_id, @RequestParam long user_id) {
        String inUpdateQuery = "UPDATE `in` SET location_id = " + location_id + " WHERE " +
                "user_id=" + user_id + ";";
        jdbcTemplate.update(inUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value="/in")
    public @ResponseBody String deleteEntry(@RequestParam long user_id) {
        String locationDeleteQuery = "DELETE FROM `in` WHERE user_id="+user_id+";";
        jdbcTemplate.update(locationDeleteQuery);
        return "Success";
    }
}
