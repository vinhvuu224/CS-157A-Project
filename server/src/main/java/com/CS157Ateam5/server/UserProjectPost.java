package com.CS157Ateam5.server;

public class UserProjectPost {

    private String username;
    private long project_id;
    private String permission_level;

    public UserProjectPost(String username, long project_id, String permission_level) {
        this.username = username;
        this.project_id = project_id;
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

    public void setProject_id(long project_id) {
        this.project_id = project_id;
    }

    public String getPermission_level() {
        return permission_level;
    }

    public void setPermission_level(String permission_level) {
        this.permission_level = permission_level;
    }
}
