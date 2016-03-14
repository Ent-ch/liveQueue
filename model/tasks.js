Tasks = new Mongo.Collection('tasks');

Tasks.allow({
  insert: function(userId, task) {
    task.createdAt = new Date();
    task.name_sort = task.name.toLowerCase();
    return true;
  },
  update: function(userId, task, fields, modifier) {
    task.createdAt = new Date();
    task.name_sort = task.name.toLowerCase();
    return true;
  },
  remove: function(userId, task) {
    return true;
  }
});
