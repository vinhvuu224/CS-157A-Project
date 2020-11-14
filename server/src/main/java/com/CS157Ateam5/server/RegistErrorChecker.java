package com.CS157Ateam5.server;

public class RegistErrorChecker {
	String emailError = "";
	String usernameError = "";
	String confirmPasswordError = "";
	
	public RegistErrorChecker(String emailError, String usernameError, String confirmPasswordError ) {
		this.emailError = emailError;
		this.usernameError = usernameError;
		this.confirmPasswordError = confirmPasswordError;
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
