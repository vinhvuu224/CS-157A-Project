package com.CS157Ateam5.server;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class ProjectController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping(value="/getProjects")
    public @ResponseBody Object justatest(int user_id) {
           List<ProjectInfo> projects = new ArrayList<>();
           String testQuery = "select projects.project_id, name, permission_level from haveuserpermissionproject " +
                   "JOIN projects USING (project_id) JOIN permissions USING (permission_id) where user_id="+user_id+";";
           List<Map<String, Object>> rows = jdbcTemplate.queryForList(testQuery);
           for (Map row : rows) {
               ProjectInfo project = new ProjectInfo((int) row.get("project_id"), (String) row.get("name"),
                       (String) row.get("permission_level"));
               projects.add(project);
           }
           return projects;
    }

    @GetMapping(value="/projects")
    public @ResponseBody Object justatest(@RequestParam long project_id) {
        String query = "SELECT user_id, username FROM users JOIN haveuserpermissionproject USING (user_id) WHERE " +
                "project_id="+project_id+";";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
        List<UserID> users = new ArrayList<>();
        for(Map row: rows) {
            users.add(new UserID((int) row.get("user_id"), (String) row.get("username")));
        }
        return users;
    }

    @PostMapping(value="/projects")
    public @ResponseBody Object addNewEntry(@RequestBody Projects project) {
        List<UserDetails> list = new UserController(jdbcTemplate).getUser(project.getUsername());
        for(UserDetails u: list) {
            if(u.getProject_name().equals(project.getProject_name())) {
                return "User cannot have 2 projects with same name";
            }
        }
        jdbcTemplate.update("INSERT INTO Projects(name) values('" + project.getProject_name()+"')");
        long project_id = jdbcTemplate.queryForObject("SELECT MAX(project_id) from projects;", long.class);
        new UserProjectPermissionController(jdbcTemplate).addNewEntry(new UserProjectPost(project.getUsername(),
                project_id, "Full"));
        project.setProject_id(project_id);
        return project;
    }

    @PatchMapping(value="/projects")
    public @ResponseBody String updateEntry(@RequestParam long project_id, @RequestParam String project_name,
                                            @RequestParam String username) {
        List<UserDetails> list = new UserController(jdbcTemplate).getUser(username);
        for(UserDetails u: list) {
            if(project_name.equals(u.getProject_name())) {
                return "User cannot have 2 projects with same name";
            }
        }
        String projectUpdateQuery = "UPDATE projects SET name='" + project_name + "' WHERE project_id="+project_id+";";
        jdbcTemplate.update(projectUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value="/projects")
    public @ResponseBody String deleteEntry(@RequestParam long project_id) {
        String projectDeleteQuery = "DELETE FROM projects WHERE project_id="+project_id+";";
        jdbcTemplate.update(projectDeleteQuery);
        new UserProjectPermissionController(jdbcTemplate).deleteEntry(project_id, 0);
        new HaveTaskController(jdbcTemplate).deleteEntry(project_id, 0);
        new HaveIssueController(jdbcTemplate).deleteEntry(project_id, 0);
        return "Success";
    }
}