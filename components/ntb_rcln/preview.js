import React from 'react';
import ReactDOM from 'react-dom';
import NtbRcln, { Tab } from './components/Module.js';
import IcRcln from '../ic_rcln';
import '../core/core.scss';

// 客製化Label

const Label = (props) => (
    <div>
        <img src="./images/icon.png" alt="" />
        台灣機票
    </div>
);
const Label2 = (props) => (
    <div>
        <IcRcln name="toolchinaf" />
        大陸機票
    </div>
);

ReactDOM.render(
    <div>
        <h2>預設一層</h2>
        <NtbRcln activeTabIndex={1}>
            <Tab label="國際機票">
                <h3>我是國際機票預訂的內容唷</h3>
                <p>國際機票預訂國際機票預訂國際機票預訂國際機票預訂國際機票預訂</p>
            </Tab>
            <Tab label={<Label2 />}>
                <h3>我是大陸國內機票的內容唷</h3>
                <p>第二塊第二塊第二塊第二塊Tab</p>
            </Tab>
            <Tab label={<Label />}>
                <h3>我是台灣國內機票的內容唷</h3>
                <p>第三塊TabTabTabTabTabTabTabTabTabTabTabTabTabTabTabTabTabTab</p>
            </Tab>
        </NtbRcln>

        <h2>嵌套兩層(prop: wrap_ntb_rcln) & Tab新增一個props dot</h2>
        <NtbRcln wrap_ntb_rcln activeTabIndex={1}>
            <Tab label="團  體">
                <NtbRcln activeTabIndex={2}>
                    <Tab label="國際機票預訂">
                        <h1>團體區塊</h1>
                        <h3>我是國際機票預訂的內容唷</h3>
                        <p>國際機票預訂國際機票預訂國際機票預訂國際機票預訂國際機票預訂</p>
                    </Tab>
                    <Tab label={<Label2 />}>
                        <h1>團體區塊</h1>
                        <h3>我是大陸國內機票的內容唷</h3>
                        <p>第二塊第二塊第二塊第二塊Tab</p>
                    </Tab>
                    <Tab label="台灣國內機票">
                        <h1>團體區塊</h1>
                        <h3>我是台灣國內機票的內容唷</h3>
                        <p>第三塊TabTabTabTabTabTabTabTabTabTabTabTabTabTabTabTabTabTab</p>
                    </Tab>
                </NtbRcln>
            </Tab>
            <Tab label="機  票">
                <NtbRcln activeTabIndex={2}>
                    <Tab label="國際機票預訂" dot>
                        <h1>機票區塊</h1>
                        <h3>我是國際機票預訂的內容唷</h3>
                        <p>國際機票預訂國際機票預訂國際機票預訂國際機票預訂國際機票預訂</p>
                    </Tab>
                    <Tab label="大陸國內機票">
                        <h1>機票區塊</h1>
                        <h3>我是大陸國內機票的內容唷</h3>
                        <p>第二塊第二塊第二塊第二塊Tab</p>
                    </Tab>
                    <Tab label="台灣國內機票">
                        <h1>機票區塊</h1>
                        <h3>我是台灣國內機票的內容唷</h3>
                        <p>第三塊TabTabTabTabTabTabTabTabTabTabTabTabTabTabTabTabTabTab</p>
                    </Tab>
                </NtbRcln>
            </Tab>
        </NtbRcln>

        <h2>prop: dtm_rcln_mode (此模式樣式只有PC)</h2>
        <NtbRcln dtm_rcln_mode activeTabIndex={1}>
            <Tab label="東北亞">
                東北亞的內容放這
            </Tab>
            <Tab label="大陸港澳">
                大陸港澳的內容放這
            </Tab>
            <Tab label="東南亞">
                東南亞的內容放這
            </Tab>
            <Tab label="歐洲">
                歐洲的內容放這
            </Tab>
            <Tab label="美洲">
                美洲的內容放這
            </Tab>
        </NtbRcln>

        <h2>嵌套兩層: wrap_dtm_rcln (此模式樣式只有PC)</h2>
        <NtbRcln wrap_dtm_rcln activeTabIndex={1}>
            <Tab label="國外">
                <NtbRcln dtm_rcln_mode activeTabIndex={1}>
                    <Tab label="東北亞">
                東北亞的內容放這
                    </Tab>
                    <Tab label="大陸港澳">
                大陸港澳的內容放這
                    </Tab>
                    <Tab label="東南亞">
                東南亞的內容放這
                    </Tab>
                    <Tab label="歐洲">
                歐洲的內容放這
                    </Tab>
                    <Tab label="美洲">
                美洲的內容放這
                    </Tab>
                </NtbRcln>
            </Tab>
            <Tab label="國內">
                <NtbRcln dtm_rcln_mode activeTabIndex={3}>
                    <Tab label="東北亞2">
                東北亞2的內容放這
                    </Tab>
                    <Tab label="大陸港澳2">
                大陸港澳2的內容放這
                    </Tab>
                    <Tab label="東南亞2">
                東南亞2的內容放這
                    </Tab>
                    <Tab label="歐洲2">
                歐洲2的內容放這
                    </Tab>
                    <Tab label="美洲2">
                美洲2的內容放這
                    </Tab>
                </NtbRcln>
            </Tab>
        </NtbRcln>
        <h2>customClass style:translucentBlue</h2>
        <NtbRcln activeTabIndex={0} customClass="translucentBlue">
            <Tab label="國際機票預訂">
                國際機票預訂內容
            </Tab>
            <Tab label="大陸國內機票">
                大陸國內機票內容
            </Tab>
            <Tab label="台灣國內機票">
                台灣國內機票內容
            </Tab>
        </NtbRcln>

    </div>,
    document.getElementById('root')
);