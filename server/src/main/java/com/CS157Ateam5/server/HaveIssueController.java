package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class HaveIssueController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public HaveIssueController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @CrossOrigin
    @PostMapping(value="/haveissues")
    public @ResponseBody String addNewEntry(long project_id, long issue_id) {

        String existingQuery = "SELECT issue_id FROM haveissues WHERE project_id="+project_id+" AND issue_id="
                + issue_id + ";";

        try {
            jdbcTemplate.queryForObject(existingQuery, long.class);
            return "Existing issue project relationship";
        }
        catch(Exception e){
            String projectIssueQuery = "INSERT INTO haveissues(project_id, issue_id) VALUES(" + project_id + ", " + issue_id + ");";
            jdbcTemplate.update(projectIssueQuery);
            return "Success";
        }
    }

    @DeleteMapping(value="/haveissues")
    public @ResponseBody String deleteEntry(@RequestParam(required = false, defaultValue = "0") long project_id,
                                            @RequestParam(required = false, defaultValue = "0") long issue_id) {
        String issueDeleteQuery = "";
        if(!(project_id==0)) {
            issueDeleteQuery = "DELETE FROM haveissues WHERE project_id=" + project_id + ";";
        }
        else if(!(issue_id==0)) {
            issueDeleteQuery = "DELETE FROM haveissues WHERE issue_id=" + issue_id + ";";
        }
        else return "Missing project_id and issue_id";
        jdbcTemplate.update(issueDeleteQuery);
        return "Success";
    }
}
