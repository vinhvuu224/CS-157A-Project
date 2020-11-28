package com.CS157Ateam5.server;

public class ProjectDetails {

    private long task_id;
    private String task_name;
    private String task_description;
    private String progress;
    private long issue_id;
    private String issue_name;
    private String issue_description;
    private String priority_level;
    private long project_id;
    private String project_name;

    public ProjectDetails(long project_id, String project_name, long task_id, String task_name, String task_description,
                          String progress, long issue_id, String issue_name, String issue_description,
                          String priority_level) {
        this.project_id = project_id;
        this.project_name = project_name;
        this.task_id = task_id;
        this.task_name = task_name;
        this.task_description = task_description;
        this.progress = progress;
        this.issue_id = issue_id;
        this.issue_name = issue_name;
        this.issue_description = issue_description;
        this.priority_level = priority_level;
    }

    @Override
    public String toString() {
        return "ProjectDetails{" +
                "project_id=" + project_id +
                ", project_name='" + project_name + '\'' +
                ", task_id=" + task_id +
                ", task_name='" + task_name + '\'' +
                ", task_description='" + task_description + '\'' +
                ", progress='" + progress + '\'' +
                ", issue_id=" + issue_id +
                ", issue_name='" + issue_name + '\'' +
                ", issue_description='" + issue_description + '\'' +
                ", priority_level='" + priority_level + '\'' +
                '}';
    }

    public long getProject_id() {
        return project_id;
    }

    public void setProject_id(long project_id) {
        this.project_id = project_id;
    }

    public String getProject_name() {
        return project_name;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }

    public long getTask_id() {
        return task_id;
    }

    public void setTask_id(long task_id) {
        this.task_id = task_id;
    }

    public String getTask_name() {
        return task_name;
    }

    public void setTask_name(String task_name) {
        this.task_name = task_name;
    }

    public String getTask_description() {
        return task_description;
    }

    public void setTask_description(String task_description) {
        this.task_description = task_description;
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public long getIssue_id() {
        return issue_id;
    }

    public void setIssue_id(long issue_id) {
        this.issue_id = issue_id;
    }

    public String getIssue_name() {
        return issue_name;
    }

    public void setIssue_name(String issue_name) {
        this.issue_name = issue_name;
    }

    public String getIssue_description() {
        return issue_description;
    }

    public void setIssue_description(String issue_description) {
        this.issue_description = issue_description;
    }

    public String getPriority_level() {
        return priority_level;
    }

    public void setPriority_level(String priority_level) {
        this.priority_level = priority_level;
    }
}
