function getTasks() {
    fetch("http://localhost:5001/tasks")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // 기존 목록 초기화
            const todoList = document.getElementById("todo-list");
            todoList.innerHTML = "";

            // 할 일 목록이 비었는지 확인
            if (data.data.length === 0) {
                todoList.innerHTML = `
                    <p>할 일 목록이 없습니다.</p>
                `;
                return; // 더 이상 작업하지 않고 함수 종료
            }

            // 목록이 있을 때 할 일 카드 생성
            data.data.forEach((item, i) => {
                const todoCard = `
                <div class="todo-card" id="todo-task${i}">
                    <p>${item.task}</p>
                    <span>
                        <input type="button" id="is-complete${i}" value="">
                        <input type="button" id="delete-btn${i}" value="삭제">
                    </span>
                </div>
                `;
                todoList.insertAdjacentHTML("beforeend", todoCard);

                const completeBTN = document.getElementById(`is-complete${i}`);
                const deleteBTN = document.getElementById(`delete-btn${i}`);

                // 완료/미완료 버튼 상태 설정
                completeBTN.value = item.isComplete ? "다시하기" : "완료하기";

                // 완료/미완료 토글 이벤트 리스너 추가
                completeBTN.addEventListener("click", () => {
                    let changeComplete = completeBTN.value === "완료하기" ? true : false;

                    fetch(`http://localhost:5001/tasks/${item._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            isComplete: changeComplete,
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("PUT response:", data);

                            // 버튼 상태를 즉시 업데이트
                            completeBTN.value = changeComplete ? "다시하기" : "완료하기";
                        })
                        .catch((error) => console.error("Error:", error));
                });

                // 삭제 버튼 이벤트 리스너 추가
                deleteBTN.addEventListener("click", () => {
                    fetch(`http://localhost:5001/tasks/${item._id}`, {
                        method: "DELETE",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("DELETE response:", data);

                            // 삭제 후 목록을 다시 불러와 갱신
                            getTasks();
                        })
                        .catch((error) => console.error("Error:", error));
                });
            });
        });
}

// 페이지 로드 시 목록 읽기
getTasks();

// (생성)
document.getElementById("post-btn").addEventListener("click", () => {
    let inputElement = document.getElementById("input-task");
    let inputValue = inputElement.value;

    // 값이 없으면 에러 메시지 출력 (간단한 밸리데이션)
    if (!inputValue.trim()) {
        console.error("Task cannot be empty!");
        return;
    }

    // POST 요청
    fetch("http://localhost:5001/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            task: inputValue,
            isComplete: false,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("POST response:", data);

            // POST 요청 후 목록 갱신
            getTasks();

            // 입력 필드 비우기
            inputElement.value = "";  // 여기가 입력 필드를 비우는 부분입니다
        })
        .catch((error) => console.error("Error:", error));
});

if(document.getElementById("todo-list") === null){
    document.getElementById("todo-list").innerHTML = `
        <p>할 일 목록이 없습니다.</p>
    `;
}

