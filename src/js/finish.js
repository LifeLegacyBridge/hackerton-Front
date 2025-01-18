document.getElementById('gotomain').addEventListener("click", async ()=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjBjNDE5Y2ItOTRkMy00ZjU3LTgwOGMtMTdiZDQ2MDM3NzA4IiwiaWF0IjoxNzM3MjI4Njk3LCJleHAiOjE3MzcyMzIyOTd9.0Vw-onFXCtL3pLA53sHvJ7X1cQozUwRHp92dBTzg7Mk"
    alert('이미지 생성 중입니다');
    const response = await fetch(
        'http://localhost:3000/post/final',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
            },
        }
    );

    if (response.ok) {
        alert('이미지 생성을 완료했습니다!');
        window.location.href = '/public/mypage/mypage.html'; // 로그인 성공 후 홈 페이지로 이동
    }else{
        alert('생성을 완료했습니다!');
    }
})