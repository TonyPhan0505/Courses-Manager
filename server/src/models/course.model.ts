////////////// Import dependencies //////
import courseMongoose from 'mongoose';
const courseSchema = courseMongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema ////////////
const CourseSchema = new courseSchema({
    courseId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    trainer: {
        type: String,
        required: true,
        trim: true
    },
    manager: {
        type: String,
        required: true,
        trim: true
    },
    startedDate: {
        type: Date,
        required: true
    },
    endedDate: {
        type: Date,
        required: true
    },
    buildingId: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    }
});
///////////////////////////////////////////////////

//////////////////////// Exports //////////////////////
export default courseMongoose.model('Course', CourseSchema);
//////////////////////////////////////////////////////