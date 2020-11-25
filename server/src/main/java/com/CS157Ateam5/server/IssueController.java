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
    Object getIssue(@RequestParam(required = false, defaultValue = "0") long issue_id,
                    @RequestParam(required = false, defaultValue = "") String issueName) {

        if (!(issue_id == 0)) {
            String issueNameQuery = "SELECT * FROM issues WHERE issue_id = '" + issue_id + "';";

            List<Issues> issues = new ArrayList<>();
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(issueNameQuery);
            for (Map row : rows) {
                Issues issue = new Issues((int) row.get("issue_id"), (String) row.get("name"),
                        (String) row.get("description"), (String) row.get("priority_level"));
                issues.add(issue);
            }
            return issues;
        } else if (!issueName.equals("")) {
            String issueIDQuery = "SELECT issue_id FROM issues WHERE name = '" + issueName + "';";
            List<Long> issueIDList = new ArrayList(jdbcTemplate.queryForList(issueIDQuery, Long.class));
            return issueIDList;
        } else return "Missing issue_id and issueName";
    }


    @PostMapping(value = "/issues")
    public @ResponseBody
    String addNewEntry(@RequestBody Issues issue) {
        jdbcTemplate.update("INSERT INTO issues(name, description, priority_level) values('" + issue.getName() + "', '"
                + issue.getDescription() + "', '" + issue.getPriorityLevel() + "');");
        return "Successful";
    }

    /*
        Provide parameter name to be changed and the new value when sending request
     */
    @PatchMapping(value = "/issues")
    public @ResponseBody
    String updateEntry(@RequestParam long issue_id, @RequestParam String paramName,
                       @RequestParam Object paramValue) {
        String issueUpdateQuery = "UPDATE issues SET " + paramName + " = " + paramValue + " WHERE issue_id=" + issue_id + ";";
        jdbcTemplate.update(issueUpdateQuery);
        return "Success";
    }

    @DeleteMapping(value = "/issues")
    public @ResponseBody
    String deleteEntry(@RequestParam long issue_id) {
        String issueUpdateQuery = "DELETE FROM issues WHERE issue_id=" + issue_id + ";";
        jdbcTemplate.update(issueUpdateQuery);
        return "Success";
    }
}
