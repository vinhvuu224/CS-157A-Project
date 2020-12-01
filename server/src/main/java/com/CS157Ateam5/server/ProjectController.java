package com.CS157Ateam5.server;


import java.util.ArrayList;
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

    @CrossOrigin
    @GetMapping(value="/projects")
    public @ResponseBody Object getProject(@RequestParam String username, @RequestParam String project_name) {
       String query = "select project_id from users join haveuserpermissionproject using (user_id) join projects using (project_id)\n" +
               "where username='"+username+"' and name='"+project_name+"'";

       long project_id=0;
       try {
           project_id = jdbcTemplate.queryForObject(query, long.class);
       }
       catch (Exception e){return "No project user relationship";}

       query = "select projects.name as 'project_name', task_id, tasks.name as 'task_name', " +
               "tasks.description as 'task_description',\n" + "progress, project_id, issue_id, issues.description as " +
               "'issue_description', issues.name as 'issue_name',\n" + "priority_level from projects join havetasks " +
               "using (project_id) join tasks using (task_id) join haveissues using\n" + "(project_id) join issues using" +
               " (issue_id) where project_id="+project_id+";";

       List<ProjectDetails> projects = new ArrayList<>();
       List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
        for (Map row : rows) {
            ProjectDetails project = new ProjectDetails((int) row.get("project_id"), (String) row.get("project_name"),
                    (int) row.get("task_id"), (String) row.get("task_name"), (String) row.get("task_description"),
                    (String) row.get("progress"), (int) row.get("issue_id"), (String) row.get("issue_name"),
                    (String) row.get("issue_description"), (String) row.get("priority_level"));
            projects.add(project);
        }
        return projects;
    }

    @PostMapping(value="/projects")
    public @ResponseBody String addNewEntry(@RequestBody Projects project) {
        List<UserDetails> list = new UserController(jdbcTemplate).getUser(project.getUsername());
        for(UserDetails u: list) {
            if(u.getProject_name().equals(project.getProject_name())) {
                return "User cannot have 2 projects with same name";
            }
        }
        long user_id = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE username='"+project.getUsername()+"';", long.class);
        jdbcTemplate.update("INSERT INTO Projects(name) values('" + project.getProject_name()+"')");
        long project_id = jdbcTemplate.queryForObject("SELECT MAX(project_id) from projects;", long.class);
        new UserProjectPermissionController(jdbcTemplate).addNewEntry(user_id, project_id, "Full");
        return "Successful";
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
