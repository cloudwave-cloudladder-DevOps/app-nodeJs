document.getElementById('signinForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const userPhone = document.getElementById('userPhone').value;
    const userPw = document.getElementById('userPw').value;
    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userPhone,
            userPw
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        if (data.code === 200 && data.redirectLink) {
            window.location.href = data.redirectLink;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('로그인 중 문제가 발생했습니다.');
    });
});
