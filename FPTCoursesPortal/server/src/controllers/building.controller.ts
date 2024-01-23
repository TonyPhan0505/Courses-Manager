///////////////////////////// Import dependencies ///////////////////////////////
import buildingJWT from 'jsonwebtoken';
import Building from '../models/building.model';
////////////////////////////////////////////////////////////////////////////////

//////////////////////// Functions to be executed for HTTP routes ///////////////////////////
export const fetch = async (req: any, res: any) => {
    const accessToken = req.body.accessToken;
    buildingJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (fetchBuildingVerifyError: any) => {
        if (fetchBuildingVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${fetchBuildingVerifyError}.` });
        } else {
            Building.find({}).then((buildings) => {
                return res.status(200).send({ success: true, buildings });
            }).catch(fetchBuildingErr => {
                return res.status(500).send({ success: false, message: `ERROR: ${fetchBuildingErr}.` });
            });
    }});
};

// use in postman only
export const create = async (req: any, res: any) => {
    const accessToken = req.body.accessToken;
    const newBuilding = req.body.newBuilding;
    buildingJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (createBuildingVerifyError: any) => {
        if (createBuildingVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${createBuildingVerifyError}.` });
        } else {
            const newRecord = new Building({
                buildingId: newBuilding.buildingId,
                buildingName: newBuilding.buildingName
            });
            await newRecord.save().then(() => {
                return res.status(200).send({ success: true, message: `SUCCESS: successfully created new building.` });
            }).catch(saveBuildingError => {
                return res.status(500).send({ success: false, message: `ERROR: ${saveBuildingError}.` });
            });
        }
    });
};
////////////////////////////////////////////////////////////////////////////////////////////