/////////////////////// Import dependencies /////////////////////
import classExpress from 'express';
import {
    fetch as fetchController,
    create as createController,
    edit as editController,
    deleteClass as deleteClassController,
    deleteCascade as deleteCascadeController
} from '../controllers/class.controller';
const classRouter = classExpress.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
classRouter.route('/fetch')
.post(fetchController);

classRouter.route('/create')
.post(createController);

classRouter.route('/edit')
.put(editController);

classRouter.route('/delete')
.delete(deleteClassController);

classRouter.route('/deleteCascade')
.delete(deleteCascadeController);
/////////////////////////////////////////////////////////////

///////// Exports /////////
export default classRouter;
//////////////////////////