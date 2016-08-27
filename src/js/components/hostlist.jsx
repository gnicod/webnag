import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import HostItem from '../components/hostitem'

export default React.createClass({
    render: function() {
        if( this.props.data.hosts.length > 0 ){
        var hostNodes = this.props.data.hosts.map(function(host) {
            return (
                        <HostItem host={host}>
                            {host.host_name}
                        </HostItem>
            );
        });
        return (
            <table className="ui very basic celled table fixed">
                <thead>
                    <tr>
                        <th>Host</th>
                        <th>Hostgroups</th>
                    </tr>
                </thead>
                {hostNodes}
            </table>
        );
        }else{
            return(<div className="ui segment">
                <div className="ui active inverted dimmer">
                    <div className="ui medium text loader">Loading</div>
                </div>
                <p></p>
                <p></p>
            </div>
            )
        }
    }
});

