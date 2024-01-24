///////////////////////////// Import dependencies ///////////////////////////////
import userJWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
/////////////////////////////////////////////////////////////////////////////////

//////////////////////// Functions to be executed for HTTP routes ///////////////////////////
export const login = async (req: any, res: any) => {
    await User.findOne({ username: req.body.username }).then((user: any) => {
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).send({ success: false, message: 'ERROR: Invalid username or password.' });
        }
        try {
            const secretKey = process.env.LOGIN_SECRET_KEY;
            const accessToken = userJWT.sign({ username: user.username }, secretKey);
            return res.status(200).send({ success: true, user, accessToken });
        } catch (loginError) {
            return res.status(500).send({ success: false, message: `ERROR: ${loginError}.` });
        }
    }).catch(checkCredentialsError => {
        return res.status(500).send({ success: false, message: `ERROR: ${checkCredentialsError}.` });
    });
};

export const fetch = async (req: any, res: any) => {
    await User.find({}).then(users => {
        return res.status(200).send({ success: true, users });
    }).catch(fetchUserError => {
        return res.status(500).send({ success: false, message: `ERROR: ${fetchUserError}.` });
    });
};

export const signUp = async (req: any, res: any) => {
    const { username, password } = req.body;
    const newUser = new User({
        username,
        hashedPassword: bcrypt.hashSync(password, 10)
    });
    await newUser.save().then(() => {
        return res.status(200).send({ success: true, message: `SUCCESS: successfully created new user named ${username}` });
    }).catch(saveUserError => {
        return res.status(500).send({ success: false, message: `ERROR: failed to create new user. ${saveUserError}` });
    });
};
////////////////////////////////////////////////////////////////////////////////////////////