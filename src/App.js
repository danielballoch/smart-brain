import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
        fetch('https://floating-falls-31061.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            }) 
        })
        .then(response => response.json())
        .then(response => {
            if(response){
                fetch('https://floating-falls-31061.herokuapp.com/image', {
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

        fetch('https://floating-falls-31061.herokuapp.com/')
        .then(response => response.json())
        .then(console.log)
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
            <Logo/>
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
