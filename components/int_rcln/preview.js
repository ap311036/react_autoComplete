import React from 'react';
import ReactDOM from 'react-dom';
import IntRcln from './components/Module.js';
import '../core/core.scss';
import IcRcln from '../ic_rcln';

let changeCallBack = (e, data) => {
    console.log('changeCallBack', data);
};

let blurCallBack = (e, data) => {
    console.log('blur!!', data);
};

class Test extends React.Component {
    state = {
        count: 1
    }
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        });
    }
    handleClick2 = () => {
        this.setState({
            count: this.state.count - 1
        });
    }
    render () {
        return (
            <div>
                <button onClick={this.handleClick}>外部增加</button>
                <IntRcln placeholder="text some.." className="custom"
                    value={'loooooooooooooooooongloooooooooooooooooongloooooooooooooooooongloooooooooooooooooong'}
                    readOnly
                    color="blue"
                    onBlur={(e, data) => { console.log('e', e.type) }}
                    onChange={(e, data) => { console.log('e', e.type) }}
                    onClick={() => { console.log('on click!') }}
                    label="very loooooooooooooooooong label"
                    breakline
                    icon={<IcRcln name="tooldate" />}
                />
                <button onClick={this.handleClick2}>外部減少</button>
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <h2>defaultValue</h2>
        <Test />
        <h2>disabled</h2>
        <IntRcln placeholder="text some.." disabled />
        <h2>color: error, success, blue</h2>
        <IntRcln placeholder="text some.." color="error" />
        <br />
        <IntRcln placeholder="text some.." color="success"
            onKeyDown={(a, b) => {
                // console.log('keydown', a, b);
            }}
            onKeyPress={(a, b) => {
                // console.log('keypress', a, b);
            }}
            onKeyUp={(a, b) => {
                // console.log('keyup', a, b);
            }}
            onChange={(e, data)=>{
                console.log('onChange', e, data);
            }}
            onCompositionStart={(a, b) => {
                console.log('onCompositionStart', a.target, a.type, b);
            }}
            onCompositionUpdate={(a, b) => {
                console.log('onCompositionUpdate', a.target, a.type, b);
            }}
            onCompositionEnd={(a, b) => {
                console.log('onCompositionEnd', a.target, a.type, b);
            }}
        />
        <br />
        <IntRcln placeholder="text some.." color="blue" />
        <h2>onChange, onBlur(event: SyntheticEvent, data: value)</h2>
        <IntRcln placeholder="text some.." onChange={changeCallBack} onBlur={blurCallBack} />
        <h2>label</h2>
        <IntRcln placeholder="text some.." label="very loooooooooooooooooong label" />
        <br />
        <IntRcln placeholder="text some.." label="short label" />
        <h2>breakline</h2>
        <IntRcln placeholder="text some.." label="我是標題" breakline />
        <h2>icon</h2>
        <IntRcln placeholder="text some.." label="我是標題" icon={<IcRcln name="tooldate" />} />
        <h2>icon without label</h2>
        <IntRcln placeholder="text some.." icon={<IcRcln name="tooldate" />} />
        <h2>readOnly</h2>
        <IntRcln placeholder="text some.." defaultValue="測試" readOnly />
        <h2>noBorder</h2>
        <IntRcln placeholder="text some.." noBorder />
        <h2>request</h2>
        <IntRcln request label="我是標題" breakline />
    </div>,
    document.getElementById('root')
);
