package com.CS157Ateam5.server;


import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class ProjectController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin

    /*
        List Projects
     */
    @GetMapping(value = "/projects")
    public @ResponseBody
    Object getProject(@RequestParam(required = false, defaultValue = "0") long projectId,
                      @RequestParam(required = false, defaultValue = "") String projectName) {
        if (!(projectId == 0)) {
            String projectNameQuery = "SELECT name FROM projects WHERE project_id = '" + projectId + "';";
            String projectNameFetch = jdbcTemplate.queryForObject(projectNameQuery, String.class);
            return projectNameFetch;
        } else if (!projectName.equals("")) {
            String projectIDQuery = "SELECT project_id FROM projects WHERE name = '" + projectName + "';";
            List<Long> projectIDList = new ArrayList(jdbcTemplate.queryForList(projectIDQuery, Long.class));
            return projectIDList;
        } else {
            return "Missing projectName and projectId parameters";
        }
    }

    @PostMapping(value = "/projects")
    public @ResponseBody
    String addNewEntry(@RequestBody Projects project) {
        jdbcTemplate.update("INSERT INTO Projects(name) values('" + project.getProjectName() + "')");
        return "Successful";
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value = "/projects")
    public @ResponseBody
    String updateEntry(@RequestParam long project_id, @RequestParam String projectName) {
        String projectUpdateQuery = "UPDATE projects SET name=" + projectName + " WHERE project_id=" + project_id + ";";
        jdbcTemplate.update(projectUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value = "/projects")
    public @ResponseBody
    String deleteEntry(@RequestParam long project_id) {
        String projectDeleteQuery = "DELETE FROM projects WHERE project_id=" + project_id + ";";
        jdbcTemplate.update(projectDeleteQuery);
        return "Success";
    }
}
