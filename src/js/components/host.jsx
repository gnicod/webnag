import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

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
            return (
                <div className="card">
                    <h1>{this.state.host.host_name}</h1>
                    <p> {this.state.host.address} </p>
                    {this.state.host.hostgroups.map(function(object, i){
                        return <Link to={`/hostgroup/${object}`}><div className="chip">{object}</div></Link>;
                    })}
                </div>
            );
		}
        return (<div> loading </div>);
    }
});

