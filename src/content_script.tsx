chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});
import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'white', padding: '100px' }}>
      <h1>Hello from React Chrome Extension!</h1>
    </div>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

ReactDOM.render(<App />, rootElement);