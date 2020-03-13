import React, { Component } from 'react';
import { EditorView } from './View/EditorView';
import { AboutView } from './View/AboutView';
import { ContactView } from './View/ContactView';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AboutView/>
        <EditorView/>
        <ContactView/>
      </div>
    );
  }
}


export default App;
