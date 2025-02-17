const exercises = [
      { title: "Exercice 1", description: "Créez une fonction qui retourne 'Hello, World!'.", solution: "function helloWorld() { return 'Hello, World!'; }" },
      { title: "Exercice 2", description: "Créez une fonction qui retourne la somme de deux nombres.", solution: "function sum(a, b) { return a + b; }" },
      { title: "Exercice 3", description: "Créez une fonction qui retourne le plus grand nombre dans un tableau.", solution: "function maxNumber(arr) { return Math.max(...arr); }" },
      { title: "Exercice 4", description: "Créez une fonction qui retourne un tableau inversé.", solution: "function reverseArray(arr) { return arr.reverse(); }" },
      { title: "Exercice 5", description: "Créez une fonction qui retourne un tableau sans doublons.", solution: "function uniqueArray(arr) { return [...new Set(arr)]; }" },
      { title: "Exercice 6", description: "Créez une fonction qui retourne un tableau filtré avec des nombres pairs.", solution: "function filterEven(arr) { return arr.filter(num => num % 2 === 0); }" },
      { title: "Exercice 7", description: "Créez une fonction qui retourne un tableau filtré avec des nombres impairs.", solution: "function filterOdd(arr) { return arr.filter(num => num % 2 !== 0); }" },
      { title: "Exercice 8", description: "Créez une fonction qui retourne un tableau filtré avec des nombres supérieurs à 10.", solution: "function filterGreaterThanTen(arr) { return arr.filter(num => num > 10); }" },
      { title: "Exercice 9", description: "Créez une fonction qui retourne un tableau filtré avec des nombres inférieurs à 10.", solution: "function filterLessThanTen(arr) { return arr.filter(num => num < 10); }" },
      { title: "Exercice 10", description: "Créez une fonction qui retourne un tableau filtré avec des nombres entre 5 et 15.", solution: "function filterBetweenFiveAndFifteen(arr) { return arr.filter(num => num >= 5 && num <= 15); }" },
      { title: "Exercice 11", description: "Créez une fonction qui retourne un tableau filtré avec des nombres pairs et supérieurs à 10.", solution: "function filterEvenAndGreaterThanTen(arr) { return arr.filter(num => num % 2 === 0 && num > 10); }" },
      { title: "Exercice 12", description: "Créez une fonction qui retourne un tableau filtré avec des nombres impairs et inférieurs à 10.", solution: "function filterOddAndLessThanTen(arr) { return arr.filter(num => num % 2 !== 0 && num < 10); }" },
      { title: "Exercice 13", description: "Créez une fonction qui retourne un tableau filtré avec des nombres pairs et entre 5 et 15.", solution: "function filterEvenAndBetweenFiveAndFifteen(arr) { return arr.filter(num => num % 2 === 0 && num >= 5 && num <= 15); }" },
      { title: "Exercice 14", description: "Créez une fonction qui retourne un tableau filtré avec des nombres impairs et entre 5 et 15.", solution: "function filterOddAndBetweenFiveAndFifteen(arr) { return arr.filter(num => num % 2 !== 0 && num >= 5 && num <= 15); }" },
      { title: "Exercice 15", description: "Créez une fonction qui retourne un tableau filtré avec des nombres pairs et inférieurs à 15.", solution: "function filterEvenAndLessThanFifteen(arr) { return arr.filter(num => num % 2 === 0 && num < 15); }" }
    ];

    function createExerciseCard(exercise) {
      const card = document.createElement('div');
      card.className = 'card';

      const title = document.createElement('h2');
      title.textContent = exercise.title;

      const description = document.createElement('p');
      description.textContent = exercise.description;

      const testButton = document.createElement('button');
      testButton.textContent = 'Tester';
      testButton.addEventListener('click', () => {
        const testArea = card.querySelector('.test-area');
        if (testArea.style.display === 'none' || testArea.style.display === '') {
          testArea.style.display = 'block';
        } else {
          testArea.style.display = 'none';
        }
      });

      const solutionButton = document.createElement('button');
      solutionButton.textContent = 'Voir la solution';
      solutionButton.addEventListener('click', () => {
        const solution = card.querySelector('.solution');
        if (solution.style.display === 'none' || solution.style.display === '') {
          solution.style.display = 'block';
        } else {
          solution.style.display = 'none';
        }
      });

      const testArea = document.createElement('div');
      testArea.className = 'test-area';
      testArea.style.display = 'none';

      const textarea = document.createElement('textarea');
      textarea.placeholder = 'Entrez votre code ici...';

      testArea.appendChild(textarea);

      const solution = document.createElement('div');
      solution.className = 'solution';
      solution.style.display = 'none';
      solution.textContent = exercise.solution;

      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(testButton);
      card.appendChild(solutionButton);
      card.appendChild(testArea);
      card.appendChild(solution);

      return card;
    }

    function renderExercises() {
      const container = document.getElementById('exercises-container');
      exercises.forEach(exercise => {
        const card = createExerciseCard(exercise);
        container.appendChild(card);
      });
    }

    document.addEventListener('DOMContentLoaded', renderExercises);
