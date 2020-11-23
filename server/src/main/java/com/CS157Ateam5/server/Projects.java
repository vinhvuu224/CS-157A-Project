package com.CS157Ateam5.server;

public class Projects {
    private long project_id;
    private String projectName;

    public Projects(long project_id, String projectName) {
        this.project_id = project_id;
        this.projectName = projectName;
    }

    public long getProject_id() {
        return project_id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProject_id(long project_id) {
        this.project_id = project_id;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }



    @Override
    public String toString() {
        return String.format(
                "Project[id=%d, projectName='%s']", project_id, projectName);
    }
}
