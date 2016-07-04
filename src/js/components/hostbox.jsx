import React from 'react';
import HostList from '../components/hostlist'

export default React.createClass({
	loadHostsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: {"hosts" : []}};
	},
	componentDidMount: function() {
		this.loadHostsFromServer();
	},
	render: function() {
		return (
			<div className="hostBox">
				<HostList data={this.state.data} />
			</div>
		);
	}
});
