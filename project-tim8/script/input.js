import {
    getQuestions,
    createQuestion,
    getQuestionById,
    deleteQuestionById,
    updateQuestionById,
} from "./api.js";
import { generateElement, Icon } from "./utils/index.js";

const quizList = document.getElementById("quiz_list");

const inputQuestion = document.getElementById("form-question");
const inputAnswer = document.getElementById("form-answer");
const inputCategory = document.getElementById("form-category");
const inputDifficulty = document.getElementById("form-difficulty");

const inputSearch = document.getElementById("form_search");

const inputId = document.getElementById("form-id");

const submitButton = document.getElementById("button_input");

document.addEventListener("DOMContentLoaded", () => {
    async function handleDeleteQuestion(id) {
        try {
            const result = await deleteQuestionById({ id });

            if (!result) return;

            if (result?.code === 200) {
                alert("Berhasil menghapus quiz");

                window.location.reload();
            }
        } catch (error) {
            console.error("Error ngirim Nih: ", {
                error,
            });
        }
    }

    async function handleShowQuestionById(id) {
        try {
            const result = await getQuestionById({ id });

            if (!result) return;

            inputQuestion.value = result?.title;
            inputAnswer.value = result?.answer;
            inputCategory.value = result?.category;
            inputDifficulty.value = result?.difficulty;
            inputId.value = result?.id;

            submitButton.classList.remove("button_input");
            submitButton.classList.add("button_input_edit");

            submitButton.innerText = "Edit?";
        } catch (error) {
            console.error("Error ngirim Nih: ", {
                error,
            });
        }
    }

    async function handleAddQuestion(payload) {
        try {

            const result = await createQuestion({ payload: payload });

            if (result?.code === 201) {
                alert("Berhasil menambahkan quiz");

                inputQuestion.value = "";
                inputCategory.value = "";
                inputAnswer.value = "";
                inputDifficulty.value = "";

                window.location.reload();
            }
        } catch (error) {
            console.error("Error ngirim Nih: ", {
                error,
            });
        }
    }

    async function handleUpdateQuestionById(id, payload) {
        try {
            const result = await updateQuestionById({ id, payload });

            if (!result) return;

            if (result?.code === 200) {
                alert("Berhasil mengubah quiz");

                window.location.reload();
            }
        } catch (error) {
            console.error("Error ngirim Nih: ", {
                error,
            });
        }
    }

    async function handleAllQuestion() {
        try {
            const questions = await getQuestions();
            const filteredQuestions = [...questions];

            if (!questions) return;

            inputSearch.addEventListener("keyup", (e) => {
                e.preventDefault();

                const searchTerm = inputSearch.value.trim().toLowerCase();
                const filtered = filteredQuestions.filter(
                    (question) =>
                        question.title.toLowerCase().includes(searchTerm) ||
                        question.answer.toLowerCase().includes(searchTerm) ||
                        question.category.toLowerCase().includes(searchTerm) ||
                        question.difficulty.toLowerCase().includes(searchTerm) 
                );

                renderQuestions(filtered);
            });

            renderQuestions(questions);
        } catch (error) {
            console.error("Ada error nih : ", {
                error,
            });
        }
    }

    handleAllQuestion();

    function renderQuestions(questions) {
        quizList.innerHTML = "";

        questions.forEach((question) => {
            const containerQuiz = generateElement({
                tag: "div",
                id: `quiz-${question?.id}`,
                className: "quiz-item",
            });

            const sectionLeftQuiz = generateElement({
                tag: "div",
                className: "section-left",
            });

            const questionElement = generateElement({
                tag: "h4",
                id: "quiz-question",
                value: question.title,
            });

            const answerElement = generateElement({
                tag: "p",
                id: "quiz-answer",
                value: question.answer,
            });

            const categoryElement = generateElement({
                tag: "p",
                id: "quiz-category",
                value: question.category,
            });

            const difficultyElement = generateElement({
                tag: "p",
                id: "quiz-difficulty",
                value: question.difficulty,
            });

            sectionLeftQuiz.append(...[questionElement, answerElement, categoryElement,difficultyElement]);

            const sectionRightQuiz = generateElement({
                tag: "div",
                className: "section-right",
            });

            const buttonEdit = generateElement({
                tag: "button",
                id: "button-edit",
                className: "btn btn-edit",
                elementHTML: Icon.update,
            });

            buttonEdit.addEventListener("click", async (e) => {
                e.preventDefault();

                handleShowQuestionById(question.id);
            });

            const buttonDelete = generateElement({
                tag: "button",
                id: "button-delete",
                className: "btn btn-delete",
                elementHTML: Icon.delete,
            });

            buttonDelete.addEventListener("click", async (e) => {
                e.preventDefault();

                handleDeleteQuestion(question.id);
            });

            sectionRightQuiz.append(...[buttonEdit, buttonDelete]);

            containerQuiz.append(
                ...[sectionLeftQuiz, sectionRightQuiz]
            );

            quizList.appendChild(containerQuiz);
        });
    }

    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const payload = {
            title: inputQuestion?.value || "",
            category: inputCategory?.value || "",
            difficulty: inputDifficulty?.value || "",
            answer: inputAnswer?.value || "",
        };

        if (inputId.value === "") {
            handleAddQuestion(payload);
        } else {
            handleUpdateQuestionById(inputId.value, payload);
        }
    });
});


