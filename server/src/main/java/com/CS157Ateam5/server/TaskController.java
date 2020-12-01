package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

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
    Object getTasks(@RequestParam(required = false, defaultValue = "0") long project_id,
                    @RequestParam(required = false, defaultValue = "0") long task_id) {

        if(project_id != 0) {
            String query = "select tasks.task_id, tasks.name, tasks.description, tasks.progress from tasks " +
                    "join havetasks using (task_id) join projects using (project_id)" + " where project_id=" + project_id + ";";

            List<Tasks> tasks = new ArrayList<>();
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
            for (Map row : rows) {
                Tasks task = new Tasks((int) row.get("task_id"), project_id, (String) row.get("name"),
                        (String) row.get("description"), (String) row.get("progress"));
                tasks.add(task);
            }
            return tasks;
        }
        else {
            String query = "select * from tasks where task_id="+task_id+";";
            Map<String, Object> map = jdbcTemplate.queryForMap(query);
            project_id = jdbcTemplate.queryForObject("SELECT project_id FROM havetasks WHERE task_id="+task_id+";",
                    long.class);
            return new Tasks(task_id, project_id, (String) map.get("name"), (String) map.get("description"),
                    (String) map.get("progress"));
        }
    }

    @PostMapping(value = "/tasks")
    public @ResponseBody
    Tasks addNewEntry(@RequestBody Tasks task) {
        jdbcTemplate.update("INSERT INTO tasks(name, description, progress) values('" + task.getName() + "', '"
                + task.getDescription() + "', '" + task.getProgress() + "');");
        long task_id = jdbcTemplate.queryForObject("SELECT MAX(task_id) from tasks", long.class);
        new HaveTaskController(jdbcTemplate).addNewEntry(task.getProject_id(), task_id);
        task.setTask_id(task_id);
        return task;
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value = "/tasks")
    public @ResponseBody Tasks updateEntry(@RequestBody Tasks task) {
        String taskUpdateQuery = "UPDATE tasks SET name='"+task.getName()+"', description='"+task.getDescription()+"'," +
                " progress='"+task.getProgress()+"' WHERE task_id="+task.getTask_id()+";";
        jdbcTemplate.update(taskUpdateQuery);
        return task;
    }

    @DeleteMapping(value = "/tasks")
    public @ResponseBody
    String deleteEntry(@RequestParam long task_id) {
        String taskDeleteQuery = "DELETE FROM tasks WHERE task_id=" + task_id + ";";
        jdbcTemplate.update(taskDeleteQuery);
        new HaveTaskController(jdbcTemplate).deleteEntry(0, task_id);
        return "Success";
    }
}
