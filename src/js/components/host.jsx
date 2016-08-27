import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import HostEdit from '../components/hostedit'

export default React.createClass({
    loadHostFromServer: function(hostname) {
        $.ajax({
            url: "/api/hosts/"+hostname,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState( data);
                console.log(this.state.host);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error( status, err.toString());
            }.bind(this)
        });
    },
    setToEditMode :function(){
        this.setState({view:"edit"})
        console.log(this.state.view);
    },
    componentDidMount() {
        this.loadHostFromServer(this.props.params.hostname);
    },
    getInitialState: function() {
        return {host: null};
    },
    render: function () {
        if( this.state.host ){
            console.log(this.state.host.host_name);
            console.log(this.state.host.address);
            if( this.state.view == "edit" ){
                return (
                    <HostEdit host={this.state.host}/>
                )
            }else{
                return (
                    <div className="card">
                        <div onClick={this.setToEditMode} className="ui orange right ribbon label">Edit</div>
                        <h1>{this.state.host.host_name}</h1>
                        <p> {this.state.host.address} </p>
                        <div className="ui horizontal divider">
                            Hostgroups
                        </div>
                        {this.state.host.hostgroups.map(function(object, i){
                            return <Link to={`/hostgroup/${object}`}> <div className="ui blue label">{object}</div> </Link>;
                        })}
                        <div className="ui horizontal divider">
                            Services
                        </div>
                        {this.state.host.services.map(function(object, i){
                            return <Link to={`/services/${object.command}`}> <div className="ui blue label">{object.command}</div> </Link>;
                        })}
                    </div>
                );
            }
        }
        return (<div> loading </div>);
    }
});

