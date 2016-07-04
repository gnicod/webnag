import React from 'react';

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
                        return <div className="chip">{object.command}</div>;
                    })}
                </div>
            );
		}
        return (<div> loading </div>);
    }
});

