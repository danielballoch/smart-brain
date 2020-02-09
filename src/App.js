import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/User/SignIn/SignIn';
import Register from './components/User/Register/Register';
import Particles from 'react-particles-js';
import './App.css';



const particleOptions = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800 
            }
        },
        "line_linked":{
            "width": 2
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            }
        }
    }
}

const initialState = {
    input: '',
            imgUrl: '',
            box: {},
            route: 'signin',
            isSignIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
}



class App extends Component {

    constructor(){
        super();
        this.state = initialState;
    }


    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }

    onSubmitRegister = (email, password, name) => {
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
                this.props.loadUser(user);
                this.props.onRouteChange('home')
            } else {
                this.setState({wrongDetails: true})
            }
        })
        console.log(this.state);
    }

    createGuest = () => {
        const email = 'guest@gmail.com';
        const password = 'password';
        const name = 'Guest';
        fetch('http://localhost:3000/signin', {
           method: 'post',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
               email: email,
               password: password
           }) 
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                console.log('guest already created')
            } else {
                //delete and re-create guest.
                console.log('create guest')
                this.deleteUser(email, password);
                this.onSubmitRegister(email, password, name);
            }
        })
    }

    deleteUser = (email, password) => {
        console.log(email, password)
        fetch('http://localhost:3000/delete', {
           method: 'delete',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
               email: email ,
               password: password
           }) 
        })
        .then(response => response.json())
    }


    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.right_col * height)
        }

    }



    displayFacebox = (box) => {
        this.setState({box: box})
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onPictureSubmit = () => {
        this.setState({imgUrl: this.state.input})
        fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            }) 
        })
        .then(response => response.json())
        .then(response => {
            if(response){
                fetch('http://localhost:3000/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    }) 
                })
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}))
                })
                .catch(console.log)
            }
            this.displayFacebox(this.calculateFaceLocation(response)) 
        })
        
        .catch(err => console.log(err));
    }

    componentDidMount () {
        const script = document.createElement("script");
    
        script.src = "https://cdn.rawgit.com/progers/pathseg/master/pathseg.js";
        script.async = true;

        document.body.appendChild(script);

        fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(console.log)
        this.createGuest();
        

    }


    onRouteChange = (route) => {
        if (route === 'signin'){
            this.setState(initialState);
        } else if ( route === 'home'){
            this.setState({isSignIn: true})
        }
        this.setState({route: route})
    }

    render(){
        const { isSignIn, route, box, imgUrl } = this.state;
        return (
            <div className="App">
            <Particles className='particles' params={particleOptions}/>
            <Navigation isSignIn={isSignIn} onRouteChange={this.onRouteChange}/>
            {/* <Logo/> */}
            { route === 'home'?  
            <div>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onPictureSubmit}/>
                <FaceRecognition box={box} imgUrl={imgUrl}/>
            </div>
            :
            route === 'signin'? 
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            }
            </div>
        );
    }
}

export default App;
