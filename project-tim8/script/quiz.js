import { generateRandomNumber, generateElement } from "./utils/index.js";
import { getQuestionById } from "./api.js";


// const question = document.getElementById("question");
// const category = document.getElementById("category");
// const difficulty = document.getElementById("difficulty");
// const quiz_button = document.getElementById("quiz_button")

document.addEventListener("DOMContentLoaded", () => {
  question.innerText = "do you want to play quiz?"

  quiz_button.addEventListener("click", async () => {
    const generateNumber = generateRandomNumber(1, 6);

    try {
      const response = await getQuestionById({ id: generateNumber});

      if (!response) return
      
      question.innerText = response.title 
      answer.innerText = response.answer   
      category.innerText = response.category
      difficulty. innerText = response.difficulty
    }catch (error) {
      console.error("Error nich : ", { error });
    }
  });
});