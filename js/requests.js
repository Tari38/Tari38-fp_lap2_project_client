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

//Post request for submitting user data
async function submitRegister(){

  // TEST PAYLOAD //
  const testPayload = {username: "user",  email: "user@gamil.com", password:"pass"};
  const passwordConfirm = document.querySelector('#register-password-confirm').value;
  // e.preventDefault();

  if(registerFormValidation(testPayload, passwordConfirm)){
    try {
      const options = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testPayload)
      }
      const response = await fetch(`${url}/users`, options);
      if(!response.ok) { 
        throw console.error("Invalid request data");
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

//Post request for submitting login user data
async function submitLogin(){
  // TEST PAYLOAD //
  const testPayload = {username: "user", password:"pass"};

  // check if token exists and is valid
  if(tokenIsValid){

  }else{
    // login and recieve new token
    try {
      const options = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testPayload)
      }
      const response = await fetch(`${url}/users`, options);
      const data = await response.json()
      if(response.ok){
        console.log(data);
        saveToken(data);
      }else { 
        throw console.error("Invalid request data");
      }

    } catch (err) {
      console.warn(err);
    }
  }
}

//Get request to obtain users habits
async function getHabits(){

  //check if user is currently has valid token
  if(currentUser()){
    try {
      // TEST PAYLOAD //
      //user_id should be taken from token in local storage
      const user_id = 1;

      const options = {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      }
      const response = await fetch(`${url}/habits/users/${user_id}`, options);
      if(!response.ok) { 
        throw console.error("Invalid request data");
      }
    } catch (err) {
      console.warn(err);
    }
  }else{
    throw console.error("User is not logged in");
  }
}

//Post request create new habit bound to user
async function createHabit(){
  // TEST PAYLOAD //
  let userId;
  const testPayload = {user_id: userId, title: "test habit", time: 1200, freq: 2, comment: "test comment"};
  
  //check if user is currently has valid token
  if(currentUser()){
    try {
      userId = 1;
      //get user id from token
      // userId = localStorage.getItem(user_id);

      const options = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testPayload)
      }
      const response = await fetch(`${url}/habits/`, options);
      if(!response.ok) { 
        throw console.error("Invalid request data");
      }
    } catch (err) {
      console.warn(err);
    }
  }else{
    throw console.error("User is not logged in");
  }
}