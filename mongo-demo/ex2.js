const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error:', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});
// createCourse();
async function run() {
    const courses = await getCourses();
    console.log(courses);
}

async function getCourses() {
    const pageNumber = 1;
    const pageSize = 10;
    return await Course
        .find({ tags: {$in: ['backend', 'frontend']}, isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort('-price')
        .select({ name: 1, author: 1, price: 1});
}

const Course = mongoose.model('Course', courseSchema);
run();