//
// ─── FRONTEND DB FUNCTIONS ──────────────────────────────────────────────────────
//

//Requires values of register form and validates password matchcase and not null username, email and password
async function registerFormValidation({username, email, password}, passwordConfirm){
    if(username && email && password){
      if(password == passwordConfirm){
        return true;
      }
    }else{
        return new Error("Invalid or incorrect information"), false;
    }
}

const url = 'http://localhost:3000';

const regForm = document.querySelector('#register-form');
if(regForm != null){
  regForm.addEventListener('submit', submitRegister);
}

//Post request for submitting user data
async function submitRegister(e){
  e.preventDefault();

  //collect data from submission of form data
  const data = Object.fromEntries(new FormData(e.target));
  const payload = {username: data['register-username'],  email: data['register-email'], password: data['register-password']};
  const passwordConfirm =  data['register-password-confirm'];

  if(registerFormValidation(payload, passwordConfirm)){
    console.log("register valid")
    try {
      const options = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
      }
      const response = await fetch(`${url}/users`, options);
      if(!response.ok) { 
        throw console.error("Invalid request data");
      }
    } catch (err) {
      console.warn(err);
    }
  }else{
    throw console.error("Passwords do not match");
  }
}

const logForm = document.querySelector('#register-form');
if(logForm != null){
  logForm.addEventListener('submit', submitLogin);
}

//Post request for submitting login user data
async function submitLogin(){
  const token = localStorage.getItem('token');
  // check if token exists and is valid
  if(token){
    // show user logged in and or redirect to habits
    console.log(token);
  }else{
    // login and recieve new token
    const data = Object.fromEntries(new FormData(e.target));
    const Payload = {username: data["login-username"], password: data["login-password"]};

    try {
      const options = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Payload)
      }
      const response = await fetch(`${url}/users`, options);
      const data = await response.json()
      if(response.ok){
        console.log(data);
        saveToken(data);
      }else { 
        throw console.error("Invalid request data");
      }

    }catch{
      throw console.error("Incorrect login details");
    }
  }
}

const windowName = window.location.pathname;
if(windowName == '/client/static/private/accountPage.html'){
  getHabits();
}

//Get request to obtain users habits
async function getHabits(){

  //check if user is currently has valid token
  try{
    if(currentUser()){

      const user_id = localStorage.getItem('user_id');
      const options = {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      }

      const response = await fetch(`${url}/habits/users/${user_id}`, options);
      const data = await response.json()
      if(response.ok) { 
        populateHabitList(data);
      }else{
        throw console.error("Invalid request data");
      }
    }else{
      // console.error("User is not logged in");
    }
    
  }catch{
    throw console.warn('Could not complete request');
  }
}

const createHabitForm = document.querySelector('#create-habit-form');
if(createHabitForm != null){
  createHabitForm.addEventListener('submit', createHabit);
}

//Post request create new habit bound to user
async function createHabit(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  // //check if user is currently logged in and entry is valid
  if(currentUser() && validateHabitCreation(data)){
    try{
      // const userId = localStorage.getItem('user_id');
      const userId = 1; //TEST DATA

      const Payload = {name: data['new-habit-title'], frequency: parseInt(data['new-habit-freq']), time: parseInt(data['new-habit-time']), _comment: data['new-habit-comment'], user_id: userId,};
    
      const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Payload)
      }
    
      const response = await fetch(`${url}/habits/`, options);
      if(!response.ok) { 
        console.error("Invalid request data");
      }

    }catch{
      throw console.error("Request could not be complete");
    }

  }else{
    console.error("User is not logged in");
  }
};
       
function validateHabitCreation(data){
  //if any value is null, validation will return false else true
  for (const [key, value] of Object.entries(data)) {
    console.log(value);
    if(value == null){
      return false;
    }
  }
  return true;
}
