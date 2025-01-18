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
        "가족환경과 성장환경": [
            "부모님에 대한 기억은 어떤가요? 부모님의 모습이나 성격, 그리고 부모님과의 추억을 말씀해주세요.",
            "가족과 함께 했던 여행 중 가장 기억에 남는 장소는 어디인가요?",
            "가족 중에서 가장 존경했던 인물은 누구인가요? 그 이유는 무엇인가요?",
            "어렸을 적 형제자매와의 관계는 어땠나요? 특별히 친했던 형제자매는 누구였나요?",
            "형제자매와의 경쟁이나 다툼이 있었나요? 그로 인해 배운 점이 있나요?"
        ],
        "청소년기와 학창시절": [
            "청소년기에 살았던 곳과 그곳에서의 추억은 무엇인가요?",
            "학창시절 부모님과의 관계는 어땠나요?",
            "사춘기 시절 위험하거나 반항적인 행동을 한 적이 있나요?",
            "청소년기 가장 친한 친구는 누구였으며, 그 친구와의 추억은 어떤가요?",
            "학창시절에 가장 자랑스러웠던 순간은 언제였나요?",
            "청소년기에 당신이 가장 열정을 가졌던 활동이나 취미는 무엇이었나요?"
        ],
        "20대 시절 - 대학생활": [
            "대학에 입학하게 된 계기는 무엇인가요? 왜 그 학교를 선택했나요?",
            "대학에서 가장 좋아했던 과목이나 교수는 누구였나요? 그 이유는 무엇인가요?",
            "대학 시절 가장 친했던 친구와의 추억은 무엇인가요?",
            "대학 생활 중 가장 힘들었던 순간은 언제였나요? 그것을 어떻게 극복했나요?",
            "대학 시절에 얻은 가장 큰 교훈이나 깨달음은 무엇이었나요?"
        ],
        "20대 시절 - 직장생활": [
            "첫 직장을 어떻게 구하게 되었나요? 그 과정에 대해 이야기해주세요.",
            "직장 생활에서 가장 기억에 남는 프로젝트는 무엇이었나요? 그 프로젝트의 성공 요인은 무엇이었나요?",
            "직장에서의 인간관계는 어땠나요? 특별히 친했던 동료나 멘토가 있나요?",
            "직장 생활 중 가장 힘들었던 순간은 언제였나요? 그 어려움을 어떻게 극복했나요?",
            "직장 생활을 통해 얻은 가장 큰 교훈은 무엇인가요?"
        ],
        "결혼 이야기": [
            "결혼 전 배우자와의 첫 만남은 어땠나요? 그때의 느낌을 자세히 말씀해주세요.",
            "결혼을 결심하게 된 이유는 무엇인가요?",
            "신혼생활 중 가장 기억에 남는 일은 무엇이었나요?",
            "결혼 생활 중 힘들었던 순간과 행복했던 순간은 언제였나요?",
            "결혼 생활에서 가장 중요한 가치는 무엇이라고 생각하시나요?"
        ],
        "자녀 이야기": [
            "첫 아이가 태어난 날에 대한 기억을 말씀해주세요.",
            "아이들과 함께한 추억 중 가장 의미 있는 것은 무엇인가요?",
            "부모로서 가장 자랑스러웠던 순간은 언제였나요?",
            "아이를 돌보면서 가장 어려웠던 점은 무엇이었나요?",
            "자녀들에게 가장 중요하게 가르치고 싶었던 가치는 무엇이었나요?",
            "자녀들이 성장하면서 부모로서 가장 보람을 느꼈던 순간은 언제였나요?"
        ],
        "현재의 삶": [
            "현재의 생활에서 가장 만족스러운 부분은 무엇인가요?",
            "현재 집중하고 있는 취미나 활동은 무엇인가요? 그것이 당신에게 어떤 의미를 주고 있나요?",
            "현재의 생활에서 가장 큰 도전은 무엇인가요? 그 도전을 어떻게 극복하고 있나요?",
            "지금의 삶에서 가장 감사하게 생각하는 사람이나 사건은 무엇인가요?",
            "현재의 삶에서 이루고 싶은 목표나 계획이 있나요? 그 목표를 이루기 위해 어떤 준비를 하고 있나요?"
        ],
        "인생의 교훈과 회고": [
            "지금까지의 인생에서 가장 힘들었던 순간은 언제였고, 그 순간을 어떻게 극복했나요?",
            "인생에서 가장 후회되는 결정은 무엇인가요? 그 결정을 통해 배운 점이 있나요?",
            "인생에서 가장 큰 기쁨을 느꼈던 순간은 언제였나요? 그 순간이 왜 특별했나요?",
            "지금까지의 인생에서 가장 감사하게 생각하는 사람은 누구이며, 그 이유는 무엇인가요?",
            "다음 세대에게 꼭 전하고 싶은 교훈이나 조언이 있다면 무엇인가요?"
        ],
        "미래의 계획과 희망": [
            "앞으로 이루고 싶은 목표나 꿈이 있나요? 그 목표를 이루기 위해 어떤 계획을 세우고 계신가요?",
            "앞으로의 삶에서 가장 중요하게 생각하는 가치는 무엇인가요?",
            "새로운 기술이나 취미를 배우고 싶은 계획이 있나요?",
            "앞으로의 여행 계획이 있다면 어디를 가고 싶으신가요?",
            "미래의 자신에게 가장 하고 싶은 말은 무엇인가요?"
        ]
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
        sectionQuestions.forEach((question) => {
            const li = document.createElement('li');
            li.textContent = `${question}`;
            li.addEventListener('click', () => {
                openEditModal(sectionTitle, question);
            });
            questionList.appendChild(li);
        });

        listModal.style.display = 'block';

        document.querySelector('.fade').style.display = 'block';
    });

    // 질문 수정 모달 열기
    function openEditModal(title, question) {
        listModal.style.display = 'none';
        editModal.style.display = 'block';
        editModalTitle.textContent = title;
        editTextarea.value = ''; // 값을 비워둠
        editTextarea.placeholder = question; // placeholder로 질문 표시
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
