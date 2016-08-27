import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export default React.createClass({
    render: function () {
        return (
            <tr>
                <td className="content">
                    <Link to={`/host/${this.props.host.host_name}`}>
                        <h4 className="ui image header">
                            {this.props.host.host_name}
                            <div className="sub header">{this.props.host.address} </div>
                        </h4>
                    </Link>
                </td>
                <td>
                    {this.props.host.hostgroups.map(function(object, i){
                        return <Link to={`/hostgroup/${object}`}><div className="ui basic label">{object}</div></Link>;
                    })}
                </td>
            </tr>
        );
    }
});

