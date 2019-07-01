
import React from 'react';

const Signin = ({onRouteChange}) => {
    return(
        <div className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" >Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                                type="submit"  
                                value="Sign in"
                                onClick = {() => onRouteChange("home")}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p 
                            href="#0" 
                            className="f4 link dim black db pointer"
                            onClick={() => onRouteChange("register")}
                        >
                            Register
                        </p>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Signin;


