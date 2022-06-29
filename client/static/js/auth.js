function saveToken(data){
    const payload = jwt_decode(data.token)

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', payload.email);
    localStorage.setItem('username', payload.username);
    location.hash = '#feed';
}

function logout(){
    localStorage.clear();
    location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}