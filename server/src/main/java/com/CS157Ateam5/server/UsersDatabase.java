package com.CS157Ateam5.server;

public class UsersDatabase {
	private long userId;
	private String email;
	private String passwordHash;
	private String username;
	public UsersDatabase(long userId, String email, String passwordHash, String username) {
		this.userId = userId;
		this.email = email;
		this.passwordHash = passwordHash;
		this.username = username;
		
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPasswordHash() {
		return passwordHash;
	}
	public void setPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String toString() {
		return "UsersDatabase(email: " + email + ", passwordHash: " + passwordHash + ", username: " + username + ")";
	}
}
