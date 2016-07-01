import React from 'react';
import ReactDOM from 'react-dom';
import Webnag from './components/webnag'
import Host from './components/host'
import HostList from './components/hostlist'
import HostBox from './components/hostbox'

function init () {
  let app = document.querySelectorAll('[data-section="app"]')[0];
  ReactDOM.render(
    <HostBox url="/api/hosts" pollInterval={2000}  data={{"hosts" : []}}/>,
    app
  );
}

// This would usually wait for the ready/DOMContentLoaded
// event, but we're loading this async, and it's up last
init();
