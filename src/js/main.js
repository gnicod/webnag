import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import Webnag from './components/webnag'
import Host from './components/host'
import HostList from './components/hostlist'
import HostBox from './components/hostbox'
import HostGroup from './components/hostgroup'

/*
 * PAGE
 */
var HostPage = React.createClass({
    render: function () {
        return (
            <HostBox url="/api/hosts" data={{"hosts" : []}}/>
        );
    }
});

var NotFoundPage = React.createClass({
    render: function () {
        return (
            <div>
                <div> not found </div>
                <Link to={'/hosts'}>hosts</Link>
            </div>
        );
    }
});

function init(){
    ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="hosts" component={HostPage}/>
            <Route path="/host/:hostname" component={Host}/>
            <Route path="/hostgroup/:hostgroupname" component={HostGroup}/>
            <Route path="*" component={NotFoundPage}/>
        </Router>
    ), document.getElementById('app'))
}

// This would usually wait for the ready/DOMContentLoaded
// event, but we're loading this async, and it's up last
init();
