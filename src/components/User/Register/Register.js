import React from 'react'
import onLogReg from '../Scripts/onLogReg'


class Register extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            wrongDetails: false

        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value});
        console.log(this.state.name)
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
        console.log(this.state.email)
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
        console.log(this.state.password)
    }

    wrongDetails = () => {
        console.log('working?')
        this.setState({wrongDetails: true})
    }



    // onSubmitSignIn = () => {
    //     fetch('http://localhost:3000/register', {
    //        method: 'post',
    //        headers: {'Content-Type': 'application/json'},
    //        body: JSON.stringify({
    //            email: this.state.email,
    //            password: this.state.password,
    //            name: this.state.name
    //        }) 
    //     })
    //     .then(response => response.json())
    //     .then(user => {
    //         if(user.id){
    //             //loadUser
    //             this.props.loadUser(user);
    //             this.props.onRouteChange('home')
    //         } else {
    //             this.setState({wrongDetails: true})
    //         }
    //     })
    //     console.log(this.state);
    // }

    render(){
        const {email, password, name} = this.state;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 white">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <p className={this.state.wrongDetails ? "":'dn'  } >Sorry, that emails been taken.</p>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 " htmlFor="name">Name</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange}
                                placeholder="Tom"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                                placeholder="tom@gmail.com"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
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
                        <div className="">
                            <input
                                onClick={ () => onLogReg(this.props.loadUser,this.props.onRouteChange, 'register', email, password, name, this.wrongDetails) }
                                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                                type="submit" value="Submit"/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;