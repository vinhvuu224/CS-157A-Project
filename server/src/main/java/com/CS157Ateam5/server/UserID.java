package com.CS157Ateam5.server;

public class UserID {

    private long user_id;
    private String username;

    public UserID(long user_id, String username) {
        this.user_id = user_id;
        this.username = username;
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
}
