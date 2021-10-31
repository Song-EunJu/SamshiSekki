import React, {useState} from 'react';
import { withRouter, useLocation, useHistory } from 'react-router';
import axios from 'axios';


function Mypage(props) {
    let history = useHistory();
    let location = useLocation();
    const userInfo = location.state.userInfo;

    const [newNickName, setNewNickName] = useState('');

    console.log(userInfo.userId); //유저정보 출력 테스트

    function nickChange(e){
        setNewNickName(e.target.value);
    }

    const submitClickHandler = async() => {
        const response = await axios.post(`http://localhost:8080/users/${userInfo.userId}/profile`,{
            userId:userInfo.userId,
            nickName: newNickName
        });

        console.log(response);
        userInfo.nickname = newNickName; 


        props.history.push({ 
            pathname: "/main_logged",
            state: {userInfo: userInfo}
        });

    }
    return (
        <>
            <div>
                {userInfo.email} 의 마이페이지
                <button className="submitBtn">닉네임 수정</button> 
                {/* 이거 닉네임 수정 누르면 수정하는 페이지로 바뀌어야 하는데 일단 테스트용으로 여기에 해놨음  */}
                <input type="text" placeholder="닉네임" className="inputNick" onChange={nickChange}></input>
                <button className="submitBtn" onClick={submitClickHandler}>저장</button>
            </div>
        </>
    )
}
export default withRouter(Mypage)
