package com.CS157Ateam5.server;

public class UserDetails {

    private long user_id;
    private long project_id;
    private long permission_id;
    private long location_id;
    private String email;
    private String username;
    private String password;
    private String city;
    private String state;
    private String country;
    private String project_name;
    private String permission_level;

    public UserDetails(long user_id, long project_id, long permission_id, long location_id, String email,
                       String username, String password, String city, String state, String country, String project_name,
                       String time_zone, String permission_level) {
        this.user_id = user_id;
        this.project_id = project_id;
        this.permission_id = permission_id;
        this.location_id = location_id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.city = city;
        this.state = state;
        this.country = country;
        this.project_name = project_name;
        this.time_zone = time_zone;
        this.permission_level = permission_level;
    }

    public long getProject_id() {
        return project_id;
    }

    public void setProject_id(long project_id) {
        this.project_id = project_id;
    }

    public long getPermission_id() {
        return permission_id;
    }

    public void setPermission_id(long permission_id) {
        this.permission_id = permission_id;
    }

    public long getLocation_id() {
        return location_id;
    }

    public void setLocation_id(long location_id) {
        this.location_id = location_id;
    }


    @Override
    public String toString() {
        return "UserDetails{" +
                "user_id=" + user_id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", project_name='" + project_name + '\'' +
                ", time_zone='" + time_zone + '\'' +
                ", permission_level='" + permission_level + '\'' +
                '}';
    }

    public String getProject_name() {
        return project_name;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }

    public String getPermission_level() {
        return permission_level;
    }

    public void setPermission_level(String permission_level) {
        this.permission_level = permission_level;
    }
    private String time_zone;

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getTime_zone() {
        return time_zone;
    }

    public void setTime_zone(String time_zone) {
        this.time_zone = time_zone;
    }
}
