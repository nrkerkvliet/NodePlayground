const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error:', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'Angular Course',
    author: 'Nate',
    tags: ['angular', 'frontend'],
    isPublished: true
});


// createCourse();
// getCourses();
// updateCourseQueryFirst('62420f1614efa563dc5a9bea');
// updateCourseQueryAfter('62420f1614efa563dc5a9bea');
removeCourse('62420f1614efa563dc5a9bea');

async function createCourse() {
    const result = await course.save();
    console.log(result);
}

async function updateCourseQueryFirst(id) {
    const course = await Course.findById(id);
    if(!course) return;
    /* course.isPublished = true;
    course.author = 'Another Author'; */
    course.set({
        isPublished: true,
        author: 'Another Author'
    });

    const result = await course.save();
    console.log(result);
}

async function updateCourseQueryAfter(id) {
   /*  const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    }); */
    const result = await Course.findByIdAndUpdate(id , {
        $set: {
            author: 'Mosh',
            isPublished: true
        }
    }, {new: true});
    // passing new true into findByIdAndUpdate returns updated document instead of pre update
    console.log(result);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    // const course = await Course.findByIdAndRemove(id);
    // const result = await Course.deleteMany({ isPublished: false });
    console.log(result);
 }

async function getCourses() {
    /* const courses = await Course.find(); */
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in (in)
    // nin (non in)

    // or
    // and

    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
           // .find({ price: { $gt: 10, $lte: 20 } }) // courses greater than 10 and less than or equal to 10 */
           // .find({ price: { $in: [10, 15, 20]} }) 
           // .or([ { author: 'Nate' }, { isPublished: true }])  // courses authored by Nate or ispublished eq true
           // .and([ { author: 'Nate' }, { isPublished: true }])  
           // .find({ author: /^Nat/i }) // query by regex -- string starts with Nat */
      //  .find({ author: /Kerkvliet$/i }) //query by regex -- string ends with Kerkvliet case insensitive
      //  .find({ author: /.*Nate.*/i }) //query contains Nate - 0 or more characters before and after Nate
        .find({ author: 'Nate', isPublished: true })
       // .skip((pageNumber - 1) * pageSize) // pagination
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
        //.count(); // used to get count (use instead of select)
    console.log(courses);
}

/* async function getFilteredCourses() {
    const courses = await Course
        .find({ author: 'Nate', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
} */