import React from 'react';
import ReactDOM from 'react-dom';
import CrRcln from './components/Module.js';
import '../core/core.scss';

ReactDOM.render(
    <div className="container">
        <div>
            <h3>Style: checkbox</h3>
            <CrRcln type="checkbox" textContent="inputLabel(default)"></CrRcln>
            <div><CrRcln type="checkbox" textContent="inputLabel(default)"></CrRcln></div>
            <div><CrRcln type="checkbox" disabled textContent="inputLabel(disabled)" ></CrRcln></div>
            <div><CrRcln type="checkbox" name="vehicle" value="Bike" id="chk01" className="org" textContent="inputLabel(org) whenClick checked" whenClick={() => console.log('whenClickCallBack')} /></div>
            <div><CrRcln type="checkbox" name="vehicle" value="Car" id="chk02" className="l-org" textContent="inputLabel(l-org) whenChange" defaultChecked whenChange={() => console.log('whenChangeCallBack')} /></div>
            <div><CrRcln type="checkbox" name="vehicle" value="Plain" id="chk03" className="red" textContent="inputLabel(red) whenMouseDown" whenMouseDown={() => console.log('onMouseDownCallBack')} /></div>
        </div>
    </div>,
    document.getElementById('root')
);