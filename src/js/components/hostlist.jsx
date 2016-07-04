import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import HostItem from '../components/hostitem'

export default React.createClass({
    render: function() {
        var hostNodes = this.props.data.hosts.map(function(host) {
            return (
                <div>
                    <Link to={`/host/${host.host_name}`}>
                        <HostItem host_name={host.host_name} address={host.address}>
                            {host.host_name}
                        </HostItem>
                    </Link>
                </div>
            );
        });
        return (
            <ul className="collection with-header">
                <li className="collection-header"><h4>Hosts</h4></li>
                {hostNodes}
            </ul>
        );
    }
});

