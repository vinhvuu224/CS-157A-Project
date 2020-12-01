package com.CS157Ateam5.server;

public class LoginChecker {
	private String userEmailError, passError, token, username, email;
	private long user_id;
	
	
	public LoginChecker() {
		
	}
	
    public LoginChecker(String userEmailError, String passError, String token, long user_id, String username, String email) {

        this.userEmailError = userEmailError;
        this.passError = passError;
        this.token = token;
        this.user_id = user_id;
        this.username = username;
        this.email = email;
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

	public String getUserEmailError() {
		return userEmailError;
	}


	public void setUserEmailError(String userEmailError) {
		this.userEmailError = userEmailError;
	}



	public String getPasswordError() {
		return passError;
	}



	public void setPasswordError(String passwordError) {
		this.passError = passwordError;
	}



	public String getToken() {
		return token;
	}



	public void setToken(String token) {
		this.token = token;
	}



	public long getUser_id() {
		return user_id;
	}


	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}

	@Override
	public String toString() {
		return "LoginChecker [userEmailError=" + userEmailError + ", passError=" + passError + ", token=" + token
				+ ", username=" + username + ", email=" + email + ", user_id=" + user_id + "]";
	}

}
