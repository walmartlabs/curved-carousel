/*global document:false*/
import React from "react";
import {CurvedCarousel} from "../src/index";

class App extends React.Component {
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
          <img src="http://s30.postimg.org/r1tgqbr31/MV5_BMj_A1_MTQ3_Nz_U1_MV5_BMl5_Ban_Bn_Xk_Ft_ZTgw_MDE3_Mjg0_Mz_E.jpg"/>
          <img src="http://s30.postimg.org/dra7ajpwd/MV5_BMj_Ax_Njc0_Mj_Iy_M15_BMl5_Ban_Bn_Xk_Ft_ZTcw_NTM2_NDA4_MQ.jpg" />
          <img src="http://s30.postimg.org/6180j5cyl/MV5_BMj_E5_NDU2_Mzc3_MV5_BMl5_Ban_Bn_Xk_Ft_ZTcw_Nj_Aw_NTE5_OQ.jpg" />
          <img src="http://s30.postimg.org/gith15of1/MV5_BMTA2_OTE1_Njg4_Nj_Ve_QTJe_QWpw_Z15_Bb_WU3_MDAy_Nj_U4_MDM.jpg" />
          <img src="http://s30.postimg.org/fs0qvdm1p/MV5_BMTI3_MDc4_Nz_Uy_MV5_BMl5_Ban_Bn_Xk_Ft_ZTcw_MTQy_MTc5_MQ.jpg" />
          <img src="http://s30.postimg.org/xaesjwonx/MV5_BMTI4_Mzk4_MDk2_NV5_BMl5_Ban_Bn_Xk_Ft_ZTYw_ODgx_Njc4_V1.jpg" />
          <img src="http://s30.postimg.org/suwdenc9p/MV5_BMTkx_Mzk2_MDkw_OV5_BMl5_Ban_Bn_Xk_Ft_ZTcw_MDAx_ODQw_Mg.jpg" />
          <img src="http://s30.postimg.org/f51u5up5p/MV5_BMTQw_MTk3_NDU2_OV5_BMl5_Ban_Bn_Xk_Ft_ZTcw_NTA3_MTI0_Mw.jpg" />
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

const content = document.getElementById("content");

React.render(<App/>, content);
