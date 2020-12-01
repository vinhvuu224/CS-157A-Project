package com.CS157Ateam5.server;

public class ProjectInfo {
    private long project_id;
    private String project_name;


    public ProjectInfo(long project_id, String project_name) {
        this.project_id = project_id;
        this.project_name = project_name;
    }

    public long getProject_id() {
        return project_id;
    }

    public String getProject_name() {
        return project_name;
    }

    public void setProject_id(long project_id) {
        this.project_id = project_id;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }


}
