import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';
import axios from 'axios';


function Mypage(props) {
    let history = useHistory();
    let location = useLocation();
    const userInfo = location.state.userInfo;

    const submitClickHandler = async() => {
        const response = await axios.post(`http://localhost:8080/users/${userInfo.userId}/profile`,{
            // 닉네임 수정하는 
        });
    }

    return (
        <>
            <div>
                {userInfo.email} 의 마이페이지
                <button className="submitBtn">닉네임 수정</button>
            </div>
        </>
    )
}

export default Mypage
