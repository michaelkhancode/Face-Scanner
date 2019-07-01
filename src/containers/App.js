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
import Clarifai from  'clarifai';

const app = new Clarifai.App({
  apiKey: '22a0a8fa2edd4094b48c3055c1f3b86a'
 });

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
        route: "signin"
      }
  };

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
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
    .then( response => this.displayFaceBox(this.calculateFaceCoordinates(response)) ) 
    .catch( er => console.log(er) )
  };

  onRouteChange = (route) => {
    this.setState({route:route});
  };
  
  render() {
    console.log(this.state.route)
    return(
      <div className="App">
        <Particles params={particlesParams} className='particles' />
        <Navagation route={this.state.route} onRouteChange={this.onRouteChange} />
        {this.state.route === "signin" 
        ? 
        <Signin onRouteChange={this.onRouteChange} />
        :
        this.state.route === "register"
        ?
        <Register onRouteChange={this.onRouteChange}/>
        :
        <div>
          <Logo  />
          <Rank />   
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
