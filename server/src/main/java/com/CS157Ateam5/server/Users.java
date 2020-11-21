package com.CS157Ateam5.server;

public class Users {
    private long user_id;
<<<<<<< HEAD:server/src/main/java/com/CS157Ateam5/server/Users.java
    private String username, email, password;

    public Users(long user_id, String username, String email, String password) {
=======
    private String username, email, password, confirmPassword;

    public Users(long user_id, String username, String email, String password, String confirmPassword) {
>>>>>>> 8444e688a201486e7f8e3b55c7b767f9891b0e13:backend/src/main/java/com/CS157Aproject/backend/Users.java
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
<<<<<<< HEAD:server/src/main/java/com/CS157Ateam5/server/Users.java
=======
        this.confirmPassword = confirmPassword;
>>>>>>> 8444e688a201486e7f8e3b55c7b767f9891b0e13:backend/src/main/java/com/CS157Aproject/backend/Users.java
    }

    public long getUser_id() {
		return user_id;
	}

<<<<<<< HEAD:server/src/main/java/com/CS157Ateam5/server/Users.java
=======
	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

>>>>>>> 8444e688a201486e7f8e3b55c7b767f9891b0e13:backend/src/main/java/com/CS157Aproject/backend/Users.java
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