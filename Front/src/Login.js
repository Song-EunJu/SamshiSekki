import React from 'react'
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
const {Kakao} = window;

function Login(props) {

    const [isLogin, setIsLogin] = useState(false)
    const [email, setEmail] = useState("default email")
    const [profileImage, setProfileImage] = useState("default profile img")
    const [accessToken, setAccessToken] = useState("default token")
    const [userInfo, setUserInfo] = useState({
        email:'',
        profileImage:'',
        accessToken:''
    })

    function LoginClickHandler(){
        try {
            return new Promise((resolve, reject) => {
                if (!Kakao) {
                    reject('kakao 인스턴트 없음');
                }
                Kakao.Auth.login({
                    success: (auth) => {
                        console.log('로그인 성공', auth);
                        const authData = auth;

                        /* 동일한 토큰이 오는지 확인 
                        if(Kakao.Auth.getAccessToken){
                            console.log(Kakao.Auth.getAccessToken());
                        }                        
                        */
                       
                        setIsLogin(true);
                        window.Kakao.API.request({
                            url:'/v2/user/me',
                            success: res =>{
                                const kakao_account = res.kakao_account;

                                const email = kakao_account.email;
                                const profileImage = kakao_account.profile.profile_image_url;
                                const accessToken = authData.access_token;

                                sendKakao(email, profileImage, accessToken);
                            }  
                        })
                    },

                    fail: (err) => {
                        console.log(err);
                    }
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    const sendKakao = async(email, profileImage, accessToken) => {
        setEmail(email);
        setProfileImage(profileImage);
        setAccessToken(accessToken);

        const response = await axios.post('http://localhost:8080/auth/kakao',{
            email: email,
            profileImage: profileImage,
            accessToken: accessToken
        })
        
        // register 에 넘어갈 user 정보
        userInfo.email = response.data.email;
        userInfo.profileImage = response.data.profileImage;
        userInfo.accessToken = response.data.accessToken;

        console.log("login console");
        console.log(response);
        if(response.data.nickname==""){ // 닉네임이 없는 경우
            props.history.push({
                pathname: "/register",
                state: {userInfo: userInfo}
            });
        }
        else{
            console.log("main");
        }
    }

    return ( 
        <div className = "container" >
            <div className = "logo" > 원터디 로고 </div> 
            <button className = "loginButton" onClick = {LoginClickHandler} > 카카오로그인 </button> 
        </div>
        
    )
}

export default withRouter(Login)