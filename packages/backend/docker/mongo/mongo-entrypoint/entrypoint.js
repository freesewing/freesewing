var db = connect("mongodb://localhost/admin");

db.createUser(
  {
    user: "admin",
    pwd: "skully",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
