##curved-carousel

> A simple way to create an infinitely scrollable carousel, with optional curvature.

![http://i.imgur.com/QH0lxTn.gif](http://i.imgur.com/QH0lxTn.gif)

#Install

`npm install curved-carousel`

##Usage

In order to use curved-carousel, wrap child elements with it as shown below:

```javascript
<CurvedCarousel
  childWidth={100}
    style={{height: 350}}>
    <img src="img1.png"/>
    <img src="img2.png"/>
    <img src="img3.png"/>
    <img src="img4.png"/>
</CurvedCarousel>

```

**Note: it is generally adviseable to set a height on this component**

## Props

####**childWidth**

*React.PropTypes.number*

This should be a number, in pixels, of how wide child tiles should be.

*Default value:* `180`

####**curve**

*React.PropTypes.number*

This should be a number between 0 and 100, that sets how curved the carousel should be.

*Default value:* `50`

####**spacing**

*React.PropTypes.number*

This should be a number, in pixels, of the amount of space between tiles.

*Default value:* `40`

####**rotation**

*React.PropTypes.bool*

When set to true, tiles will be rotated along the curve set with the `curve` prop.

*Default value:* `true`

####**friction**

*React.PropTypes.number*

This should be a float, between `0.0` and `0.99`, that sets the amount of friction on the animation physics, with `1.0` essentially being no friction at all and `0.0` having no release at all.

*Default value:* `0.95`

## Development

Please see [DEVELOPMENT](DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)
