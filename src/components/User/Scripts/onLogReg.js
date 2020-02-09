//fetch and return user based on if and statment (register or login?)
//check user is legitimate then loadUser

//right now i'm having an issue with the data returned.
//props not passing

const onLogReg = (loadUser, onRouteChange, type, email, password,name, wrongDetails, guest) => {
    console.log(loadUser, onRouteChange,type, email, password, name, wrongDetails, guest);
    if (type === 'register'){
        console.log('register')
        fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
        }) 
        .then(response => response.json())
        .then(user => {
            if(user.id){
                //loadUser
                loadUser(user);
                onRouteChange('home')
            } else {
                wrongDetails()
            }
        })
    } else {
        console.log('log in')
        if (guest === 'guest') {
            email = "guest@gmail.com";
            password = "password";
        }
        fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
        })
        .then(response =>  response.json() )
        .then(user => {
            if(user.id){
                //loadUser
                loadUser(user);
                onRouteChange('home')
            } else {
                wrongDetails()
            }
        })
    
        
    }
}

export default onLogReg;

