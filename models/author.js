var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {

// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case

  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }

  return fullname;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {

  return (((this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '') + " to " + (this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : ''))).toString();
  //return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for author's date of birth
AuthorSchema
.virtual('virtual_date_of_birth')
.get(function () {
  if(typeof this.date_of_birth === "undefined"){
    return "";
  }
  else {
    return moment(this.date_of_birth).format('YYYY-MM-DD');
  }
});

// Virtual for author's date of death
AuthorSchema
.virtual('virtual_date_of_death')
.get(function () {
  if(typeof this.date_of_death === "undefined"){
    return "";
  }
  else {
    return moment(this.date_of_death).format('YYYY-MM-DD');
  }

});


// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
