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

    public UserProjectPermissionController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @CrossOrigin

    /*
        List Projects with user as member
     */
    @GetMapping(value = "/userprojects")
    public @ResponseBody
    String getEntry(@RequestParam long user_id, @RequestParam long project_id) {

        String projectUserQuery = "SELECT permission_level FROM haveuserpermissionproject JOIN permissions USING " +
                "(permission_id)" + " WHERE project_id = " + project_id + " AND user_id = " + user_id + ";";
        String permission = jdbcTemplate.queryForObject(projectUserQuery, String.class);
        return permission;
    }

    @PostMapping(value = "/userprojects")
    public @ResponseBody
    String addNewEntry(@RequestParam String user_id, @RequestParam long project_id,
                       @RequestParam long permission_id) {

        String existingQuery = "SELECT user_id FROM haveuserpermissionproject WHERE user_id=" + user_id + " AND project_id="
                + project_id + ";";

        try {
            jdbcTemplate.queryForObject(existingQuery, long.class);
            return "Existing user project permission relationship";
        } catch (Exception e) {
            String projectUserQuery = "INSERT INTO haveuserpermissionproject(user_id, project_id, permission_id)" +
                    " VALUES(" + user_id + ", " + project_id + ", " +
                    permission_id + ");";
            jdbcTemplate.update(projectUserQuery);
            return "Success";
        }
    }

    @PatchMapping(value = "/userprojects")
    public @ResponseBody
    String updateEntry(@RequestParam long user_id, @RequestParam long project_id,
                       @RequestParam long permission_id) {
        String userProjectUpdateQuery = "UPDATE haveuserpermissionproject SET permission_id = " + permission_id + " " +
                "WHERE project_id=" + project_id + " AND user_id=" + user_id + ";";
        jdbcTemplate.update(userProjectUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value = "/userprojects")
    public @ResponseBody
    String deleteEntry(@RequestParam long project_id, @RequestParam(required = false, defaultValue = "0") long user_id) {
        String userProjectDeleteQuery = "DELETE FROM haveuserpermissionproject WHERE project_id=" + project_id;
        String permissionDeleteQuery = "SELECT permission_id from haveuserpermissionproject WHERE project_id="+ project_id;
        if(user_id==0) {
            userProjectDeleteQuery += ";";
            permissionDeleteQuery += ";";
        }
        else {
            userProjectDeleteQuery += " AND user_id="+user_id+";";
            permissionDeleteQuery += " AND user_id="+user_id+";";
        }
        jdbcTemplate.update(userProjectDeleteQuery);
        List<Long> list = jdbcTemplate.queryForList(permissionDeleteQuery, long.class);
        for(long permission_id: list) new PermissionController().deleteEntry(permission_id);
        return "Success";
    }
}
