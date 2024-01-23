///////////////////////////// Import dependencies ///////////////////////////////
import courseJWT from 'jsonwebtoken';
import Course from '../models/course.model';
////////////////////////////////////////////////////////////////////////////////

////////////////////// Functions to be executed for HTTP routes ///////////////////////
export const fetch = async (req: any, res: any) => {
    const accessToken = req.body.accessToken;
    courseJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (fetchCourseVerifyError: any) => {
        if (fetchCourseVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${fetchCourseVerifyError}.` });
        } else {
            Course.find({}).then(courses => {
                return res.status(200).send({ success: true, courses });
            }).catch(fetchCourseError => {
                return res.status(500).send({ success: false, message: `ERROR: ${fetchCourseError}.` });
            });
    }});
};

export const create = async (req: any, res: any) => {
    const accessToken = req.body.accessToken;
    const newCourse = req.body.newCourse;
    courseJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (createCourseVerifyError: any) => {
        if (createCourseVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${createCourseVerifyError}.` });
        } else {
            const query = {
                courseName: newCourse.courseName,
                trainer: newCourse.trainer,
                manager: newCourse.manager,
                buildingId: newCourse.buildingId,
                roomId: newCourse.roomId
            };
            await Course.find(query).then(
                (results: any) => {
                    for (const result of results) {
                        const resultStartedDate = new Date(result.startedDate).getDate();
                        const resultStartedMonth = new Date(result.startedDate).getMonth();
                        const resultStartedYear = new Date(result.startedDate).getFullYear();

                        const resultEndedDate = new Date(result.endedDate).getDate();
                        const resultEndedMonth = new Date(result.endedDate).getMonth();
                        const resultEndedYear = new Date(result.endedDate).getFullYear();

                        const newStartedDate = new Date(newCourse.startedDate).getDate();
                        const newStartedMonth = new Date(newCourse.startedDate).getMonth();
                        const newStartedYear = new Date(newCourse.startedDate).getFullYear();

                        const newEndedDate = new Date(newCourse.endedDate).getDate();
                        const newEndedMonth = new Date(newCourse.endedDate).getMonth();
                        const newEndedYear = new Date(newCourse.endedDate).getFullYear();
                        if (
                            resultStartedDate === newStartedDate
                                &&
                            resultStartedMonth === newStartedMonth
                                &&
                            resultStartedYear === newStartedYear
                                &&
                            resultEndedDate === newEndedDate
                                &&
                            resultEndedMonth === newEndedMonth
                                &&
                            resultEndedYear === newEndedYear
                        ) {
                            return res.status(409).send({ success: false, message: "Duplicated" });
                        }
                    }
                    const newRecord = new Course({
                        courseId: newCourse.courseId,
                        courseName: newCourse.courseName,
                        trainer: newCourse.trainer,
                        manager: newCourse.manager,
                        startedDate: newCourse.startedDate,
                        endedDate: newCourse.endedDate,
                        buildingId: newCourse.buildingId,
                        roomId: newCourse.roomId
                    });
                    newRecord.save().then(() => {
                        return res.status(200).send({ success: true, message: `SUCCESS: successfully created new course.` });
                    }).catch(saveCourseError => {
                        return res.status(500).send({ success: false, message: `ERROR: ${saveCourseError}.` });
                    });
                }
            ).catch(
                err => {
                    return res.status(500).send({ success: false, message: `Internal server error when creating new course. ${err}.` });
                }
            );
        }
    });
};

export const edit = async (req: any, res: any) => {
    const updatedCourse = req.body.updatedCourse;
    const accessToken = req.body.accessToken;
    courseJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (editCourseVerifyError: any) => {
        if (editCourseVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: ${editCourseVerifyError}.` });
        } else {
            await Course.updateOne({ courseId: updatedCourse.courseId }, updatedCourse);
            return res.status(200).send({ success: true, message: `SUCCESS: course named ${updatedCourse.courseName} was successfully updated.`});
        }
    });
};

export const deleteCourse = async (req: any, res: any) => {
    const courseId = req.body.courseId;
    const accessToken = req.body.accessToken;
    courseJWT.verify(accessToken, process.env.LOGIN_SECRET_KEY, async (deleteCourseVerifyError: any) => {
        if (deleteCourseVerifyError) {
            return res.status(400).send({ success: false, message: `ERROR: Invalid access token when deleting course. ${deleteCourseVerifyError}.` });
        } else {
            await Course.deleteOne({ courseId });
            return res.status(200).send({ success: true, message: `SUCCESS: successfully deleted course.` });
        }
    });
};
//////////////////////////////////////////////////////////////////////////////////////