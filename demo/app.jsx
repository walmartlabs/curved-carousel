/*eslint max-len:0 */
/*global document:false event:false */
import React from "react";
import {CurvedCarousel} from "../src/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curve: 50,
      friction: 0.95,
      rotation: true,
      spacing: 50
    };
    this._adjustCurve = this._adjustCurve.bind(this);
    this._adjustRotation = this._adjustRotation.bind(this);
    this._adjustFriction = this._adjustFriction.bind(this);
    this._adjustSpacing = this._adjustSpacing.bind(this);
  }
  _adjustRotation() {
    this.setState({
      rotation: event.target.checked
    });
  }
  _adjustCurve() {
    this.setState({
      curve: parseInt(event.target.value)
    });
  }
  _adjustSpacing() {
    this.setState({
      spacing: parseInt(event.target.value)
    });
  }
  _adjustFriction() {
    this.setState({
      friction: parseInt(event.target.value) / 100
    });
  }
  render() {
    return (
      <div className="demo">
        <CurvedCarousel
          childWidth={100}
          curve={this.state.curve}
          spacing={this.state.spacing}
          rotation={this.state.rotation}
          friction={this.state.friction}
          style={{
            height: 350}}>
            <img src="http://ia.media-imdb.com/images/M/MV5BMTU4NjY3NzgyM15BMl5BanBnXkFtZTcwODI4OTEzNA@@._V1_UY317_CR18,0,214,317_AL_.jpg" />
            <img src="http://ia.media-imdb.com/images/M/MV5BMjA1MTQ3NzU1MV5BMl5BanBnXkFtZTgwMDE3Mjg0MzE@._V1_UY317_CR52,0,214,317_AL_.jpg" />
            <img src="http://ia.media-imdb.com/images/M/MV5BMTkxMzk2MDkwOV5BMl5BanBnXkFtZTcwMDAxODQwMg@@._V1_UX214_CR0,0,214,317_AL_.jpg" />
            <img src="http://ia.media-imdb.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY317_CR19,0,214,317_AL_.jpg" />
            <img src="http://ia.media-imdb.com/images/M/MV5BMTA2OTE1Njg4NjVeQTJeQWpwZ15BbWU3MDAyNjU4MDM@._V1_UY317_CR22,0,214,317_AL_.jpg" />
            <img src="http://ia.media-imdb.com/images/M/MV5BMTQwMTk3NDU2OV5BMl5BanBnXkFtZTcwNTA3MTI0Mw@@._V1_UY317_CR6,0,214,317_AL_.jpg" />
            <img src="http://ia.media-imdb.com/images/M/MV5BMjAxNjc0MjIyM15BMl5BanBnXkFtZTcwNTM2NDA4MQ@@._V1_UY317_CR24,0,214,317_AL_.jpg" />
            <img src="http://ia.media-imdb.com/images/M/MV5BMTI4Mzk4MDk2NV5BMl5BanBnXkFtZTYwODgxNjc4._V1_UX214_CR0,0,214,317_AL_.jpg" />
            <img src="http://ia.media-imdb.com/images/M/MV5BMjE5NDU2Mzc3MV5BMl5BanBnXkFtZTcwNjAwNTE5OQ@@._V1_UY317_CR12,0,214,317_AL_.jpg" />
        </CurvedCarousel>
        <label>
        Curve:
        <input type="range"
          min="0"
          max="100"
          onChange={this._adjustCurve}
          defaultValue="50"/>
        </label>
        <label>
        Spacing:
        <input type="range"
          min="0"
          max="100"
          onChange={this._adjustSpacing}
          defaultValue="50"/>
        </label>
        <label>
        Friction:
        <input type="range"
          min="55"
          max="99"
          onChange={this._adjustFriction}
          defaultValue="95"/>
        </label>
        <label>
        Rotation:
        <input type="checkbox"
          onChange={this._adjustRotation}
          defaultChecked={true}/>
        </label>
      </div>
    );
  }
}
