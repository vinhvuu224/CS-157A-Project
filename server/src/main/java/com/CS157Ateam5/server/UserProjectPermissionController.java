package com.CS157Ateam5.server;


import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
@CrossOrigin
public class UserProjectPermissionController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin

    /*
        List Projects with user as member
     */
    @GetMapping(value = "/userprojects")
    public @ResponseBody List<String> getEntry(@RequestParam(required = false, defaultValue = "") String username,
                                               @RequestParam(required = false, defaultValue = "0") Long projectId) {

        if(!username.equals("")) {
            String useridQuery = "SELECT user_id from Users WHERE username = '" + username + "';";
            long user_id = jdbcTemplate.queryForObject(useridQuery, Long.class);
            String projectUserQuery = "SELECT name FROM haveuserpermissionproject JOIN projects USING (project_id)" +
                    "WHERE user_id = " + user_id + "  ;";
            List<String> projectUserList = new ArrayList<>(jdbcTemplate.queryForList(projectUserQuery, String.class));
            return projectUserList;
        }
        else if(!(projectId == 0)) {
            String projectUserQuery = "SELECT username FROM haveuserpermissionproject JOIN users USING (user_id)" +
                    "WHERE project_id = " + projectId + "  ;";
            List<String> projectUserList = new ArrayList<>(jdbcTemplate.queryForList(projectUserQuery, String.class));
            return projectUserList;
        }
        else {
            //ERROR: BOTH PARAMS MISSING
            return null;
        }
    }

    @PostMapping(value="/userprojects")
    public @ResponseBody String addNewEntry(@RequestParam String user_id, @RequestParam long project_id,
                                            @RequestParam long permission_id) {

        String existingQuery = "SELECT user_id FROM haveuserpermissionproject WHERE user_id="+user_id+" AND project_id="
                + project_id + ";";

        try {
            long existingUserID = jdbcTemplate.queryForObject(existingQuery, Long.class);
            return "Existing user project permission relationship";
        }
        catch(NullPointerException e){
            String projectUserQuery = "INSERT INTO haveuserpermissionproject VALUES(" + user_id + ", " + project_id + ", " +
                    permission_id + ");";
            jdbcTemplate.update(projectUserQuery);
            return "Success";
        }
    }

    @PatchMapping(value="/userprojects")
    public @ResponseBody String updateEntry(@RequestParam long user_id, @RequestParam long project_id,
                                            @RequestParam long permission_id) {
        String taskUpdateQuery = "UPDATE haveuserpermissionproject SET " + permission_id + " = " + permission_id + " " +
                "WHERE project_id="+project_id+" AND user_id="+user_id+";";
        jdbcTemplate.update(taskUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value="/userprojects")
    public @ResponseBody String deleteEntry(@RequestParam long project_id, @RequestParam long user_id) {
        String issueUpdateQuery = "DELETE FROM haveuserpermissionproject WHERE project_id="+project_id+" AND " +
                "user_id="+user_id+";";
        jdbcTemplate.update(issueUpdateQuery);
        return "Success";
    }
}
