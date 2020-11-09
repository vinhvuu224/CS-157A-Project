package com.CS157Asection09team5.backend;

public class Users {
    private long user_id;
    private String username, email, password;

    public Users(long user_id, String username, String email, String password) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return String.format(
                "User[id=%d, username='%s', email='%s']",
                user_id, username, email);
    }
}
