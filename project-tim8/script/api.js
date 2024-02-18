const BASE_URL = "http://128.199.167.159/v1/idc";

export async function getQuestionById({ id = 1 }) {
  try {
    const response = await fetch(`${BASE_URL}/quiz/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result?.data;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function getQuestions() {
  try {
    const response = await fetch(`${BASE_URL}/quiz`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result?.data;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function createQuestion({ payload = undefined }) {
  try {
    const response = await fetch(`${BASE_URL}/quiz`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function updateQuestionById({ id = 1, payload = undefined }) {
  try {
    const response = await fetch(`${BASE_URL}/quiz/${id}/edit`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function deleteQuestionById({ id = 1 }) {
  try {
    const response = await fetch(`${BASE_URL}/quiz/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}