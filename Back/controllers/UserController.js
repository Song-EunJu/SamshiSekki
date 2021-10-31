const StudyList = require('../models/StudyModel');
const path = require('path');

// 마이페이지 띄우기 (내정보에 해당하는 거를 띄워야 되는데..)
// exports.showMypage = function (req, res) {
//     const { email, profileImage, accessToken } = req.body;
//     const nickname="";
    
//     // 1. 등록된 유저인지 확인 / 토큰 교체 
    
//     try{
//         let user = await User.findOne({ email: email });
//         // 이미 등록되어 있으면 토큰 교체 후 해당 유저 정보를 갖고 메인으로 이동
//         if(user){
//             console.log("update before");
//             const updateUser = await User.updateOne({email: email}, {accessToken: accessToken});  // 토큰 교체해주는 코드
//             console.log(updateUser);
//             user = await User.findOne({ email: email }); // 새로 업데이트된 유저 정보를 넘겨줌
//             console.log(user);        
//             return res
//                 .status(200)
//                 .json(user); 
    
//         }    
//     } catch (err) {
//         return res
//             .status(500)
//             .json({ error: err });
//     } 

//     // 2. 유저가 등록되어있지 않으면
//     const user = new User({
//         email,
//         profileImage,
//         accessToken,
//         nickname
//     });
//     console.log("hi")
//     console.log(user)

//     try {
//         await user.save(); // 등록되어있지 않은 유저인 경우 저장하고 닉네임 페이지로 이동
//         console.log("save")
//         return res
//             .status(200)
//             .json(user) // 새로운 유저를 등록
//     } catch (err){
//         console.log("catch")
//         return res
//             .status(500)
//             .json({ error: err });
//     } 
// }



// // 회원정보 수정페이지 띄우기
// exports.editUser = function (req, res) {
//     res.sendFile(path.join(__dirname, '../../build/index.html'))
// }

// // 회원정보 수정
// router.get('/:userId/profile', UserController.editUser)

// // 찜한 스터디 조회
// router.get('/:userId/like-studylist', UserController.editUser)

// // 참여 스터디 조회 
// router.get('/:userId/total-studylist ', UserController.editUser)

// // 과제 관리
// router.get('/:userId/assignment', UserController.getAssignment);

// // 신청한 스터디 조회
// router.get('/:userId/apply-studylist', UserController.editUser)

// // 개설한 스터디 조회
// router.get('/:userId/opened-studylist', UserController.editUser)



// exports.showStudy = async function (req, res) {

// }
