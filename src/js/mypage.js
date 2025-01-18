document.addEventListener('DOMContentLoaded', () => {
    const data = localStorage.getItem('token');

    const cardContainer = document.querySelector('.card-container');
    const listModal = document.getElementById('list-modal');
    const editModal = document.getElementById('edit-modal');
    const listModalTitle = document.getElementById('list-modal-title');
    const questionList = document.getElementById('question-list');
    const closeListModal = document.getElementById('close-list-modal');
    const editModalTitle = document.getElementById('edit-modal-title');
    const editTextarea = document.getElementById('edit-textarea');
    const closeEditModal = document.getElementById('close-edit-modal');
    const saveEditModal = document.getElementById('save-edit-modal');

    // 질문 데이터
    const questions = {
        "탄생과 유아기 시절": [
            "언제 어디서 태어나셨나요? 탄생에 얽힌 이야기가 있나요? 부모님이나 가족들이 당신의 유아기에 대해 어떤 이야기가 있나요?",
            "형제 자매 중 몇째로 태어나셨고, 그것이 당신에게 어떤 영향을 미쳤나요?",
            "유아기 때 가장 좋아했던 장난감이나 놀이가 있었나요?",
            "부모님이 유아기 때 당신을 위해 특별히 해주셨던 일이 있나요?",
            "어릴 때 살던 곳과 그곳에서의 추억이 있나요? 계절과 관련된 기억도 말씀해주세요."
        ],
    };

    // 카드 클릭 이벤트
    cardContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (!card) return;

        const sectionTitle = card.dataset.title;
        const sectionQuestions = questions[sectionTitle] || [];

        // 모달 타이틀 설정
        listModalTitle.textContent = sectionTitle;

        // 질문 리스트 렌더링
        questionList.innerHTML = '';
        sectionQuestions.forEach((question, index) => {
            const li = document.createElement('li');
            li.textContent = question;

            // 질문 클릭 이벤트
            li.addEventListener('click', async () => {
                const subId = index + 1; // index를 기반으로 subId 설정
                const data = await fetchImage(sectionTitle, subId); // API 호출로 이미지 URL 가져오기
                openEditModal(sectionTitle, question, data);
            });
            questionList.appendChild(li);
        });

        listModal.style.display = 'block';
        document.querySelector('.fade').style.display = 'block';
    });

    // API 호출하여 이미지 URL 가져오기
    async function fetchImage(mainId, subId) {
        try {
            const response = await fetch(`http://localhost:3000/post/confirm/1/${subId}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data.data;
            } else {
                console.error('Failed to fetch image:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            return null;
        }
    }

    // 질문 수정 모달 열기
    function openEditModal(title, question, data) {
        listModal.style.display = 'none';
        editModal.style.display = 'block';

        editModalTitle.textContent = title;
        editTextarea.value = data.finalAnswer; // 값을 비워둠
        editTextarea.placeholder = question; // placeholder로 질문 표시

        // 이미지가 존재할 경우 삽입
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        if (data.photoUrl) {
            const img = document.createElement('img');
            img.src = data.photoUrl;
            img.alt = `${title} 관련 이미지`;
            img.style.width = '100%'; // 스타일 조정
            imageContainer.appendChild(img);
        } else {
            const errorText = document.createElement('p');
            errorText.textContent = '이미지를 불러오는 데 실패했습니다.';
            errorText.style.color = 'red';
            imageContainer.appendChild(errorText);
        }

        // 모달에 이미지 삽입
        const modalBody = editModal.querySelector('.modal-body');
        modalBody.innerHTML = ''; // 기존 내용 초기화
        modalBody.appendChild(imageContainer);
        modalBody.appendChild(editTextarea);
    }

    // 모달 닫기 이벤트
    closeListModal.addEventListener('click', () => {
        listModal.style.display = 'none';
        document.querySelector('.fade').style.display = 'none';
    });

    closeEditModal.addEventListener('click', () => {
        editModal.style.display = 'none';
        document.querySelector('.fade').style.display = 'none';
    });

    saveEditModal.addEventListener('click', () => {
        const editedContent = editTextarea.value;
        console.log('저장된 내용:', editedContent);
        editModal.style.display = 'none';
        document.querySelector('.fade').style.display = 'none';
    });
});
