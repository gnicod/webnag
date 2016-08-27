import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export default React.createClass({
    loadHostGroupsFromServer: function() {
        $.ajax({
            url: "/api/hostgroups",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState( data);
                console.log(this.state.hostgroups);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error( status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {hostgroups: []};
    },
    componentDidMount() {
        this.loadHostGroupsFromServer();
        $('#hostgroups_select').dropdown();
    },
    render: function () {
        console.log(this.props);
        return (
            <div>
                <form className="ui form">
                    <h4 className="ui dividing header">Edit host {this.props.host.host_name}</h4>
                    <div className="field">
                        <label>Address</label>
                        <div className="field">
                            <input type="text" value={this.props.host.address} placeholder="address"/>
                        </div>
                    </div>
                    <div className="field">
                        <label>Alias</label>
                        <div className="field">
                            <input type="text" value={this.props.host.alias} placeholder="alias"/>
                        </div>
                    </div>
                    <div className="field">
                        <label>Hostgroups</label>
                        <div className="field">
                            <div className="ui fluid multiple search selection dropdown" id="hostgroups_select">
                                <i className="dropdown"></i>
                                <div className="default text">Select Hostgroups</div>
                                <div className="menu">
                                    {this.state.hostgroups.map(function(object, i){
                                       return  <div className="item green" data-value={object.hostgroup_name}>{object.hostgroup_name}</div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});


