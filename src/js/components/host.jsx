import React from 'react';

export default React.createClass({
    render: function () {
        return (
            <div className="host">
                <h2 className="host_name">
                    {this.props.host_name}
                </h2>
				<div className="address">
					{this.props.address}
				</div>
            </div>
        );
    }
});

