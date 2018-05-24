import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StRnls from './index.js';
import '../core/core.scss';

// 可自訂模組 click時彈出視窗
const CustomComponent = (props) => {
    return (
        <div>
            <h2>click Me!</h2>
            <span>
                {
                    props.textContent
                }
            </span>
        </div>
    );
};

// 彈出視窗的自訂模組
const ContentComponent = (props) => {
    return (
        [
            <h1 key="h1">請輸入一些東西</h1>,
            <input key="input" type="text" onChange={e => { props.changeWord(e.target.value) }} />
        ]
    );
};

const ContentComponent2 = () => (
    [<h2 key="h2">Hello World</h2>]
);


class Demo extends Component {

    state = {
        text: '一開始的字'
    };

    changeWord = word => {
        this.setState({
            text: word
        });
    }

    render () {
        return (
            <div>
                <h2>Style:default</h2>
                <StRnls
                    CustomComponent={<CustomComponent textContent="這裡是沒有append再body的範例" />}
                    ContentComponent={<ContentComponent2 />}
                    moduleClassName="StRnls1"
                    whenOpen={e => console.log('Demo Panel Open')}
                    whenClose={e => console.log('Demo Panel Close')}
                />

                <p>==================================</p>
                <h2>append內容再Body層</h2>
                <StRnls
                    CustomComponent={<CustomComponent textContent={this.state.text} />}
                    ContentComponent={<ContentComponent changeWord={this.changeWord}/>}
                    moduleClassName="StRnls1"
                    appendToBody
                    width="300px"
                    whenOpen={e => console.log('Demo Panel Open')}
                    whenClose={e => console.log('Demo Panel Close')}
                    innerComponentClass={['outClass']}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Demo />,
    document.getElementById('root')
);
