package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class TaskController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping(value="/tasks")
    public @ResponseBody List<Long> getUserIds(@RequestParam String taskName) {
        String taskIDQuery = "SELECT task_id FROM tasks WHERE name = '"+taskName+ "';";
        List<Long> taskIDList = new ArrayList(jdbcTemplate.queryForList(taskIDQuery, Long.class));
        return taskIDList;
    }


    @PostMapping(value="/tasks")
    public @ResponseBody String addNewEntry(@RequestBody Tasks task) {
            jdbcTemplate.update("INSERT INTO Tasks(name, description, progress) values('" + task.getName() + "', '"
                    + task.getDescription() + "', '"+task.getProgress()+"');");
        return "Successful";
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value="/tasks")
    public @ResponseBody String updateEntry(@RequestParam long task_id, @RequestParam String paramName,
                                            @RequestParam Object paramValue) {
        String taskUpdateQuery = "UPDATE tasks SET " + paramName + " = " + paramValue + " WHERE task_id="+task_id+";";
        jdbcTemplate.execute(taskUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value="/tasks")
    public @ResponseBody String deleteEntry(@RequestParam long task_id) {
        String taskUpdateQuery = "DELETE FROM tasks WHERE task_id="+task_id+";";
        jdbcTemplate.execute(taskUpdateQuery);
        return "Success";
    }
}
