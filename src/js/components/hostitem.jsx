import React from 'react';

export default React.createClass({
    render: function () {
        return (
            <li className="collection-item avatar">
              <i className="material-icons circle">settings_input_component</i>
              <span className="title">
                  {this.props.host_name}
              </span>
              <p> {this.props.address} </p>
            </li>
        );
    }
});

