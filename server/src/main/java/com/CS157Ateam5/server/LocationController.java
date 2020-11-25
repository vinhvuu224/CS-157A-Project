package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class LocationController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin

    /*
        List Projects
     */
    @GetMapping(value="/location")
    public @ResponseBody Long getLocationId(@RequestParam String city, @RequestParam String state,
                                                  @RequestParam String country) {
        String locationIDQuery = "SELECT location_id FROM location WHERE city = '"+city+ "' AND state='"+state+"';";
        Long locationId = jdbcTemplate.queryForObject(locationIDQuery, Long.class);
        return locationId;
    }

    @PostMapping(value="/location")
    public @ResponseBody String addNewEntry(@RequestBody Location location) {
        jdbcTemplate.update("INSERT INTO location(City, State, Country, time_zone) values('" + location.getCity()+"'" +
                ", '"+location.getState()+"', '"+location.getCountry()+"', '"+location.getTime_zone()+"')");
        return "Successful";
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value="/location")
    public @ResponseBody String updateEntry(@RequestParam long location_id, @RequestParam String paramName,
                                            @RequestParam Object paramValue) {
        String locationUpdateQuery = "UPDATE location SET " + paramName + " = " + paramValue + " WHERE " +
                "location_id="+location_id+";";
        jdbcTemplate.update(locationUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value="/location")
    public @ResponseBody String deleteEntry(@RequestParam long location_id) {
        String locationDeleteQuery = "DELETE FROM location WHERE location_id="+location_id+";";
        jdbcTemplate.update(locationDeleteQuery);
        return "Success";
    }
}
