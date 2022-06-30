function saveToken(data){
    const payload = jwt_decode(data.token)

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', payload.email);
    localStorage.setItem('username', payload.username);
    localStorage.setItem('user_id', payload.userId);
    location.hash = '#feed';
}

function logout(){
    localStorage.clear();
    location.hash = '#login';
    document.querySelector('#userBtn').textContent = "Login";
    location.reload();
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

//toggles btn to read login or logout depnding on status
function toggleLoginLogoutBtn() {
    user = currentUser();
    const target = document.querySelector('#userBtn');
    if(target.textContent == "Login"){
       window.location.href = '../login&registration.html';
    }else{
        logout();
    }
}

const accountUserDisplay = () => {
    user = currentUser();
    const target = document.querySelector('#account-displayName');
    if(target != null){
        user == null ? target.textContent = `Welcome, please login to track habits now!` : target.textContent = `Welcome ${user}, to your personal habit tracker!`;
    }
}
accountUserDisplay();