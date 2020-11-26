package com.CS157Ateam5.server;


import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
@CrossOrigin
public class HaveTaskController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public HaveTaskController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @CrossOrigin
    @PostMapping(value="/havetasks")
    public @ResponseBody String addNewEntry(long project_id, long task_id) {

        String existingQuery = "SELECT task_id FROM havetasks WHERE project_id="+project_id+" AND task_id="+ task_id + ";";

        try {
            jdbcTemplate.queryForObject(existingQuery, long.class);
            return "Existing task project relationship";
        }
        catch(Exception e){
            String projectTaskQuery = "INSERT INTO havetasks(project_id, task_id) VALUES(" + project_id + ", " + task_id
                    + ");";
            jdbcTemplate.update(projectTaskQuery);
            return "Success";
        }
    }

    @DeleteMapping(value="/havetasks")
    public @ResponseBody String deleteEntry(@RequestParam(required = false, defaultValue = "0") long project_id,
                                            @RequestParam(required = false, defaultValue = "0") long task_id) {
        String taskDeleteQuery = "";
        if(!(project_id==0)) {
            taskDeleteQuery = "DELETE FROM havetasks WHERE Project_id=" + project_id + ";";
        }
        else if(!(task_id==0)) {
            taskDeleteQuery = "DELETE FROM havetasks WHERE Task_id=" + task_id + ";";
        }
        else return "Missing project_id and task_id";
        jdbcTemplate.update(taskDeleteQuery);
        return "Success";
    }
}
