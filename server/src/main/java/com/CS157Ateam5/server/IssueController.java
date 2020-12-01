package com.CS157Ateam5.server;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class IssueController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin
    @GetMapping(value = "/issues")
    public @ResponseBody
    Object getIssues(@RequestParam(required = false, defaultValue = "0") long project_id,
                     @RequestParam(required = false, defaultValue = "0") long issue_id) {

        if(project_id != 0) {
            String query = "select issues.issue_id, issues.name, issues.description, issues.priority_level from issues " +
                    "join haveissues using (issue_id) join projects using (project_id)" + " where project_id=" + project_id + ";";

            List<Issues> issues = new ArrayList<>();
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
            for (Map row : rows) {
                Issues issue = new Issues((int) row.get("issue_id"), project_id, (String) row.get("name"),
                        (String) row.get("description"), (String) row.get("priority_level"));
                issues.add(issue);
            }
            return issues;
        }
        else {
            String query = "select * from issues where issue_id="+issue_id+";";
            Map<String, Object> map = jdbcTemplate.queryForMap(query);
            project_id = jdbcTemplate.queryForObject("SELECT project_id FROM haveissues WHERE issue_id="+issue_id+";",
                    long.class);
            return new Issues(issue_id, project_id, (String) map.get("name"), (String) map.get("description"),
                    (String) map.get("priority_level"));
        }
    }

    @PostMapping(value = "/issues")
    public @ResponseBody
    Issues addNewEntry(@RequestBody Issues issue) {
        jdbcTemplate.update("INSERT INTO issues(name, description, priority_level) values('" + issue.getName() + "', '"
                + issue.getDescription() + "', '" + issue.getPriorityLevel() + "');");
        long issue_id = jdbcTemplate.queryForObject("SELECT MAX(issue_id) from issues", long.class);
        new HaveTaskController(jdbcTemplate).addNewEntry(issue.getProject_id(), issue_id);
        issue.setIssue_id(issue_id);
        return issue;
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value = "/issues")
    public @ResponseBody Issues updateEntry(@RequestBody Issues issue) {
        String issueUpdateQuery = "UPDATE issues SET name='"+issue.getName()+"', description='"+issue.getDescription()+"'," +
                " priority_level='"+issue.getPriorityLevel()+"' WHERE issue_id="+issue.getIssue_id()+";";
        jdbcTemplate.update(issueUpdateQuery);
        return issue;
    }

    @DeleteMapping(value = "/issues")
    public @ResponseBody
    String deleteEntry(@RequestParam long issue_id) {
        String issueUpdateQuery = "DELETE FROM issues WHERE issue_id=" + issue_id + ";";
        jdbcTemplate.update(issueUpdateQuery);
        new HaveIssueController(jdbcTemplate).deleteEntry(0, issue_id);
        return "Success";
    }
}
