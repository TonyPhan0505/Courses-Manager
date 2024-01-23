///////////////////////////// Import dependencies ///////////////////////////////
import classJWT from 'jsonwebtoken';
import Class from '../models/class.model';
////////////////////////////////////////////////////////////////////////////////

////////////////////// Functions to be executed for HTTP routes ///////////////////////
export const fetch = async (req: any, res: any) => {
    const accessToken = req.body.accessToken;
    classJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (fetchClassVerifyError: any) => {
        if (fetchClassVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${fetchClassVerifyError}.` });
        } else {
            Class.find({}).then(classes => {
                return res.status(200).send({ success: true, classes });
            }).catch(fetchClassError => {
                return res.status(500).send({ success: false, message: `ERROR: ${fetchClassError}.` });
            });
    }});
};

export const create = async (req: any, res: any) => {
    const accessToken = req.body.accessToken;
    const newClass = req.body.newClass;
    classJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (createClassVerifyError: any) => {
        if (createClassVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${createClassVerifyError}.` });
        } else {
            // Check for class conflicts
            const query = {
                buildingId: newClass.buildingId,
                roomId: newClass.roomId,
                $or: [
                    {
                        $and: [
                            { startedTime: { $lte: newClass.startedTime } },
                            { endedTime: { $gte: newClass.startedTime } }
                        ]
                    },
                    {
                        $and: [
                            { startedTime: { $lte: newClass.endedTime } },
                            { endedTime: { $gte: newClass.endedTime } }
                        ]
                    }
                ]
            };
            // Check for conflicts in the database
            Class.find(query).then(
                (results: any) => {
                    for (const result of results) {
                        const resultDate = new Date(result.date).getDate();
                        const resultMonth = new Date(result.date).getMonth();
                        const resultYear = new Date(result.date).getFullYear();
                        const newDate = new Date(newClass.date).getDate();
                        const newMonth = new Date(newClass.date).getMonth();
                        const newYear = new Date(newClass.date).getFullYear();
                        if (resultDate === newDate && resultMonth === newMonth && resultYear === newYear) {
                            return res.status(409).send({ success: false, message: "Time conflict" });
                        }
                    }
                    const newRecord = new Class({
                        courseId: newClass.courseId,
                        className: newClass.className,
                        trainer: newClass.trainer,
                        date: newClass.date,
                        startedTime: newClass.startedTime,
                        endedTime: newClass.endedTime,
                        buildingId: newClass.buildingId,
                        roomId: newClass.roomId,
                        classId: newClass.classId
                    });
                    newRecord.save().then(() => {
                        return res.status(200).send({ success: true, message: `SUCCESS: successfully created new class.` });
                    }).catch(saveClassError => {
                        return res.status(500).send({ success: false, message: `ERROR: ${saveClassError}.` });
                    });
                }
            ).catch(err => {
                return res.status(500).send({ success: false, message: `Internal server error. ${err}.` });
            });
        }
    });
};

export const edit = async (req: any, res: any) => {
    const updatedClass = req.body.updatedClass;
    const accessToken = req.body.accessToken;
    classJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (editClassVerifyError: any) => {
        if (editClassVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${editClassVerifyError}.` });
        } else {
            await Class.updateOne({ classId: updatedClass.classId }, updatedClass);
            return res.status(200).send({ success: true, message: `SUCCESS: class named ${updatedClass.className} was successfully updated.`});
        }
    });
};

export const deleteClass = async (req: any, res: any) => {
    const classId = req.body.classId;
    const accessToken = req.body.accessToken;
    classJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (deleteClassVerifyError: any) => {
        if (deleteClassVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: Invalid access token when deleting class. ${deleteClassVerifyError}.` });
        } else {
            await Class.deleteOne({ classId });
            return res.status(200).send({ success: true, message: `SUCCESS: successfully deleted class.` });
        }
    });
};

export const deleteCascade = async (req: any, res: any) => {
    const courseId = req.body.courseId;
    const accessToken = req.body.accessToken;
    classJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (deleteCascadeVerifyError: any) => {
        if (deleteCascadeVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: Invalid access token when deleting class. ${deleteCascadeVerifyError}.` });
        } else {
            await Class.deleteMany({ courseId });
            return res.status(200).send({ success: true, message: `SUCCESS: successfully deleted classes.` });
        }
    });
};
//////////////////////////////////////////////////////////////////////////////////////