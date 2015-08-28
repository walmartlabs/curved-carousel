/*global document:false*/
import React from "react";
import App from "./app";

class Demo extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

const content = document.getElementById("content");

React.render(<Demo/>, content);
