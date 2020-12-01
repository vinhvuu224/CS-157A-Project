package com.CS157Ateam5.server;

public class RegistErrorChecker {
	private String emailError, usernameError, confirmPasswordError, token, username, email;
	private long user_id;
	
	public RegistErrorChecker(String emailError, String usernameError, String confirmPasswordError, String token, long user_id, String username, String email ) {
		this.emailError = emailError;
		this.usernameError = usernameError;
		this.confirmPasswordError = confirmPasswordError;
		this.token = token;
		this.user_id = user_id;
		this.username = username;
		this.email = email;
	}
	

	public String getToken() {
		return token;
	}


	public void setToken(String token) {
		this.token = token;
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


	public long getUser_id() {
		return user_id;
	}


	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}


	public String getEmailError() {
		return emailError;
	}

	public void setEmailError(String emailError) {
		this.emailError = emailError;
	}

	public String getUsernameError() {
		return usernameError;
	}

	public void setUsernameError(String usernameError) {
		this.usernameError = usernameError;
	}

	public String getConfirmPasswordError() {
		return confirmPasswordError;
	}

	public void setConfirmPasswordError(String confirmPasswordError) {
		this.confirmPasswordError = confirmPasswordError;
	}
	
	
}
