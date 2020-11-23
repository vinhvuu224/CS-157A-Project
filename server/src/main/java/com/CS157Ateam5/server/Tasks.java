package com.CS157Ateam5.server;

public class Tasks {
    private long task_id;
    private String name;
    private String description;
    private String progress;

    public Tasks(long task_id, String name, String description, String progress) {
        this.task_id = task_id;
        this.name = name;
        this.description = description;
        this.progress = progress;
    }

    public long getTask_id() {
        return task_id;
    }

    public void setTask_id(long task_id) {
        this.task_id = task_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    @Override
    public String toString() {
        return "Tasks{" +
                "task_id=" + task_id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", progress='" + progress + '\'' +
                '}';
    }
}
