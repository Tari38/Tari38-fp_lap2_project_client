const userInput = document.querySelector("#form-input-container");

const optionsGet = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  function sendRegForm(e) {
    e.preventDefault();
    const regForm = 
        document.getElementsByClassName("formContainer")[0].childNodes[0].textContent;
  
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //"Accept": "application/json"
    },
    body: JSON.stringify({
      id: randomId,
      form: regForm,
    }),
  }};

  userInput.reset();

  userInput.addEventListener('submit', sendRegForm);