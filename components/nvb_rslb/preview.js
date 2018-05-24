import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NvbRslb from './index.js';
import '../core/core.scss';

// 顯示的自訂內容
const ContentComponent = (props) => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

class Demo extends Component {
    state = {
        visible: false
    };
    render () {
        return (
            <div>
                <h2>Style:default append內容至Body層</h2>
                <NvbRslb
                    visible={this.state.visible}
                    ContentComponent={<ContentComponent />}
                    className=""
                    direction={['right']}
                    width="100%"
                />
            </div>
        );
    }
}
ReactDOM.render(
    <Demo />,
    document.getElementById('root')
);
