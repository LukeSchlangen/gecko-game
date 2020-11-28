import React, { Component } from 'react';
import fire from '../../fire';
import './Whip.css';
import woodImage from '../../images/wood-background.jpg';

class Whip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: 70,
    };
    this.addWhip = this.addWhip.bind(this);
    this.recover = this.recover.bind(this);
  }

  componentDidMount() {
    setInterval(this.recover, 100);
  }

  addWhip(event) {
    event.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database()
      .ref('horses')
      .child(this.props.horses.selectedHorseId)
      .child('whips')
      .push(this.state.power);
    const power = Math.max(this.state.power - 5, 0);
    this.setState({
      power,
    });
  }

  recover() {
    const power = Math.min(this.state.power + 0.1, 100);
    this.setState({
      power,
    });
  }

  render() {
    return (
      <div style={{
        backgroundImage: woodImage,
        height: '100vh',
        width: '100vw',
      }}>
        <img src="assets/wood.png" alt="whip effect" className="whip-effect" height={`${this.state.power}%`} />
        {this.state.power}
        <span className="center">
          <button className="select-button" onClick={this.addWhip} >Whip</button>
        </span>

      </div>
    );
  }
}

export default Whip;
