import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PpRcln from './index.js';

import IcRcln from '../ic_rcln/components/Module';

import '../core/core.scss';

// 可自訂模組 click時彈出視窗
const CustomComponent = (props) => {
    return (
        <div>
            <IcRcln
                name="toolif"
                size="x2"
            />
        </div>
    );
};

const CustomComponent1 = (props) => {
    return (
        <div>
            <input type="text"/>
        </div>
    );
};


// 彈出視窗的自訂模組
const ContentComponent = (props) => {
    return (
        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, esse id vel sed tenetur sit eius molestias deserunt vero laudantium dolores, accusamus, provident perferendis quam. Praesentium fugiat exercitationem libero deserunt.
        </p>
    );
};



const Demo = () => {
    // 明天用 css class transform 與 js styles 物件透過 props 函式計算position位置
    return (
        <div>
            <h1 style={{ marginBottom: 30 }}>Style:Click Mode</h1>
            <h3>top</h3>
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['top', 'horizon_left']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['top', 'horizon_center']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['top', 'horizon_right']}
            />
            <h3>bottom</h3>
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['bottom', 'horizon_left']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['bottom', 'horizon_center']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['bottom', 'horizon_right']}
            />
            <h3>left</h3>
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['left', 'vertical_top']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['left', 'vertical_center']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['left', 'vertical_bottom']}
            />

            <h3>right</h3>
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['right', 'vertical_top']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['right', 'vertical_center']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln1 m-r-xxl"
                events={['click']}
                position={['right', 'vertical_bottom']}
            />

            <h1 style={{ marginBottom: 30 }}>Style:Hover Mode</h1>
            <h3>bottom</h3>
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln2 m-r-xxl"
                events={['hover']}
                position={['bottom', 'horizon_left']}
            />
            <h1 style={{ marginBottom: 30 }}>Style:Click & Hover Mode</h1>
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln2 m-r-xxl"
                events={['click', 'hover']}
                position={['top', 'horizon_left']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln2 m-r-xxl"
                events={['click', 'hover']}
                position={['bottom', 'horizon_center']}
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln2 m-r-xxl"
                events={['click', 'hover']}
                position={['left', 'vertical_top']}
                horizontalOffset='0'
                verticalOffset='-3px'
            />
            <PpRcln
                CustomComponent={<CustomComponent />}
                ContentComponent={<ContentComponent />}
                moduleClassName="PpRcln2 m-r-xxl"
                events={['click', 'hover']}
                position={['right', 'vertical_center']}
                horizontalOffset = '0'
                verticalOffset = '0'
            />

           
        </div>
    );
};
/*
    position: ['top|bottom','horizon_left|horizon_center|horizon_right'] or
    position: ['left|right','vertical_top|vertical_center|vertical_bottom']
*/
ReactDOM.render(
    <Demo />,
    document.getElementById('root')
);
