const PROD_URI = "https://port-0-todo-app-m23hc1qu8337e38b.sel4.cloudtype.app";
const LOCAL_URI = "http://localhost:5001";

const URI = LOCAL_URI;

window.onload = function() {
    const token = sessionStorage.getItem('token');

    // 토큰이 없으면 로그인 페이지로 리다이렉션
    if (!token) {
        window.location.href = 'login.html';
    } else {
        // 인증된 사용자 정보 가져오기
        fetch(`${URI}/user/auth`, {
            method: "GET", // 요청 메서드는 상황에 맞게 변경 가능 (GET, POST 등)
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}` // 토큰을 Bearer 토큰으로 설정
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("인증된 유저 정보:", data);
                // 서버에서 응답 받은 데이터 처리
                window.location.href = 'tasks.html';
            })
            .catch((error) => console.error("Error:", error));
    }
};