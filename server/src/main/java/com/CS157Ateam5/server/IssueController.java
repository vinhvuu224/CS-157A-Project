package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class IssueController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin
    @GetMapping(value="/issues")
    public @ResponseBody List<Long> getUserIds(@RequestParam String issueName) {
        String issueIDQuery = "SELECT issue_id FROM issues WHERE name = '"+ issueName + "';";
        List<Long> issueIDList = new ArrayList(jdbcTemplate.queryForList(issueIDQuery, Long.class));
        return issueIDList;
    }


    @PostMapping(value="/issues")
    public @ResponseBody String addNewEntry(@RequestBody Issues issue) {
            jdbcTemplate.update("INSERT INTO issues(name, description, priority_level) values('" + issue.getName() + "', '"
                    + issue.getDescription() + "', '"+issue.getPriorityLevel()+"');");
        return "Successful";
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value="/issues")
    public @ResponseBody String updateEntry(@RequestParam long issue_id, @RequestParam String paramName,
                                            @RequestParam Object paramValue) {
        String taskUpdateQuery = "UPDATE issues SET " + paramName + " = " + paramValue + " WHERE issue_id="+issue_id+";";
        jdbcTemplate.execute(taskUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value="/issues")
    public @ResponseBody String deleteEntry(@RequestParam long issue_id) {
        String issueUpdateQuery = "DELETE FROM issues WHERE issue_id="+issue_id+";";
        jdbcTemplate.execute(issueUpdateQuery);
        return "Success";
    }
}
