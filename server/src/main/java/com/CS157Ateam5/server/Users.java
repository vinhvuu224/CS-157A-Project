package com.CS157Ateam5.server;


public class Users {
    private long user_id;

    private String username, email, password, confirmPassword;

    public Users(long user_id, String username, String email, String password, String confirmPassword) {

        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;

        this.confirmPassword = confirmPassword;
    }

    public long getUser_id() {
		return user_id;
	}


	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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
                user_id, username, email);
    }
}