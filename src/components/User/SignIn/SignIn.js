import React from 'react'
import onLogReg from '../Scripts/onLogReg'


class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            wrongDetails: false

        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    wrongDetails = () => {
        console.log('working?')
        this.setState({wrongDetails: true})
    }

    // onSubmitSignIn = (guest) => {
    //     let email = this.state.signInEmail;
    //     let password = this.state.signInPassword;
    //     if (guest === 'guest') {
    //         email = "guest@gmail.com";
    //         password = "password";
    //     }
    //     fetch('http://localhost:3000/signin', {
    //        method: 'post',
    //        headers: {'Content-Type': 'application/json'},
    //        body: JSON.stringify({
    //            email: email,
    //            password: password
    //        }) 
    //     })
    //     .then(response => response.json())
    //     .then(user => {
    //         if(user.id){
    //             this.props.loadUser(user);
    //             this.props.onRouteChange('home')
    //         } else {
    //             console.log(user)
    //             this.setState({wrongLogin: true})
    //         }
    //     })
        
        
        
        
    //}
    // .then(data => {
        //     if(data === 'success'){
        //         this.props.onRouteChange('home')
        //     }
        // })

    render(){
        const { onRouteChange } = this.props;
        const {signInEmail, signInPassword} = this.state;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 white">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 ">Sign In</legend>
                            <p className={this.state.wrongDetails? "":'dn'  } >Incorrect email or password.</p>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 " htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange} 
                                placeholder="guest@gmail.com"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 " htmlFor="password">Password</label>
                                <input 
                                className=" pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange} 
                                placeholder="password"
                                />
                            </div>
                        </fieldset>
                        <div className="flex justify-center">
                            <input
                                onClick={() => onLogReg(this.props.loadUser,this.props.onRouteChange,'signin', signInEmail, signInPassword, "", this.wrongDetails)}
                                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                                type="submit" value="Sign in" auto-complete="email"/>
                                
                            <p onClick={() => onRouteChange("register")} className="f6 link dim db pointer ph3">Register</p>
                        </div>
                        
                        <div className="lh-copy mt3">
                            <p onClick={() => onLogReg(this.props.loadUser,this.props.onRouteChange,'signin', signInEmail, signInPassword, "", this.wrongDetails, "guest")} className="f6 link dim db pointer pv2">Sign in as Guest</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    };
}

export default SignIn;