import React from 'react'
import { useState } from 'react';
// import '../css/login.css'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
// import { db } from '../../Back/models/User';

const {Kakao} = window;

function Login(props) {

    const [isLogin, setIsLogin] = useState(false)
    const [email, setEmail] = useState("default email")
    const [profileImage, setProfileImage] = useState("default profile img")
    const [accessToken, setAccessToken] = useState("default token")
    const [userInfo, setUserInfo] = useState({
        email:'',
        profileImage:'',
        accessToken:'',
        __v:'',
        _id:''
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
                        // props.history.push({
                        //     pathname:'/register',
                        //     state: {
                        //         detail: userInfo
                        //     }
                        // });
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

        const response = await axios.post('http://13.209.66.117:8080/auth/kakao',{
            email: email,
            profileImage: profileImage,
            accessToken: accessToken
        })
        setUserInfo(response.data);
        
        console.log(userInfo);

        console.log(response.data);
    }

    return ( 
        <div className = "container" >
        <div className = "logo" > 원터디 로고 </div> 
        <button className = "loginButton" onClick = {LoginClickHandler} > 카카오로그인 </button> 
        </div>
    )
}

export default withRouter(Login)