[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
***
NOTICE: SUPPORT FOR THIS PROJECT HAS ENDED 

This projected was owned and maintained by Walmart. This project has reached its end of life and Walmart no longer supports this project.

We will no longer be monitoring the issues for this project or reviewing pull requests. You are free to continue using this project under the license terms or forks of this project at your own risk. This project is no longer subject to Walmart's bug bounty program or other security monitoring.


## Actions you can take

We recommend you take the following action:

  * Review any configuration files used for build automation and make appropriate updates to remove or replace this project
  * Notify other members of your team and/or organization of this change
  * Notify your security team to help you evaluate alternative options

## Forking and transition of ownership

For [security reasons](https://www.theregister.co.uk/2018/11/26/npm_repo_bitcoin_stealer/), Walmart does not transfer the ownership of our primary repos on Github or other platforms to other individuals/organizations. Further, we do not transfer ownership of packages for public package management systems.

If you would like to fork this package and continue development, you should choose a new name for the project and create your own packages, build automation, etc.

Please review the licensing terms of this project, which continue to be in effect even after decommission.##curved-carousel

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
