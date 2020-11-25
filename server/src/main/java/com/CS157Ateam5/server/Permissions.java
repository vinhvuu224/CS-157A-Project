package com.CS157Ateam5.server;

public class Permissions {
    private long permission_id;
    private String permission_level;

    public Permissions(long permission_id, String permission_level) {
        this.permission_id = permission_id;
        this.permission_level = permission_level;
    }

    public long getPermission_id() {
        return permission_id;
    }

    public String getPermission_level() {
        return permission_level;
    }

    public void setPermission_id(long permission_id) {
        this.permission_id = permission_id;
    }

    public void setPermission_level(String permission_level) {
        this.permission_level = permission_level;
    }



    @Override
    public String toString() {
        return String.format(
                "Permission[id=%d, projectName='%s']", permission_id, permission_level);
    }
}
