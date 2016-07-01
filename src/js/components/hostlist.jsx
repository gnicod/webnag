import React from 'react';
import Host from '../components/host'

export default React.createClass({
    render: function() {
        var hostNodes = this.props.data.hosts.map(function(host) {
            return (
                <Host host_name={host.host_name} address={host.address}>
                    {host.host_name}
                </Host>
            );
        });
        return (
            <div className="commentList">
                {hostNodes}
            </div>
        );
    }
});

