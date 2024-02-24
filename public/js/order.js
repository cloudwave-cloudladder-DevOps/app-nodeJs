document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-success').forEach(button => {
        button.addEventListener('click', function() {
            const cardBody = this.closest('.card-body');
            const breadName = cardBody.querySelector('.card-title').textContent;
            const breadCategory = cardBody.querySelector('.card-text').textContent.split(': ')[1];

            fetch('/send-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ breadName, breadCategory }),
            })
            .then(response => response.json())
            .then(data => {
                alert('성공적으로 주문 완료');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('주문 처리 중 오류가 발생');
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-success').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const cardBody = this.closest('.card-body');
            const productName = cardBody.querySelector('.card-title').textContent;
            const productCategory = cardBody.querySelector('.card-text').textContent.replace('Category: ', ''); 
            const popupContent = `
            <div id="purchasePopup" class="popup">
                <div class="popup-content">
                    <h4>Order Confirmation</h4> 
                    <h5 style="font-weight: bold;">${productName}</h5>
                    <p>Category is <strong>${productCategory}</strong></p> 
                    <button id="closePopup" class="btn">Close</button> 
                </div>
            </div>
        `;
            document.body.insertAdjacentHTML('beforeend', popupContent);
            document.getElementById('closePopup').addEventListener('click', function() {
                document.getElementById('purchasePopup').remove();
            });
        });
    });
});

document.head.insertAdjacentHTML('beforeend', `
<style>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    width: auto;
    max-width: 500px; 
}

#closePopup {
    margin-top: 20px;
    background-color: #6A5ACD;
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s; 
}

#closePopup:hover {
    background-color: #483D8B;
}
</style>
`);