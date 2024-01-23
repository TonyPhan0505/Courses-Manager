"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/////////////// Import dependencies ///////////////
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
/////////////////////////////////////////////////
/////////////// Configurations ///////////////
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 8000;
const mongoUSERNAME = process.env.MONGO_USER;
const mongoPASS = process.env.MONGO_PASSWORD;
const mongoURI = `mongodb+srv://${mongoUSERNAME}:${mongoPASS}@ecoursesportal.bew3vq5.mongodb.net/production?retryWrites=true&w=majority`;
////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Database connection /////////////////////////
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log('Connected successfully to mongodb.');
}, (connectionErr) => {
    console.log(`Failed to connect to mongodb. Error: ${connectionErr}`);
});
/////////////////////////////////////////////////////////////////////////
///////////////////// Import routes ////////////////////
const user_route_1 = __importDefault(require("./routes/user.route"));
const room_route_1 = __importDefault(require("./routes/room.route"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const class_route_1 = __importDefault(require("./routes/class.route"));
const building_route_1 = __importDefault(require("./routes/building.route"));
///////////////////////////////////////////////////////
///////////////////////////////// Middleware ///////////////////////////////////
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(port, () => console.log('RESTful API server started on: ' + port + '.'));
app.use('/user', user_route_1.default);
app.use('/room', room_route_1.default);
app.use('/course', course_route_1.default);
app.use('/class', class_route_1.default);
app.use('/building', building_route_1.default);
///////////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=server.js.map