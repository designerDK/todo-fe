const PROD_URI = "https://port-0-todo-app-m23hc1qu8337e38b.sel4.cloudtype.app";
const LOCAL_URI = "http://localhost:5001";

const URI = LOCAL_URI;

document.getElementById("reg-btn").addEventListener("click", () => {
    let nameInput = document.getElementById("name-input").value;
    let emailInput = document.getElementById("email-input").value;
    let pwInput = document.getElementById("pw-input").value;
    let rePwInput = document.getElementById("re-pw-input").value;

    if (pwInput !== rePwInput) {
        document.getElementById("error-msg").innerHTML = `
        <p>패스워드가 일치하지 않습니다.</p>
    `;
        return; // 더 이상 작업하지 않고 함수 종료
    };

    // POST 요청
    fetch(`${URI}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: nameInput,
            email: emailInput,
            password: pwInput
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("POST response:", data);

            // 회원가입 성공 시 입력 필드 비우기
            document.getElementById("name-input").value = "";
            document.getElementById("email-input").value = "";
            document.getElementById("pw-input").value = "";
            document.getElementById("re-pw-input").value = "";
            document.getElementById("error-msg").innerHTML = "";

            // login.html로 페이지 이동
            window.location.href = "login.html";
        })
        .catch((error) => console.error("Error:", error));
});