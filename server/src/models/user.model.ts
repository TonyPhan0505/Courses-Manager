////////////// Import dependencies //////
import userMongoose from 'mongoose';
import userBcrypt from 'bcrypt';
const userSchema = userMongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema ////////////
const UserSchema = new userSchema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true,
        trim: true
    }
});
///////////////////////////////////////////////////

//////////// compare raw password with its hashed version //////////
UserSchema.methods.comparePassword = function (password: string) {
	return userBcrypt.compareSync(password, this.hashedPassword);
};
///////////////////////////////////////////////////////////////////

//////////////////////// Exports //////////////////////
export default userMongoose.model('User', UserSchema);
//////////////////////////////////////////////////////