/////////////// Import dependencies ///////////////
import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
/////////////////////////////////////////////////

/////////////// Configurations ///////////////
const app = express();
dotenv.config();
const port = process.env.PORT || 8000;
const mongoUSERNAME = process.env.MONGO_USER;
const mongoPASS = process.env.MONGO_PASSWORD;
const mongoURI = `mongodb+srv://${mongoUSERNAME}:${mongoPASS}@ecoursesportal.bew3vq5.mongodb.net/production?retryWrites=true&w=majority`;
////////////////////////////////////////////////////////////////////////////////

//////////////////////////// Database connection /////////////////////////
mongoose.connect(mongoURI)
.then(
	() => {
        console.log('Connected successfully to mongodb.');
    },
	(connectionErr: string) => {
        console.log(`Failed to connect to mongodb. Error: ${connectionErr}`);
    }
);
/////////////////////////////////////////////////////////////////////////

///////////////////// Import routes ////////////////////
import UserRouter from './routes/user.route';
import RoomRouter from './routes/room.route';
import CourseRouter from './routes/course.route';
import ClassRouter from './routes/class.route';
import BuildingRouter from './routes/building.route';
///////////////////////////////////////////////////////

///////////////////////////////// Middleware ///////////////////////////////////
app.use(cors());
app.use(express.json());
app.listen(port, () =>
    console.log('RESTful API server started on: ' + port + '.')
);
app.use('/user', UserRouter);
app.use('/room', RoomRouter);
app.use('/course', CourseRouter);
app.use('/class', ClassRouter);
app.use('/building', BuildingRouter);
///////////////////////////////////////////////////////////////////////////////