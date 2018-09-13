const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Could not connect to database:', err));

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  categories: {
    type: String,
    required: true,
    enum: ['web', 'backend', 'frontend'],
    lowercase: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model('Course', courseSchema);

// create
async function createCourse() {
  const course = new Course({
    // name: 'React course',
    author: 'Mosh',
    categories: 'ué',
    // tags: ['react', 'backend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

// read
async function getCourses({page = 0, limit = 10}) {
  const courses = await Course
    .find({ author: 'Mosh', isPublished: true }) // match da query
    .skip(page * limit)
    .limit(10) // limite de resultados
    .sort({ name: 1 }) // ordena por ordem crescente de nome
    .select({ name: 1, tags: 1 }); // seleciona apenas os atributos especificos

  console.log(courses);
}

// update query first
async function updateCourseQueryFirst(id) {
  const course = await Course.findById(id);
  if(!course) return;

  course.isPublished = true;
  course.author = 'Philipe Felix';

  const result = await course.save();
  return result;
}

// update first without result
async function updateCourseWithoutResult(id) {
  const result = await Course.update({ _id: id }, {
    $set: {
      author: 'Phill Felix',
      isPublished: false
    }
  });

  return result;
}

// update first with result
async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Phill Felix',
      isPublished: false
    }
  }, { new: true }); // gets updated document instead of original

  return result;
}

// delete
async function removeCourse(id) {
  // const result = Course.deleteOne({ _id: id });
  // return result;

  const course = Course.findByIdAndRemove(id);
  return course;
}

createCourse("5b9675fc439f48f08ae15186")
  .then(result => console.log(result))
  .catch(err => console.error(err.message));
