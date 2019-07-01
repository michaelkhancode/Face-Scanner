import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName:"",
            registerEmail:"",
            registerPassword:""
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }
    
    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onSubmitRegister = (event) => {
        event.preventDefault();
        fetch ("http://localhost:3000/register",{
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                name:this.state.registerName,
                email:this.state.registerEmail,
                password:this.state.registerPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.props.updateUserState(data)
                this.props.onRouteChange("home");
            })
    }

    render() {
        return(
            <div className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" >Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="name" name="name"  id="name"
                                    onChange = { this.onNameChange }
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" >Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" name="email-address"  id="email-address" 
                                    onChange = { this.onEmailChange }
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" >Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" name="password"  id="password" 
                                    onChange = { this.onPasswordChange }
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                                    type="submit"
                                    value="Register"
                                    onClick = { this.onSubmitRegister }
                            />
                        </div>
                    </form>
                </main>
            </div>
        );
    }
}

export default Register;
