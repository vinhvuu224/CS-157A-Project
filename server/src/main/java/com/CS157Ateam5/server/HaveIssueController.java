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

    @CrossOrigin

    /*
        List Tasks in project
     */
    @GetMapping(value = "/haveissues")
    public @ResponseBody List<Long> getEntry(@RequestParam long projectId) {

       String projectIssueQuery = "SELECT issue_id FROM haveissues WHERE Project_id="+projectId+";";
       List<Long> projectIssueList = new ArrayList(jdbcTemplate.queryForList(projectIssueQuery, Long.class));
       return projectIssueList;
    }

    @PostMapping(value="/haveissues")
    public @ResponseBody String addNewEntry(long project_id, long issue_id) {

        String existingQuery = "SELECT issue_id FROM haveissues WHERE Project_id="+project_id+" AND issue_id="
                + issue_id + ";";

        try {
            jdbcTemplate.queryForObject(existingQuery, Long.class);
            return "Existing task project relationship";
        }
        catch(NullPointerException e){
            String projectIssueQuery = "INSERT INTO haveissues(project_id, issue_id) VALUES(" + project_id + ", " + issue_id + ");";
            jdbcTemplate.update(projectIssueQuery);
            return "Success";
        }
    }

    @DeleteMapping(value="/haveissues")
    public @ResponseBody String deleteEntry(@RequestParam long issue_id) {
        String issueUpdateQuery = "DELETE FROM haveissues WHERE issue_id="+issue_id+";";
        jdbcTemplate.update(issueUpdateQuery);
        return "Success";
    }
}
