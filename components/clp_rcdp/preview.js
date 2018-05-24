import React from 'react';
import ReactDOM from 'react-dom';
import ClpRcdp from './index.js';
import '../core/core.scss';

// 彈出視窗的自訂模組
const ContentComponent = (props) => {

    return (
        <div>
            <h1>Content Component 1 將自訂組件放這</h1>
        </div>
    );
};

const ContentComponent2 = (props) => {

    return (
        <div>
            <h1>Content Component 2 將自訂組件放這</h1>
        </div>
    );
};

const ContentComponent3 = (props) => {

    return (
        <div>
            <h1>Content Component 3 將自訂組件放這</h1>
        </div>
    );
};

const Demo = () => {

    function whenOpen (isOpen) {
        console.log('內容打開', isOpen);
    }

    function whenClose (isOpen) {
        console.log('內容關閉', isOpen);
    }

    return (
        <div>
            <h1 style={{ marginBottom: 30 }} draggable>Style:default</h1>
            <ClpRcdp
                titleText="轉機次數1"
                ContentComponent={<ContentComponent />}
                moduleClassName="className1"
            />

            <ClpRcdp
                titleText="轉機次數2"
                ContentComponent={<ContentComponent2 />}
                underLine
                moduleClassName="className2"
                color="blue"
            />

            <ClpRcdp
                titleText="轉機次數3"
                ContentComponent={<ContentComponent3 />}
                underLine
                moduleClassName="className3"
                color="#e10500"
                whenOpen={whenOpen}
                whenClose={whenClose}
            />
        </div>
    );
};

ReactDOM.render(
    <Demo />,
    document.getElementById('root')
);
