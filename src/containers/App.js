import React from 'react';
import Navagation from '../components/Navagation/Navagation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import ImageDisplay from '../components/ImageDisplay/ImageDisplay';
import Particles from 'react-particles-js';
import './App.css';

const particlesParams = {
  particles: {
    number: {
      value:300,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends React.Component {

  constructor() {
    super();
    this.state = {
        input: "",
        imageURL: "",
        box: [],
        route: "signin",
        user: {
          id:"",
          name:"",
          email: "",
          password: "",
          enries:"",
          joined: ""
        }
      }
  };

  updateUserState = (user) => {
    const { id, name, email, password, entries, joined } = user;
    const updatedUser = { id, name, email, password, entries, joined }
    this.setState({user:updatedUser})
  }

  zeroUserState = () => {
    const zeroedUser = { id:"", name:"", email:"", password:"", entries:"", joined:"" };
    this.updateUserState(zeroedUser);
    this.setState({imageURL:""})
  }

  onInputChange = (event) => {
    this.setState( {input:event.target.value} )
  };

  calculateFaceCoordinates = (response) => {
    const image = document.getElementById("userImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const faceArray = response.outputs[0].data.regions;
    const coordsArray = faceArray.map((face,i) => {
      return({
        leftcol:   face.region_info.bounding_box.left_col * width,
        toprow:    face.region_info.bounding_box.top_row * height,
        rightcol:  width - (face.region_info.bounding_box.right_col * width),
        bottomrow: height - (face.region_info.bounding_box.bottom_row * height)
      })
    })
    return coordsArray;
  };

  displayFaceBox = (box) => {
    this.setState({box})
  }

  onButtonSubmit = (event) => { 
    this.setState( {imageURL:this.state.input} );
    fetch ("https://nameless-refuge-67323.herokuapp.com/imageface",{
        method:'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          input:this.state.input
        })
      })
    .then(response => response.json())
    .then( response => {
      if (response){
        fetch ("https://nameless-refuge-67323.herokuapp.com/image",{
            method:'put',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                id:this.state.user.id
            })
        })
        .then(data => data.json())
        .then(user => {
          console.log(user)
          this.displayFaceBox(this.calculateFaceCoordinates(response));  
          this.updateUserState(user);
        })
      }
    }) 
    .catch( er => console.log(er) )
  };

  onRouteChange = (route) => {
    this.setState({route:route});
  };
  
  render() {
    return(
      <div className="App">
        <Particles params={particlesParams} className='particles' />
        <Navagation zeroUserState={this.zeroUserState} route={this.state.route} onRouteChange={this.onRouteChange} />
        {this.state.route === "signin" 
        ? 
        <Signin 
          onRouteChange={this.onRouteChange} 
          updateUserState = {this.updateUserState}
        />
        :
        this.state.route === "register"
        ?
        <Register 
          onRouteChange={this.onRouteChange}
          updateUserState = {this.updateUserState}
        />
        :
        <div>
          <Logo  />
          <Rank user = { this.state.user }  />   
          <ImageLinkForm
          imageURL = { this.state.imageURL } 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
          />
          <ImageDisplay box={ this.state.box }  imageURL={ this.state.imageURL } /> 
        </div>
        }
        
      </div>

    );
  };

};

export default App;
