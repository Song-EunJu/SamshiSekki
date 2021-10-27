const User = require("../models/User");
const path=require('path');

exports.saveUser = async function (req, res) {
    const { email, profileImage, accessToken } = req.body;
    const nickname="";
    
    // 1. 등록된 유저인지 확인 / 토큰 교체 
    try{
        await User.find({ email: email }, (err, users) => {
            console.log("find");
            console.log(users.length);
            if(users.length!=0){ // 이미 등록되어 있으면 토큰 교체 후 해당 유저 정보를 갖고 메인으로 이동
                console.log("update before");
                User.updateOne({email: email}, {accessToken: accessToken});  // 토큰 교체해주는 코드 

                return res
                    .status(200)
                    .json(users[0]);
            } // 등록된 유저가 아닌 경우
        });
    } catch (err) {
        return res
            .status(500)
            .json({ error: err });
    }

    // 등록된 유저가 아닌경우
    const user = new User({
        email,
        profileImage,
        accessToken,
        nickname
    });
    console.log("hi")
    console.log(user)

    try {
        await user.save(); // 등록되어있지 않은 유저인 경우 저장하고 닉네임 페이지로 이동
        return res
            .status(200)
            .json(user) // 위에서 담은 user 정보를 json형태로 보내면 const response에 들어감
    } catch (err) {
        return res
            .status(500)
            .json({ error: err });
    }
}

