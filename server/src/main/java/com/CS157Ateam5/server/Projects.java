package com.CS157Ateam5.server;

public class Projects {
    private long project_id;
    private String project_name;
    private String username;
    private String permission_level;

    public Projects(long project_id, String project_name, String username, String permission_level) {
        this.project_id = project_id;
        this.project_name = project_name;
        this.username = username;
        this.permission_level = permission_level;
    }

    @Override
    public String toString() {
        return "Projects{" +
                "project_id=" + project_id +
                ", project_name='" + project_name + '\'' +
                ", username='" + username + '\'' +
                '}';
    }

    public String getPermission_level() {
        return permission_level;
    }

    public void setPermission_level(String permission_level) {
        this.permission_level = permission_level;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
