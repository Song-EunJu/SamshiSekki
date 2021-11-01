const Application = require("../models/Application");
// const path=require('path');

/* 스터디 신청서 리스트 페이지 조회 */
exports.showApplication = async function (req, res) {
    const { userId } = req.body;

    if (page < 1) {
        return res
            .status(400)
            .json({ error: err })
    }

    try {
        const Applications = await Application.find(userId)
            .sort({ applicationId : -1}) // 내림차순 정렬 - 최근 등록 신청서부터 보기
            .limit(5)
            .skip((page - 1) * 5)
            .exec();

        const postCount = await StudyList.countDocuments().exec();
        res.set('Last-Page', Math.ceil(postCount / 5));
        return res
            .status(200)
            .json(Applications);
    } catch (err) {
        throw res
            .status(500)
            .json({ error: err })
    }
}

// 스터디 신청서 등록 
exports.saveApplication = async function (req, res){
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

/* 스터디 신청서 수정 (저장 / 다른 이름으로 저장) */
exports.updateApplication = async function (req, res){
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