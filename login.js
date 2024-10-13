window.onload = function() {
    const token = sessionStorage.getItem('token');

    // 토큰이 없으면 로그인 페이지로 리다이렉션
    if (token) {
        window.location.href = 'index.html';
    } else {
        console.log("로그인 페이지입니다. 토큰 없음");
    }
};

const PROD_URI = "https://port-0-todo-app-m23hc1qu8337e38b.sel4.cloudtype.app";
const LOCAL_URI = "http://localhost:5001";

const URI = LOCAL_URI;

document.getElementById("login-btn").addEventListener("click", () => {
    let emailInput = document.getElementById("email-input").value;
    let pwInput = document.getElementById("pw-input").value;

    // POST 요청
    fetch(`${URI}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailInput,
            password: pwInput
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'fail') {
                document.getElementById("error-msg").innerHTML = `
                <p>${data.message}</p>
            `;
                return; // 더 이상 작업하지 않고 함수 종료
            };
            console.log("POST response:", data);
            //토큰정보 저장
            sessionStorage.setItem("token", data.token);

            // 회원가입 성공 시 입력 필드 비우기
            document.getElementById("email-input").value = "";
            document.getElementById("pw-input").value = "";
            document.getElementById("error-msg").innerHTML = "";

            // index.html로 페이지 이동
            window.location.href = "index.html";
        })
        .catch((error) => console.error("Error:", error));
});

//회원가입 버튼
document.getElementById("reg-btn").addEventListener("click", () => {
    window.location.href = "register.html";
});

// 입력 필드 변화 시 에러 메시지 지우기
document.getElementById("email-input").addEventListener("input", () => {
    document.getElementById("error-msg").innerHTML = "";
});

document.getElementById("pw-input").addEventListener("input", () => {
    document.getElementById("error-msg").innerHTML = "";
});