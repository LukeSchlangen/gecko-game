import React, { Component } from 'react';

export default class Horse extends Component {
  constructor(props) {
    super(props);

    this.state = { dimensions: {} };
    this.onImgLoad = this.onImgLoad.bind(this);
  }


  onImgLoad({ target: img }) {
    this.setState({
      dimensions: {
        height: img.offsetHeight,
        width: img.offsetWidth,
      },
    });
  }

  render() {
    const { width, height } = this.state.dimensions;
    const leftPosition = this.props.percentLeft && width ? (window.innerWidth *
      (this.props.percentLeft / 100)) - width : -10000;
    const topPosition = this.props.lane && height ? (((this.props.lane * height) / 6) +
    ((window.innerHeight * 35) / 100)) : -10000;
    return (
      <img
        onLoad={this.onImgLoad}
        src={`/assets/horse_gifs/horse-${this.props.number}.gif`}
        alt="horse"
        style={{
          maxWidth: '20vw',
          maxHeight: '20vh',
          position: 'absolute',
          left: leftPosition,
          top: topPosition,
        }}
      />
    );
  }
}

Horse.defaultProps = {
  percentLeft: 0,
};

