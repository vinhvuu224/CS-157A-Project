package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class LocationController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin

    /*
        List Projects
     */
    @GetMapping(value = "/location")
    public @ResponseBody
    List<Location> getLocationId() {
        String locationQuery = "SELECT * FROM location;";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(locationQuery);
        List<Location> list = new ArrayList<>();
        for (Map row : rows) {
            Location loc = new Location((int) row.get("location_id"), "all users", (String) row.get("city"),
                    (String) row.get("state"), (String) row.get("country"), (String) row.get("time_zone"));
            list.add(loc);
        }
        return list;
    }

    @PostMapping(value = "/location")
    public @ResponseBody
    String addNewEntry(@RequestBody Location location) {
        String query = "SELECT location_id from location where City='"+location.getCity()+"' " +
                "and State='"+location.getState()+"' and Country='"+location.getCountry()+"';";
        try{
            long id = jdbcTemplate.queryForObject(query, long.class);
            return "Location already exists id="+id;
        }
        catch(Exception e) {
            jdbcTemplate.update("INSERT INTO location(City, State, Country, time_zone) values('" + location.getCity() + "'" +
                    ", '" + location.getState() + "', '" + location.getCountry() + "', '" + location.getTime_zone() + "')");
            long location_id = jdbcTemplate.queryForObject("SELECT MAX(location_id) from location", long.class);
            long user_id = jdbcTemplate.queryForObject("SELECT user_id from users where username='"+location.getUsername()+"';",
                    long.class);
            new InController(jdbcTemplate).addNewEntry(user_id, location_id);
        }
        return "Successful";
    }

    @PatchMapping(value = "/location")
    public @ResponseBody
    String updateEntry(@RequestParam long location_id, @RequestParam String param_name,
                       @RequestParam Object param_value) {
        String locationUpdateQuery = "UPDATE location SET " + param_name + " = '" + param_value + "' WHERE " +
                "location_id=" + location_id + ";";
        jdbcTemplate.update(locationUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value = "/location")
    public @ResponseBody
    String deleteEntry(@RequestParam long location_id) {
        String locationDeleteQuery = "DELETE FROM location WHERE location_id=" + location_id + ";";
        jdbcTemplate.update(locationDeleteQuery);
        return "Success";
    }
}
