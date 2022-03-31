const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error:', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minLength: 5,
        maxlength: 255
        // match: /pattern/ // regex matching
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'],  // category must be one of these values
        required: true,
        lowercase: true, // converts input to lowercase automatically
         /* uppercase: true */
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            // Async validation (if verifying data gainst DB or something like that)
            isAsync: true,
            validator: function(v) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        resolve(result);
                    }, 4000);
                });
        },
        message: 'A course should have at least one tag'
        }
    },
    // tags: { 
    //     type: Array,
    //     validate: {
    //         validator: function(v) {
    //             return v && v.length > 0;
    //         },
    //         message: 'A courese should have at least one tag.'
    //         // custom validation function varifying at least one string in tag array
    //     }
    // },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v), // arrow function to round the value (getter)
        set: v=> Math.round(v) // arrow function to round the value (setter)
    }
});
// in this validation if isPublished = true then price is required


const Course = mongoose.model('Course', courseSchema);

createCourse();
// getCourses();
// updateCourseQueryFirst('62420f1614efa563dc5a9bea');
// updateCourseQueryAfter('62420f1614efa563dc5a9bea');
// removeCourse('62420f1614efa563dc5a9bea');

async function createCourse() {
    const course = new Course({
        name: 'Node Course',
        author: 'Mosh',
        category: '-',
        tags: null,
        isPublished: true,
        price: 15
    });
    try{
       const result = await course.save();
       console.log(result);
    } catch(ex) {
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    } 
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