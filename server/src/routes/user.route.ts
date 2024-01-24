/////////////////////// Import dependencies /////////////////////
import userExpress from 'express';
import {
    login as loginController,
    fetch as fetchController,
    signUp as signUpController
} from '../controllers/user.controller';
const userRouter = userExpress.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
userRouter.route('/login')
.post(loginController);

userRouter.route('/signUp')
.post(signUpController);

userRouter.route('/fetch')
.get(fetchController);
/////////////////////////////////////////////////////////////

///////// Exports /////////
export default userRouter;
//////////////////////////