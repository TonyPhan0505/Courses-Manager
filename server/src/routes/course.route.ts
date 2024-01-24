/////////////////////// Import dependencies /////////////////////
import courseExpress from 'express';
import {
    fetch as fetchController,
    create as createController,
    edit as editController,
    deleteCourse as deleteCourseController
} from '../controllers/course.controller';
const courseRouter = courseExpress.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
courseRouter.route('/fetch')
.post(fetchController);

courseRouter.route('/create')
.post(createController);

courseRouter.route('/edit')
.put(editController);

courseRouter.route('/delete')
.delete(deleteCourseController);
/////////////////////////////////////////////////////////////

///////// Exports /////////
export default courseRouter;
//////////////////////////