package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class PermissionController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public PermissionController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @CrossOrigin
    @GetMapping(value = "/permissions")
    public @ResponseBody
    List<Permissions> getPermissionId(@RequestParam long permission_id) {
        String permissionQuery = "SELECT * FROM permissions WHERE permission_id="+permission_id+";";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(permissionQuery);
        List<Permissions> list = new ArrayList<>();
        for (Map row : rows) {
            Permissions permission = new Permissions((int) row.get("permission_id"), (String) row.get("permission_level"));
            list.add(permission);
        }
        return list;
    }

    @PostMapping(value="/permissions")
    public @ResponseBody String addNewEntry(@RequestBody Permissions permission) {
        jdbcTemplate.update("INSERT INTO permissions(permission_level) values('" + permission.getPermission_level()+"')");
        return "Successful";
    }

    @PatchMapping(value="/permissions")
    public @ResponseBody String updateEntry(@RequestParam long permission_id, @RequestParam String permission_level){
        String permissionUpdateQuery = "UPDATE permissions SET permission_level = '" + permission_level + "' WHERE" +
                " permission_id="+permission_id+";";
        jdbcTemplate.update(permissionUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value="/permissions")
    public @ResponseBody String deleteEntry(@RequestParam long permission_id) {
        String permissionDeleteQuery = "DELETE FROM permissions WHERE permission_id="+permission_id+";";
        jdbcTemplate.update(permissionDeleteQuery);
        return "Success";
    }
}
