package com.CS157Ateam5.server;

public class UserProjectGet {

    long user_id;
    String username;
    String permission_level;

    public UserProjectGet(long user_id, String username, String permission_level) {
        this.user_id = user_id;
        this.username = username;
        this.permission_level = permission_level;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPermission_level() {
        return permission_level;
    }

    public void setPermission_level(String permission_level) {
        this.permission_level = permission_level;
    }
}
