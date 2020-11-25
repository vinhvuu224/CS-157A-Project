package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class InController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin

    /*
        List Issues in project
     */
    @GetMapping(value = "/in")
    public @ResponseBody List<Long> getEntry(@RequestParam long user_id) {

       String userLocationQuery = "SELECT location_id FROM `in` WHERE user_id="+user_id+";";
       List<Long> userLocationList = new ArrayList(jdbcTemplate.queryForList(userLocationQuery, Long.class));
       return userLocationList;
    }

    @PostMapping(value="/in")
    public @ResponseBody String addNewEntry(long user_id, long location_id) {

        String existingQuery = "SELECT location_id FROM `in` WHERE user_id="+user_id+";";

        try {
            long exisitingLocationId = jdbcTemplate.queryForObject(existingQuery, Long.class);
            return "Existing user location relationship";
        }
        catch(NullPointerException e){
            String userLocationQuery = "INSERT INTO `in`(user_id, location_id) VALUES(" + user_id + ", " + location_id + ");";
            jdbcTemplate.update(userLocationQuery);
            return "Success";
        }
    }

    @DeleteMapping(value="/in")
    public @ResponseBody String deleteEntry(@RequestParam long user_id) {
        String lcoationDeleteQuery = "DELETE FROM `in` WHERE user_id="+user_id+";";
        jdbcTemplate.update(lcoationDeleteQuery);
        return "Success";
    }
}
