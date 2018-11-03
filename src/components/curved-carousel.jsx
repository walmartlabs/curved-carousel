/* eslint no-unused-lets:0 */
/*global window, requestAnimationFrame*/

import React from 'react';
import cloneWithProps from 'react/lib/cloneWithProps';

React.initializeTouchEvents(true);

class CurvedCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      left: (this.props.children.length * -1) * (this.props.childWidth + this.props.spacing),
      top: 0,
      velocity: 0,
      accel: 0,
      containerWidth: 0
    };
    this.touchObject = {};
    this.clickSafe = true;
    this._getMouseEvents = this._getMouseEvents.bind(this);
    this._rafCb = this._rafCb.bind(this);
    this._setPosition = this._setPosition.bind(this);
  }
  componentDidMount() {
    this._startRaf();
    this._setPosition();
    window.addEventListener('load', this._setPosition);
    window.addEventListener('resize', this._setPosition);
  }
  render() {
    return (
      <div
        className="infinite-scroll"
        {...this._getMouseEvents()}
        ref="container"
        {...this.props}>
        <div style={{position: 'relative', height: '100%', width: '100%', overflow: 'hidden'}}>
          {this._childrenWithPositions()}
        </div>
      </div>
    )
  }
  _setPosition() {
    this.setState({
      containerWidth: React.findDOMNode(this.refs.container).offsetWidth
    })
  }
  _onSelect(index) {
    if (Math.abs(this.state.velocity) < 0.5) {
      this.props.onSelect && this.props.onSelect.call(null, this.currentChildren[index].props.originalIndex);
    }
  }
  _childrenWithPositions() {
    let children = Array.prototype.slice.call(this.props.children, 0);
    let returnChildren = [];
    Array.prototype.slice.call(this.props.children, 0, this.props.children.length).reverse()
      .forEach((child, index) => {
        children.unshift(cloneWithProps(child, {key: 'clone' + (children.length - index)}));
      });
    Array.prototype.slice.call(this.props.children, 0, this.props.children.length)
      .forEach((child, index) => {
        children.push(cloneWithProps(child, {key: 'clone' + index}));
      });
    children.forEach((child, index) => {
      let left = (this.state.left +
        (index * (this.props.childWidth + this.props.spacing)));

      const alpha = 360 / this.state.containerWidth *
        (this.state.containerWidth / 2);

      const R = this.state.containerWidth;

      const y = left * Math.cos(1);

      let degrees = y / Math.PI * (this.props.curve / 100);

      let top = (Math.abs(y) * (this.props.curve / 100) / Math.SQRT1_2);

      const exp = left / (this.props.childWidth + this.props.spacing);

      top = top * Math.abs(exp) * ((Math.LN10 / 10));

      if(this.props.rotation === false) {
        degrees = 0;
      }

      const style = {
        position: 'absolute',
        left: left + (this.state.containerWidth / 2) - (this.props.childWidth / 2),
        transform: 'rotate(' + degrees + 'deg)',
        transformOrigin: 'bottom center',
        top: top,
        width: this.props.childWidth
      };
      returnChildren.push(cloneWithProps(child, {style: style, key: index, onClick: this._onSelect.bind(this, index)}));
    });

    this.currentChildren = returnChildren;

    return returnChildren;
  }
  _getMouseEvents() {
    var self = this;

    if (this.props.dragging === false) {
      return null;
    }

    return {
      onMouseDown(e) {
        self.touchObject = {
            startX: e.pageX,
            startY: e.pageY,
            prevX: e.pageX,
            prevY: e.pageY,
            endX: e.pageX,
            endY: e.pageY,
            previousTime: new Date(),
            currentTime: new Date()
        };

        self.setState({
          dragging: true,
          velocity: 0
        });
      },
      onMouseMove(e) {
        if (!self.state.dragging) {
          return;
        }

        if (!self.touchObject) {
          return;
        }

        var direction = self._swipeDirection(
          self.touchObject.startX,
          e.clientX,
          self.touchObject.startY,
          e.clientY
        );

        if (direction !== 0) {
          e.preventDefault();
        }

        var length = self.props.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - self.touchObject.startY, 2)))
                                         : Math.round(Math.sqrt(Math.pow(e.clientX - self.touchObject.startX, 2)))

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          previousTime: self.touchObject.currentTime,
          currentTime: new Date(),
          prevX: self.touchObject.endX,
          prevY: self.touchObject.endY,
          endX: e.pageX,
          endY: e.pageY,
          length: length,
          direction: direction
        };

        let left = self.state.left + (e.clientX - self.touchObject.prevX);

        if (left < (self.props.children.length * -2) * (self.props.childWidth + self.props.spacing)) {
          left = (self.props.children.length * -1) * (self.props.childWidth + self.props.spacing);
        }

        if (left > (self.props.children.length * -1) * (self.props.childWidth + self.props.spacing)) {
          left = (self.props.children.length * -2) * (self.props.childWidth + self.props.spacing);
        }

        self.setState({
          left: left
        });
      },
      onMouseUp(e) {
        if (!self.state.dragging) {
          return;
        }

        if (!self.touchObject) {
          return;
        }

        let velocity = self.touchObject.prevX - self.touchObject.endX !== 0 ?
          (self.touchObject.prevX - self.touchObject.endX) /
          (self.touchObject.currentTime - self.touchObject.previousTime)
          * 12 : 0;

        self.setState({
          dragging: false,
          velocity: velocity
        }, function() {
          self._handleSwipe(e);
        });

      },
      onMouseLeave(e) {
        if (!self.state.dragging) {
          return;
        }

        if (!self.touchObject) {
          return;
        }

        let velocity = self.touchObject.prevX - self.touchObject.endX !== 0 ?
          (self.touchObject.prevX - self.touchObject.endX) /
          (self.touchObject.currentTime - self.touchObject.previousTime)
          * 17 : 0;

        self.setState({
          dragging: false,
          velocity: velocity
        }, function() {
          self._handleSwipe(e);
        });

      }
    }
  }
  _handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopPropagation();
    }
  }
  _handleSwipe() {
    this.touchObject = null;
    this._startRaf();
  }
  _swipeDirection(x1, x2, y1, y2) {

    var xDist, yDist, r, swipeAngle;

    xDist = x1 - x2;
    yDist = y1 - y2;
    r = Math.atan2(yDist, xDist);

    swipeAngle = Math.round(r * 180 / Math.PI);
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }
    if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
      return 1;
    }
    if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
      return 1;
    }
    if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
      return -1;
    }
    if (this.props.vertical === true) {
      if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;

  }
  _rafCb() {

    if (this.state.dragging) {
      return;
    }

    let vel = this.state.velocity.toFixed(2) * this.props.friction;

    if (Math.abs(vel) < 0.1) {
      return;
    }

    let left = this.state.left - vel;

    if (left < (this.props.children.length * -2) * (this.props.childWidth + this.props.spacing)) {
      left = (this.props.children.length * -1) * (this.props.childWidth + this.props.spacing);
    }

    if (left > (this.props.children.length * -1) * (this.props.childWidth + this.props.spacing)) {
      left = (this.props.children.length * -2) * (this.props.childWidth + this.props.spacing);
    }

    this.setState({
      velocity: vel,
      left: left
    });

    requestAnimationFrame(this._rafCb);
  }
  _startRaf() {
    requestAnimationFrame(this._rafCb);
  }
}

CurvedCarousel.displayName = 'CurvedCarousel';

CurvedCarousel.propTypes = {
  childWidth: React.PropTypes.number,
  curve: React.PropTypes.number,
  spacing: React.PropTypes.number,
  rotation: React.PropTypes.bool,
  friction: React.PropTypes.number
};

CurvedCarousel.defaultProps = {
  childWidth: 180,
  curve: 50,
  spacing: 40,
  rotation: true,
  friction: 0.95
};

module.exports = CurvedCarousel;
