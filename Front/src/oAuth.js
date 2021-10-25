const REST_API_KEY = "86d130c8c94c8dbcbb6c5756050fbaae"
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback"

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code HTTP/1.1`;
