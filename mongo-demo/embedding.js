const mongoose = require('mongoose');
/* const mongoose = require('mongoose').set('debug', true); */

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $set: {
      'author.name': 'John Smith'
    }
   /*  $unset: {     //  used to remove embedded object from document
      'author': ''
    } */
  });
  /* const course = await Course.findById(courseId);
  course.author.name = 'Mosh Hamedani';
  course.save(); */
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
/* createCourse('Node Course', [
  new Author({ name:'Mosh', bio:'Test', website:'test' }), 
  new Author({ name:'John', bio:'Test', website:'test' })
]); */
/* addAuthor('624de24c7dda6d0542cf741c', new Author({name: 'Nate'})); */
removeAuthor('624de24c7dda6d0542cf741c', '624de32b2e4d7fb566f712d5');

//updateAuthor('624b631a58207872ff4475bf');
