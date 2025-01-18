document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');   

    // 로그인 폼 제출 이벤트 처리
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            // 로그인 API 호출
            const response = await fetch(
                'http://localhost:3000/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.code === '200') {
                    alert('로그인에 성공했습니다!');
                    window.location.href = '/public/home/home.html'; // 로그인 성공 후 홈 페이지로 이동
                } else {
                    alert(result.message || '로그인에 실패했습니다.');
                }
            } else {
                const error = await response.json();
                alert(error.message || '서버와 통신 중 오류가 발생했습니다.');
            }
        } catch (err) {
            console.error('로그인 요청 중 오류 발생:', err);
            alert('로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });

    // 회원가입 버튼 이벤트 처리
    const signupButton = document.getElementById('signupButton');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            window.location.href = '/signup'; // 회원가입 페이지로 이동
        });
    }
});
