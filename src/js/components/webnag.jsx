import React from 'react';

export default React.createClass({
    render: function () {
        return (
            <div>
                Hey! This is just an auto-generated component.
                Now it's up to you to make something great!
            </div>
        );
    }
});

var Host = React.createClass({
    render: function(){
        return (
            <div className="host_name">
                {this.props.host_name}
            </div>
        );
    }
})

var HostList = React.createClass({

    loadHostsFromServer: function(){
        $.ajax({
            url: this.props.url,
            dataType:'json',
            cache:false,
            success: function(data){
                this.setState({data:data});
            }.bind(this),
            error: function(xhr,status,err) {
                console.error(this.props.url, status, err.toString());
            }
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadHostsFromServer();
        setInterval(this.loadHostsFromServer, this.props.pollInterval);
    },
    render: function(){
        var hostNodes = this.props.data.map(function(host) {
            return (
                <Host host_name={host.host_name}>
                </Host>
            );
        });
        return (
            <div className="hostList">
                {hostNodes}
            </div>
        );
    }
})

/*
React.render(
      <HostList url="/api/hosts" pollInterval={2000} />,
        document.getElementById('content')
);
*/
