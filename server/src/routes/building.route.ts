/////////////////////// Import dependencies /////////////////////
import buildingExpress from 'express';
import {
    fetch as fetchController,
    create as createController
} from '../controllers/building.controller';
const buildingRouter = buildingExpress.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
buildingRouter.route('/fetch')
.post(fetchController);

buildingRouter.route('/create')
.post(createController);
/////////////////////////////////////////////////////////////

///////// Exports /////////
export default buildingRouter;
//////////////////////////