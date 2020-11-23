package com.CS157Ateam5.server;


import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
@CrossOrigin
public class ProjectController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin(origins = "http://localhost:8080")

    /*
        List Projects
     */
    @GetMapping(value="/projects")
    public @ResponseBody List<Long> getProjectIds(@RequestParam String projectName) {
        String projectIDQuery = "SELECT project_id FROM projects WHERE name = '"+projectName+ "';";
        List<Long> projectIDList = new ArrayList(jdbcTemplate.queryForList(projectIDQuery, String.class));
        return projectIDList;
    }

    @PostMapping(value="/projects")
    public @ResponseBody String addNewEntry(@RequestBody Projects project) {
        jdbcTemplate.update("INSERT INTO Projects(name) values('" + project.getProjectName()+"')");
        return "Successful";
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value="/projects")
    public @ResponseBody String updateEntry(@RequestParam long project_id, @RequestParam String paramName,
                                            @RequestParam Object paramValue) {
        String taskUpdateQuery = "UPDATE projects SET " + paramName + " = " + paramValue + " WHERE project_id="+project_id+";";
        jdbcTemplate.execute(taskUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value="/projects")
    public @ResponseBody String deleteEntry(@RequestParam long project_id) {
        String projectUpdateQuery = "DELETE FROM projects WHERE project_id="+project_id+";";
        jdbcTemplate.execute(projectUpdateQuery);
        return "Success";
    }
}
