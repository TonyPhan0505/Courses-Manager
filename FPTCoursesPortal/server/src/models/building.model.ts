////////////// Import dependencies //////
import buildingMongoose from 'mongoose';
const buildingSchema = buildingMongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema ////////////
const BuildingSchema = new buildingSchema({
    buildingId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    buildingName: {
        type: String,
        required: true,
        trim: true
    }
});
///////////////////////////////////////////////////

//////////////////////// Exports //////////////////////
export default buildingMongoose.model('Building', BuildingSchema);
//////////////////////////////////////////////////////