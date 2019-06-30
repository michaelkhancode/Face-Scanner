import React from 'react';
import Navagation from '../components/Navagation/Navagation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
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

const defaultImage = "https://samples.clarifai.com/face-det.jpg";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
        input: "",
        imageURL: "",
        box: {}
      }
  };

  onInputChange = (event) => {
    this.setState( {input:event.target.value} )
  };

  calculateFaceCoordinates = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("userImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return({
      leftcol:  clarifaiFace.left_col * width,
      toprow:   clarifaiFace.top_row * height,
      rightcol: width - (clarifaiFace.right_col * width),
      bottomrow:  height - (clarifaiFace.bottom_row * height)
    })
  };

  displayFaceBox = (box) => {
    this.setState({box})
  }

  onButtonSubmit = (event) => {
    this.setState( {imageURL:this.state.input} );

    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
    .then( response => this.displayFaceBox(this.calculateFaceCoordinates(response))) 
    .catch( er => console.log(er) )
  };

  render() {
    return(
      <div className="App">
         <Particles params={particlesParams} className='particles' />
        <Navagation  />
        <Logo  />       
        <Rank />   
        <ImageLinkForm
        imageURL = { this.state.imageURL } 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
        />
        <ImageDisplay box={ this.state.box }  imageURL={ this.state.imageURL } />
      </div>
    );
  };

};

export default App;
