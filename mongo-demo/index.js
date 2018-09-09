const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Could not connect to database:', err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'React course',
    author: 'Mosh',
    tags: ['react', 'backend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course
    .find({ author: 'Mosh', isPublished: true }) // match da query
    .limit(10) // limite de resultados
    .sort({ name: 1 }) // ordena por ordem crescente de nome
    .select({ name: 1, tags: 1 }); // seleciona apenas os atributos especificos

  console.log(courses);
}

getCourses();

