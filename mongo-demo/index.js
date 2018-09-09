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
    name: 'Node.js course',
    author: 'Mosh',
    tags: ['nodejs', 'backend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

createCourse();

