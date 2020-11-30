package com.CS157Ateam5.server;

public class Issues {
    private long issue_id;
    private long project_id;
    private String name;
    private String description;
    private String priority_level;


    public Issues(long issue_id, long project_id, String name, String description, String priority_level) {
        this.issue_id = issue_id;
        this.project_id = project_id;
        this.name = name;
        this.description = description;
        this.priority_level = priority_level;
    }

    public long getProject_id() {
        return project_id;
    }

    public void setProject_id(long project_id) {
        this.project_id = project_id;
    }

    public String getPriority_level() {
        return priority_level;
    }

    public void setPriority_level(String priority_level) {
        this.priority_level = priority_level;
    }

    public long getIssue_id() {
        return issue_id;
    }

    public void setIssue_id(long issue_id) {
        this.issue_id = issue_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriorityLevel() {
        return priority_level;
    }

    public void setPriorityLevel(String priority_level) {
        this.priority_level = priority_level;
    }

    @Override
    public String toString() {
        return "Tasks{" +
                "issue_id=" + issue_id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", priority_level='" + priority_level + '\'' +
                '}';
    }
}
