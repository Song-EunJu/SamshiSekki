const Application = require("../models/Application");
// const path=require('path');

/* 스터디 신청서 수정 (저장 / 다른 이름으로 저장) */
exports.updateNameApplication = async function (req, res){
    const { userId, applicationName, name, gender, age, school, 
        major, attending, semester, address, interests, keyword, message } = req.body;
    const { applicationId } = req.params;

    try {
        if(applicationName===''){ // 저장인 경우
            const application = await Application.findByIdAndUpdate(applicationId,{
                $set: {
                    name: name,
                    gender: gender,
                    age: age,
                    school: school,
                    major: major,
                    attending: attending,
                    semester: semester,
                    address: address,
                    interests: interests,
                    keyword: keyword,
                    message: message
                }
            },{new: true}).exec();
            if (!application) {
                return res
                    .status(404)
                    .json({ error: err});
            }
        } 
        else { // 다른 이름으로 저장인 경우
            const application = await Application.findByIdAndUpdate(applicationId,{
                $set: {
                    applicationName: applicationName,
                    name: name,
                    gender: gender,
                    age: age,
                    school: school,
                    major: major,
                    attending: attending,
                    semester: semester,
                    address: address,
                    interests: interests,
                    keyword: keyword,
                    message: message
                }
            },{new: true}).exec(); // 콜백 함수 없이 바로 쿼리를 실행시키려면, update() 호출 후 exec()를 호출
            if (!application) {
                return res
                    .status(404)
                    .json({ error: err});
            }
        }

        return res
            .status(200)
            .json(application);
    } catch (err) {
        throw res
            .status(500)
            .json({ error: err })
    }    

}

/* 선택한 신청서 삭제 */
exports.deleteApplication = async function (req, res) {
    const { applicationId } = req.params;
    try {
        await Application.findByIdAndDelete(applicationId).exec();
        return res
            .status(200)
            .json({ msg : '신청서가 삭제되었습니다'});
    } catch (err) {
        throw res
            .status(500)
            .json({ error: err })
    }
}