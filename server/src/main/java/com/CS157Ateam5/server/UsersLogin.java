package com.CS157Ateam5.server;

public class UsersLogin {

    private String emailUsername, password;

    public UsersLogin(String emailUsername, String password) {

        this.emailUsername = emailUsername;
        this.password = password;
    }

	public String getUsernameEmail() {
		return emailUsername;
	}

	public void setUsername(String username) {
		this.emailUsername = username;
	}


	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
    public String toString() {
        return String.format(
                "User[id=%d, username='%s', email='%s']",
                emailUsername, password);
    }
}