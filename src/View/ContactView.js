import React, { Component } from 'react';

export class ContactView extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <h2>TODO</h2>
        <p>
          This is an onging project and many features are missing.
          Here is an incomplete list of future features.
          <br/>
          1. Visualization of the step to be added. Show faces and line selected.
          <br/>
          2. Ability to edit existing steps.
          <br/>
          3. Easier line selection. Ability to select edge, angle bisector,
          and endpoint at fraction of existing line.
          <br/>
          4. Better UI/UX.
          <br/>
          5. Database functions such as submit, edit, delete, view, sort.
          <br/>
          6. Versioning and changelog.
        </p>
        <h2>Contact</h2>
        <p>
         If you have any questions or comments, send an email
         to <a href="mailto:iicfcii@gmail.com">iicfcii@gmail.com</a> or visit
         project <a href="https://github.com/iicfcii/oriai">GitHub</a>.
        </p>
      </div>
    );
  }
}
