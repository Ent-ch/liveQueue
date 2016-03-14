Brands = new Mongo.Collection('brands');

Brands.allow({
  insert: function(userId, brand) {
    return false;
  },
  update: function(userId, brand, fields, modifier) {
    return false;
  },
  remove: function(userId, brand) {
    return false;
  }
});
