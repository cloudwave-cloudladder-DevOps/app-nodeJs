document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 폼 제출의 기본 동작을 방지

    const userName = document.getElementById('userName').value;
    const userPhone = document.getElementById('userPhone').value;
    const userPw = document.getElementById('userPw').value;

    // 서버의 '/signup' 엔드포인트로 POST 요청을 보냅니다.
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            userPhone,
            userPw
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // 응답 메시지를 사용자에게 알립니다.
        if (data.code === 200) {
            window.location.href = '/signin'; // 로그인 페이지로 리다이렉트
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('회원가입 중 문제가 발생했습니다.');
    });
});
