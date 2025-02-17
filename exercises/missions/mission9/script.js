// Base de données des questions
    const questions = [
      {
        id: 1,
        text: "Quelle est la capitale de la France ?",
        options: ["Lyon", "Paris", "Marseille", "Bordeaux"],
        correct: [1] // Index des réponses correctes
      },
      {
        id: 2,
        text: "Quel est le plus grand océan ?",
        options: ["Pacifique", "Atlantique", "Indien", "Arctique"],
        correct: [0]
      },
      {
        id: 3,
        text: "Qui est le premier homme à avoir marché sur la Lune ?",
        options: ["Neil Armstrong", "Buzz Aldrin", "Elon Musk", "Jeff Bezos"],
        correct: [0]
      },
      {
        id: 4,
        text: "Quelle est la planète la plus proche du Soleil ?",
        options: ["Venus", "Mercure", "Mars", "Terre"],
        correct: [1]
      },
      {
        id: 5,
        text: "Quel est le plus grand pays du monde par la superficie ?",
        options: ["Russie", "Canada", "Chine", "États-Unis"],
        correct: [0]
      },
      {
        id: 6,
        text: "Quelle est la langue la plus parlée au monde ?",
        options: ["Mandarin", "Anglais", "Espagnol", "Français"],
        correct: [0]
      },
      {
        id: 7,
        text: "Quel est le nom du plus grand fleuve du monde ?",
        options: ["Nil", "Amazone", "Yangzi", "Mississippi"],
        correct: [0]
      },
      {
        id: 8,
        text: "Qui est l'auteur du livre 'Harry Potter' ?",
        options: ["J.K. Rowling", "Stephen King", "J.R.R. Tolkien", "George R.R. Martin"],
        correct: [0]
      },
      {
        id: 9,
        text: "Quelle est la capitale du Japon ?",
        options: ["Tokyo", "Osaka", "Kyoto", "Hiroshima"],
        correct: [0]
      },
      {
        id: 10,
        text: "Quel est le nom du système d'exploitation de Google ?",
        options: ["Windows", "macOS", "Linux", "Android"],
        correct: [3]
      }
    ];

    // Générer les questions
    function generateQuestions() {
      const questionsDiv = document.getElementById('questions');
      questionsDiv.innerHTML = '';

      questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
          <h2>${question.text}</h2>
          <div class="options" data-question="${index}">
            ${question.options.map((option, optIndex) => `
              <div class="option" data-option="${optIndex}" onclick="selectOption(${index}, ${optIndex})">
                ${option}
              </div>
            `).join('')}
          </div>
        `;
        questionsDiv.appendChild(questionDiv);
      });
    }

    // Sélectionner une option
    function selectOption(questionIndex, optionIndex) {
      const options = document.querySelectorAll(`[data-question="${questionIndex}"] .option`);
      options.forEach(option => option.classList.remove('selected'));
      const selectedOption = options[optionIndex];
      selectedOption.classList.add('selected');
      saveAnswer(questionIndex, optionIndex);
    }

    // Sauvegarder les réponses
    let answers = [];
    function saveAnswer(questionIndex, optionIndex) {
      answers[questionIndex] = optionIndex;
    }

    // Calculer le score
    function testqcm() {
      let score = 0;
      answers.forEach((answer, index) => {
        if (questions[index].correct.includes(answer)) {
          score++;
        }
      });
      alert(`Score : ${score}/${questions.length}`);
    }

    // Afficher les bonnes réponses
    function showAnswers() {
      let answersHtml = '<h2>Corrigé</h2>';
      questions.forEach((question, index) => {
        answersHtml += `<h3>Question ${index + 1}</h3>`;
        answersHtml += `<p>Question : ${question.text}</p>`;
        answersHtml += `<p>Bonne(s) réponse(s) : ${question.options.filter((_, i) => question.correct.includes(i)).join(', ')}</p>`;
      });
      const newWindow = window.open('', '_blank');
      newWindow.document.write(answersHtml);
      newWindow.document.close();
    }

    // Effacer les réponses
    function clearAnswers() {
      answers = [];
      document.querySelectorAll('.option').forEach(option => option.classList.remove('selected'));
    }

    // Initialiser le quizz
    generateQuestions();
