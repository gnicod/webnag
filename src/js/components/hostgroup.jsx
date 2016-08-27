import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export default React.createClass({
    loadHostGroupFromServer: function(hostname) {
        $.ajax({
            url: "/api/hostgroups/"+hostname,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState( data);
                console.log(this.state.hostgroup);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error( status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount() {
        this.loadHostGroupFromServer(this.props.params.hostgroupname);
    },
    getInitialState: function() {
        return {hostgroup: null};
    },
    render: function () {
        if( this.state.hostgroup ){
            console.log(this.state.hostgroup);
            return (
                <div className="card">
                    <h1>{this.state.hostgroup.hostgroup_name}</h1>
                    {this.state.hostgroup.services.map(function(object, i){
                        //return <Link to={`/hostgroup/${object}`}><div className="chip">{object}</div></Link>;
                        return <div className="ui label teal">{object.command}</div>;
                    })}
                    {this.state.hostgroup.hosts.map(function(object, i){
                        return <Link to={`/host/${object.host_name}`}><div>{object.host_name}</div></Link>;
                    })}
                </div>
            );
        }
        return (
            <div class="ui segment">
                <div class="ui active inverted dimmer">
                    <div class="ui medium text loader">Loading</div>
                </div>
                <p></p>
                <p></p>
            </div>);
    }
});

