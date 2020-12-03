package com.CS157Ateam5.server;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    List<UserProjectGet> getEntry(@RequestParam long project_id) {
        String projectUserQuery = "SELECT user_id, username, permission_level FROM haveuserpermissionproject JOIN " +
                "permissions USING (permission_id) JOIN users USING (user_id) WHERE project_id = " + project_id + ";";
        List<UserProjectGet> list = new ArrayList<>();
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(projectUserQuery);
        for(Map row: rows) {
            list.add(new UserProjectGet((int) row.get("user_id"), (String) row.get("username"),
                    (String) row.get("permission_level")));
        }
        return list;
    }

    @PostMapping(value = "/userprojects")
    public @ResponseBody
    String addNewEntry(@RequestBody UserProjectPost user) {

        long project_id = user.getProject_id();
        String username = user.getUsername();
        String permission_level = user.getPermission_level();
        long user_id = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE username='"+username+"';", long.class);
        String existingQuery = "SELECT user_id FROM haveuserpermissionproject WHERE user_id=" + user_id + " AND project_id="
                + project_id + ";";

        try {
            jdbcTemplate.queryForObject(existingQuery, long.class);
            return "Existing user project permission relationship";
        } catch (Exception e) {
            new PermissionController(jdbcTemplate).addNewEntry(new Permissions(0, permission_level));
            long permission_id = jdbcTemplate.queryForObject("SELECT MAX(permission_id) from permissions;", long.class);
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
        for(long permission_id: list) new PermissionController(jdbcTemplate).deleteEntry(permission_id);
        return "Success";
    }
}
