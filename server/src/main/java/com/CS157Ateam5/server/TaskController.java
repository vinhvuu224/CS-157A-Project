package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class TaskController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin
    @GetMapping(value = "/tasks")
    public @ResponseBody
    Object getTask(@RequestParam(required = false, defaultValue = "0") long task_id,
                   @RequestParam(required = false, defaultValue = "") String taskName) {

        if (!(task_id == 0)) {
            String taskNameQuery = "SELECT * FROM tasks WHERE task_id = '" + task_id + "';";

            List<Tasks> tasks = new ArrayList<>();
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(taskNameQuery);
            for (Map row : rows) {
                Tasks task = new Tasks((int) row.get("task_id"), (String) row.get("name"),
                        (String) row.get("description"), (String) row.get("progress"));
                tasks.add(task);
            }
            return tasks;
        } else if (!taskName.equals("")) {
            String taskIDQuery = "SELECT task_id FROM tasks WHERE name = '" + taskName + "';";
            List<Long> taskIDList = new ArrayList(jdbcTemplate.queryForList(taskIDQuery, Long.class));
            return taskIDList;
        } else {
            return "missing taskName and taskId params";
        }
    }


    @PostMapping(value = "/tasks")
    public @ResponseBody
    String addNewEntry(@RequestBody Tasks task) {
        jdbcTemplate.update("INSERT INTO Tasks(name, description, progress) values('" + task.getName() + "', '"
                + task.getDescription() + "', '" + task.getProgress() + "');");
        return "Successful";
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value = "/tasks")
    public @ResponseBody
    String updateEntry(@RequestParam long task_id, @RequestParam String paramName,
                       @RequestParam Object paramValue) {
        String taskUpdateQuery = "UPDATE tasks SET " + paramName + " = " + paramValue + " WHERE task_id=" + task_id + ";";
        jdbcTemplate.update(taskUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value = "/tasks")
    public @ResponseBody
    String deleteEntry(@RequestParam long task_id) {
        String taskUpdateQuery = "DELETE FROM tasks WHERE task_id=" + task_id + ";";
        jdbcTemplate.update(taskUpdateQuery);
        return "Success";
    }
}
