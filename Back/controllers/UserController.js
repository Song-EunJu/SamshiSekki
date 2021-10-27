const User = require("../models/User");
const path=require('path');

exports.saveUser = async function (req, res) {
    const { email, profileImage, accessToken } = req.body;
    const nickname="";
    
    // 1. 등록된 유저인지 확인 / 토큰 교체 
    try{
        const user = await User.findOne({ email: email });

            // 이미 등록되어 있으면 토큰 교체 후 해당 유저 정보를 갖고 메인으로 이동
        if(user){
            console.log("update before");
            const updateUser = await User.updateOne({email: email}, {accessToken: accessToken});
            return res
                .status(200)
                .json(updateUser);  // 토큰 교체해주는 코드
        }
    } catch (err) {
        return res
            .status(500)
            .json({ error: err });
    } 

    // 2. 유저가 등록되어있지 않으면
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
        console.log("save")
        return res
            .status(200)
            .json(user) // 새로운 유저를 등록
    } catch (err){
        console.log("catch")
        return res
            .status(500)
            .json({ error: err });
    } 

}

/*
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
*/