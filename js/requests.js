//
// ─── FRONTEND DB FUNCTIONS ──────────────────────────────────────────────────────
//

//Requires values of register form and validates password matchcase and not null username, email and password

const url = 'http://localhost:3000';
// const API_URL = 'https://fp-lap2-habit-tracker-server.herokuapp.com/';


async function registerFormValidation({username, email, password}, passwordConfirm){
    if(username && email && password){
      if(password == passwordConfirm){
        return true;
      }
    }else{
        return new Error("Invalid or incorrect information"), false;
    }
}

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
    try { 
      const options = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
      }
      const response = await fetch(`${url}/auth/register`, options);
      if(response.ok) { 
        submitLogin(e, payload);
      }
    }catch{
      console.error("Invalid request data");
    }
  }else{
    throw console.error("Passwords do not match");
  }
}

const logForm = document.querySelector('#login-form');
if(logForm != null){
  logForm.addEventListener('submit', submitLogin);
}

//Post request for submitting login user data
async function submitLogin(e, _regLog = {}){
  e.preventDefault();

  //if optional _regLog that is called within registration is either undefined or empty, then that is because its a manual login and data is coming from the formEntries object
  if(_regLog["username"] == undefined || _regLog["username"] == null){
    const userdata = Object.fromEntries(new FormData(e.target));
    const payload = {username: userdata["login-username"], password: userdata["login-password"]};
    login(payload);
  }else{
    const payload = {username: _regLog["username"], password: _regLog["password"]}
    login(payload);
  }
  
  async function login(loginData){
    try {
      // login and recieve new token
      logout()//clear stash of invalid token
      
      const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      }
      const response = await fetch(`${url}/auth/login`, options);
      const data = await response.json()
      if(response.ok){
        saveToken(data);
        //redirect
    }else { 
      console.error("Invalid request data");
    }
    }catch {
      console.error('User does not exist');
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

      const response = await fetch(`${API_URL}/habits/users/${user_id}`, options);
      const data = await response.json()
      if(response.ok) { 
        populateHabitList(data);
      }else{
        throw console.error("Invalid request data");
      }
    }else{
      console.error("User is not logged in");
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
  // e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  // check if user is currently logged in and entry is valid
  if(currentUser() && validateHabitCreation(e, data)){  
    try{
      const userId = localStorage.getItem('user_id');
      const Payload = {name: data['new-habit-title'], frequency: parseInt(data['new-habit-frequency']), time: parseInt(data['new-habit-time']), _comment: data['new-habit-comment'], user_id: userId,};
    
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
  return false;
};
       
function validateHabitCreation(e, data){
  e.preventDefault();
  //if any value is null, validation will return false else true
  for (const [key, value] of Object.entries(data)) {
    if(value == null){
      return false;
    }
  }
  return true;
}
