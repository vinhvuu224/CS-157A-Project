package com.CS157Ateam5.server;

public class Location {
    private long location_id;
    private String username;
    private String city;
    private String state;
    private String country;
    private String time_zone;

    public Location(long location_id, String username, String city, String state, String country, String time_zone) {
        this.location_id = location_id;
        this.username = username;
        this.city = city;
        this.state = state;
        this.country = country;
        this.time_zone = time_zone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTime_zone() {
        return time_zone;
    }

    public void setTime_zone(String time_zone) {
        this.time_zone = time_zone;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "Location{" +
                "location_id=" + location_id +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", time_zone='" + time_zone + '\'' +
                '}';
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public long getLocation_id() {
        return location_id;
    }

    public String getCity() {
        return city;
    }

    public void setLocation_id(long location_id) {
        this.location_id = location_id;
    }

    public void setCity(String city) {
        this.city = city;
    }


}
