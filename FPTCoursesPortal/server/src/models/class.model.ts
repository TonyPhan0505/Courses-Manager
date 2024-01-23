////////////// Import dependencies //////
import classMongoose from 'mongoose';
const classSchema = classMongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema ////////////
const ClassSchema = new classSchema({
    courseId: {
        type: String,
        required: true,
        trim: true
    },
    className: {
        type: String,
        required: true,
        trim: true
    },
    trainer: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    startedTime: {
        type: Date,
        required: true
    },
    endedTime: {
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
    },
    classId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});
///////////////////////////////////////////////////

//////////////////////// Exports //////////////////////
export default classMongoose.model('Class', ClassSchema);
//////////////////////////////////////////////////////