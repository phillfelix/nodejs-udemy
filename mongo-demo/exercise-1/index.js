const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true });

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getBackendCourses() {
  const courses = await Course.find({ tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  return courses;
}

async function getCoursesSortedByPrice() {
  const courses = await Course.find({ tags: { $in: ['backend', 'frontend'] } })
    .sort('-price')
    .select('name author price');

  return courses;
}

async function getCoursesExercise3() {
  const courses = await Course.find()
    .or([
      { price: { $gte: 15 } },
      { name: /by/i }
    ])
    .select('name price');

    return courses;
}

async function execute() {
  const backendCourses = await getBackendCourses();
  console.log('backendCourses:\n\n', backendCourses);

  const sortedByPrice = await getCoursesSortedByPrice();
  console.log('\n\n\nsortedByPrice:\n\n', sortedByPrice);

  const exercise3Query = await getCoursesExercise3();
  console.log('\n\n\nexercise3Query:\n\n', exercise3Query);
}


execute();
