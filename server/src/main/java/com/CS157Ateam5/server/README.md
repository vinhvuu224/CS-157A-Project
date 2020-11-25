API Usage guide:

All DELETE Requests take one parameter: entity id, unless otherwise specified. 
All POST requests, unless specified otherwise, need a body containing all attributes of the entity (except id).
All GET, PATCH, and DELETE requests take parameters.

/location - For accessing `location` entity
- GET: Provide city and state to get location id.
- PATCH: Provide location_id, name of the parameter to be changed (e.g. "state"), and parameter value. 

/permissions - For accessing `permissions` entity
- GET: No get
- PATCH: Provide permission_id, and new permission_level. 

/projects- For accessing `projects` entity
- GET: Provide project_id to get project_name OR provide project_name to get all related project_ids.
- PATCH: Provide project_id, and new projectName. 

/tasks- For accessing `tasks` entity
- GET: Provide task_id to get task attributes OR provide taskName to get all related task_ids.
- PATCH: Provide task_id, name of the parameter to be changed (e.g. "description"), and parameter value. 

/ - For accessing `users` entity
- GET: Provide a username to get user attributes.

/login - For logging in
- No Get, Patch, Delete

/userprojects- For accessing `haveuserpermissionproject` entity
- GET: Provide a username to get all connected project_ids OR provide project_id to get all connected usernames.
- PATCH: Provide user_id, project_id, and new permission_id 
- POST: Provide user_id, project_id, and permission_id 

/issues- For accessing `issues` entity
- GET: Provide issue_id to get issue attributes OR provide issueName to get all related issue_ids.
- PATCH: Provide issue_id, name of the parameter to be changed (e.g. "description"), and parameter value. 

/haveissues- For accessing `haveissues` entity
- GET: Provide project_id to get all related issues
- PATCH: No patch
- DELETE: Provide issue_id to delete issue-project relationship OR project_id to delete all related issues.

/havetasks - For accessing `havetasks` entity
- GET: Provide project_id to get all related tasks
- PATCH: No patch
- DELETE: Provide task_id to delete task-project relationship OR project_id to delete all related tasks.

/in - For accessing `in` entity
- GET: Provide user_id to get related location_id.
- PATCH: Provide user_id, and new location_id. 

