package com.CS157Ateam5.server;

public class UsersLogin {

    private String usernameEmail, password;

    public UsersLogin(String usernameEmail, String password) {

        this.usernameEmail = usernameEmail;
        this.password = password;
    }

	public String getUsernameEmail() {
		return usernameEmail;
	}

	public void setUsername(String username) {
		this.usernameEmail = username;
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
                usernameEmail, password);
    }
}