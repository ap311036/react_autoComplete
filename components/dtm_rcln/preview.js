import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../core/core.scss';
import DtmRcln from './components/Module.js';
import IcRcln from '../ic_rcln';
import IntRctg from '../int_rctg';
import IntRcln from '../int_rcln';
import { fetchJsToObj } from './utils';

// 模組使用注意事項:
// 整理資料的邏輯已從模組內拉出至模組父層,請務必確保傳給模組的lineOrder及levelKey這兩個props是正確的
// 必須傳positionDOM這個props給模組做定位,格式為真實DOM物件

class Demo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            selectedData: [],
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.cleanData = this.cleanData.bind(this);
        this.isMouseDown = false;
        this.sourceData = null;
        this.dom = null;
        // this.loadData('./json/TRS1NEW.js');
    }
    // loadData (source) { // 載入資料,使用fetch

    //     fetchJsToObj(source, (data) => {
    //         this.sourceData = data;
    //         this.arrangeData(['vLine', 'vLinetravel', 'vLinewebarea'], ['_6', '_5', '_7', '_3', '_1', '_4', '_2']);
    //     });

    // }
    // arrangeData (levelKey, lineArray) {
    //     const sourceData = this.sourceData;
    //     let allData = [];

    //     // 先定義出想disabled的資料陣列並在loopData function內使用
    //     const disableData = ['_93', '_P4', 'A5', '_63'];

    //     function loopData (nowKey, levelNum = 0, parentKey = []) {
    //         // 初次loop設定levelNum層級為0,parentKey為空陣列
    //         // 如果parentKey為空陣列代表sourceData[levelKey[levelNum]]是頂層物件,不需要再多一層[]

    //         let dataObj = {
    //             parent: parentKey,
    //             txt: (parentKey.length === 0) ? sourceData[levelKey[levelNum]][nowKey] : sourceData[levelKey[levelNum]][parentKey[parentKey.length - 1]][nowKey],
    //             disable: (disableData.indexOf(nowKey) !== -1) ? true : false
    //         };

    //         // 每筆資料都遍歷全部levelkey,parentKey沒有定義值就表示此選項是此區域的不限選項
    //         for (let i = 0, key; key = levelKey[i]; i++) {
    //             dataObj[key] = (parentKey[i] === undefined) ? '_' : parentKey[i];
    //             if (i === levelNum) dataObj[key] = nowKey;
    //         }

    //         allData.push(dataObj);

    //         if (levelNum < levelKey.length - 1) {
    //             levelNum++;

    //             for (let nowkey in sourceData[levelKey[levelNum]][nowKey]) {

    //                 if (nowkey === '_') {
    //                     continue;
    //                 } else {
    //                     let parent = [...parentKey];
    //                     parent.push(nowKey);
    //                     loopData(nowkey, levelNum, parent);
    //                 }

    //             }
    //         }
    //     }

    //     for (let i = 0, item; item = lineArray[i]; i++) {
    //         loopData(item);
    //     }

    //     this.setState({ allData });
    // }
    openMenu () {
        this.setState({ open: true });
    }
    closeMenu () {
        if (this.isMouseDown) return;
        this.setState({ open: false });
    }
    handleMouseDown () {
        this.isMouseDown = true;
    }
    handleMouseUp () {
        this.isMouseDown = false;
    }
    cleanData () {
        this.setState({ selectedData: [] });
    }
    render () {
        const showValue = this.state.selectedData.map((v, i) => v.txt);
        const style = {
            'position': 'absolute',
            'top': '6px',
            'right': '3px',
            'fontSize': '20px',
            'cursor': 'pointer',
            'zIndex': '10',
            'color': '#999',
        };
        return (
            <div style={{ 'position': 'relative' }}
                ref={e => { this.dom = e }}
            >
                {/*<IntRctg
                    onFocus={this.openMenu}
                    onBlur={this.closeMenu}
                    placeholder="請輸入/選擇目的地"
                    label="目的地"
                    max={5}
                    defaultValue={showValue}
                    whenRemove={i => {
                        let selectedData = [...this.state.selectedData];
                        selectedData.splice(i, 1);
                        this.setState({ selectedData });
                    }}
                />*/}
                <IntRcln
                    placeholder="請輸入/選擇目的地" 
                    label="我是標題" breakline request
                    onFocus={this.openMenu}
                    onBlur={this.closeMenu}
                    value={showValue}
                    color="blue"
                />
                <DtmRcln
                    onBlur={this.closeMenu}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    open={this.state.open}
                    onChange={data => { this.setState({
                        selectedData: data
                    });
                    }}
                    whenClose={() => {
                        this.setState({
                            open: false
                        });
                    }}
                    fetchPath="../json/TRS1NEW.js"
                    selectedData={this.state.selectedData}
                    max={1}
                    label="最多可選擇5個目的地"
                    lineOrder={['_6', '_5', '_7', '_3', '_1', '_4', '_2']}
                    levelKey={['vLine', 'vLinetravel', 'vLinewebarea']}
                    disabledData={['_93', '_P4', 'A5', '_63']}
                    positionDOM={this.dom}
                    Icon={{ 'tab': <IcRcln name="toolmap" />, 'sec': <IcRcln name="productreferf" /> }}
                />
                <span style={style} onClick={this.cleanData}>
                    <IcRcln code="" fontclass="toolcancelsf" />
                </span>
            </div>
        );
    }
}

class Demo2 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            selectedData: [],
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.sourceData = null;
        this.dom = null;
    }
    openMenu () {
        this.setState({ open: true });
    }
    closeMenu () {
        if (this.isMouseDown) return;
        this.setState({ open: false });
    }
    handleMouseDown () {
        this.isMouseDown = true;
    }
    handleMouseUp () {
        this.isMouseDown = false;
    }
    render () {
        const showValue = this.state.selectedData.map((v, i) => v.txt);
        return (
            <div className="dtm_rcln_wrap"
                ref={e => { this.dom = e }}
            >
                <IntRctg
                    onFocus={this.openMenu}
                    onBlur={this.closeMenu}
                    placeholder="請輸入/選擇目的地"
                    defaultValue={showValue}
                    whenRemove={i => {
                        let selectedData = [...this.state.selectedData];
                        selectedData.splice(i, 1);
                        this.setState({ selectedData });
                    }}
                />
                <DtmRcln
                    onBlur={this.closeMenu}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    open={this.state.open}
                    onChange={data => { this.setState({
                        selectedData: data
                    });
                    }}
                    whenClose={() => {
                        this.setState({
                            open: false
                        });
                    }}
                    sourceData={this.sourceData}
                    allData={this.state.allData}
                    selectedData={this.state.selectedData}
                    label="最多可選擇5個目的地"
                    lineOrder={['_9']}
                    levelKey={['vLine', 'vLinetravel', 'vLinewebarea']}
                    fetchPath="../json/TRS1NEWDOM.js"
                    positionDOM={this.dom}
                    noTabItem
                    noTab
                    inline
                    customSourceData={(data)=>{
                        let newData = data;
                        newData.vLine = {
                            '_9': '台灣'
                        };
                        return newData;
                    }}
                />
            </div>
        );
    }
}

class Demo3 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            selectedData: [],
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.dom = null;
    }
    openMenu () {
        this.setState({ open: true });
    }
    closeMenu (e) {
        if (this.isMouseDown) return;
        this.setState({ open: false });
    }
    handleMouseDown () {
        this.isMouseDown = true;
    }
    handleMouseUp () {
        this.isMouseDown = false;
    }
    render () {
        const showValue = this.state.selectedData.map((v, i) => v.txt);

        return (
            <div className="dtm_rcln_wrap"
                ref={e => { this.dom = e }}
            >
                {/*<IntRctg
                    onFocus={this.openMenu}
                    onBlur={this.closeMenu}
                    placeholder="請輸入/選擇目的地"
                    defaultValue={showValue}
                    whenRemove={i => {
                        let selectedData = [...this.state.selectedData];
                        selectedData.splice(i, 1);
                        this.setState({ selectedData });
                    }}
                />*/}
                <IntRcln
                    placeholder="請輸入/選擇目的地" 
                    label="我是標題" breakline request
                    onFocus={this.openMenu}
                    onBlur={this.closeMenu}
                    value={showValue}
                    color="blue"
                />
                <DtmRcln
                    onBlur={this.closeMenu}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    open={this.state.open}
                    onChange={data => {
                        this.setState({
                            selectedData: data
                        });
                    }}
                    max={1}
                    selectedData={this.state.selectedData}
                    label="更多目的地，請輸入關鍵字"
                    lineOrder={['out', 'in']}
                    levelKey={['vAbord', 'vLine', 'vCountry', 'vCity']}
                    showOrder1={['_6', '_5', '_7', '_3', '_1', '_4', '_2']}
                    showOrder2={['_TPE_KLU', '_TAO_HCU_MLI', '_TCH_CHA_NTO', '_YLI_CYI_TNN', '_KHH_PIN', '_YLN_HLN_TTT']}
                    disabledData={['_NYC_US', '_SFO_US']}
                    positionDOM={this.dom}
                    removeStringOnMenu="\(.+"
                    noTabItem
                    secItemReadOnly
                    isMobile
                    fetchPath="../json/hotelCustomMenu.json"
                    customSourceData={(data) => {
                        let newData = data;
                        newData['vAbord'] = {
                            'out': '國外',
                            'in': '台灣'
                        };
                        newData.vLine = {
                            'out': {
                                '_1': '美洲',
                                '_2': '大洋洲',
                                '_3': '歐洲',
                                '_4': '亞非',
                                '_5': '大陸港澳',
                                '_6': '東北亞',
                                '_7': '東南亞',
                            },
                            'in': {
                                '_TPE_KLU': '北北基',
                                '_TAO_HCU_MLI': '桃竹苗',
                                '_TCH_CHA_NTO': '中彰投',
                                '_YLI_CYI_TNN': '雲嘉南',
                                '_KHH_PIN': '高屏',
                                '_YLN_HLN_TTT': '宜花東離島'
                            }
                        };
                        return newData;
                    }}
                />
            </div>
        );
    }
}

class Demo4 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            selectedData: [],
            allData: [],
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.sourceData = null;
        this.dom = null;
        this.loadData('./json/flightsFloorDepartureCsutomMenu.js');
    }
    loadData (source) { // 載入資料,使用fetch

        fetch(source, {
            method: 'GET',
        }).then(response => {
            // 把response轉成字串
            return response.text();
        }).then(data => {
            // 處理拿到的字串轉成物件,並把物件丟到this.sourceData屬性
            let newVariable = data.replace(/var\s(\w+)\s=/g, '"$1":').replace(/;/g, ',').replace(/,$/g, '');
            this.sourceData = JSON.parse('{' + newVariable + '}');

            // 整理資料,請提供階層陣列及欲顯示的tab順序給此function
            // 此function會把資料整理並setState({allData})
            this.arrangeData(['line', 'city'], ['_9', '_5', '_6', '_7', '_3', '_1', '_2']);
        });
    }
    arrangeData (levelKey, lineArray) {
        const sourceData = this.sourceData;
        let allData = [];

        function loopData (nowKey, levelNum = 0, parentKey = []) {
            // 初次loop設定levelNum層級為0,parentKey為空陣列
            // 如果parentKey為空陣列代表sourceData[levelKey[levelNum]]是頂層物件,不需要再多一層[]
            let dataObj = {
                parent: parentKey,
                txt: (parentKey.length === 0) ? sourceData[levelKey[levelNum]][nowKey] : sourceData[levelKey[levelNum]][parentKey[parentKey.length - 1]][nowKey]
            };

            // 每筆資料都遍歷全部levelkey,parentKey沒有定義值就表示此選項是此區域的不限選項
            for (let i = 0; i < levelKey.length; i++) {
                dataObj[levelKey[i]] = (parentKey[i] === undefined) ? '_' : parentKey[i];
                if (i === levelNum) dataObj[levelKey[i]] = nowKey;
            }

            allData.push(dataObj);

            if (levelNum < levelKey.length - 1) {
                levelNum++;

                for (let nowkey in sourceData[levelKey[levelNum]][nowKey]) {

                    if (nowkey === '_') {

                    } else {
                        let parent = [...parentKey];
                        parent.push(nowKey);
                        loopData(nowkey, levelNum, parent);
                    }

                }
            }
        }

        for (let i = 0; i < lineArray.length; i++) {
            loopData(lineArray[i]);
        }

        this.setState({ allData });
    }
    openMenu () {
        this.setState({ open: true });
    }
    closeMenu () {
        if (this.isMouseDown) return;
        this.setState({ open: false });
    }
    handleMouseDown () {
        this.isMouseDown = true;
    }
    handleMouseUp () {
        this.isMouseDown = false;
    }
    render () {
        const showValue = this.state.selectedData.map((v, i) => v.txt);
        return (
            <div className="dtm_rcln_wrap"
                ref={e => { this.dom = e }}
            >
                <IntRctg
                    onFocus={this.openMenu}
                    onBlur={this.closeMenu}
                    placeholder="請輸入/選擇目的地"
                    defaultValue={showValue}
                    whenRemove={i => {
                        let selectedData = [...this.state.selectedData];
                        selectedData.splice(i, 1);
                        this.setState({ selectedData });
                    }}
                />
                <DtmRcln
                    onBlur={this.closeMenu}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    open={this.state.open}
                    onChange={data => { this.setState({
                        selectedData: data
                    });
                    }}
                    whenClose={() => {
                        this.setState({
                            open: false
                        });
                    }}
                    sourceData={this.sourceData}
                    allData={this.state.allData}
                    selectedData={this.state.selectedData}
                    label="最多可選擇3個目的地"
                    lineOrder={['_9', '_5', '_6', '_7', '_3', '_1', '_2']}
                    levelKey={['line', 'city']}
                    positionDOM={this.dom}
                    removeStringOnMenu=".+__|-\w+.+"
                    noTabItem
                />
            </div>
        );
    }
}



ReactDOM.render(
    <div>
        <h3>國外團體目的地</h3>
        <p>max: 可限制最多選擇幾筆資料</p>
        <p>onChange: 傳入callback,預設帶入已選取的資料為參數</p>
        <p>Icon: 傳自訂icon(參數格式為物件)</p>
        <Demo />
        <h3>國內團體目的地</h3>
        <p>noTabItem: 不要有tab層的不限選項</p>
        <p>noTab: 不繪製tabs</p>
        <p>inline: 在sec-wrap層加inline</p>
        <Demo2 />
        <h3>國外訂房目的地</h3>
        <p>removeStringOnMenu: 傳入正規表達式修改最後一層選單字元</p>
        <p>secItemReadOnly: 第二層按鈕唯讀</p>
        <p>isMobile: 是否M版選單</p>
        <Demo3 />
        <div style={{ 'zIndex': 999, 'position': 'relative' }}>我的zindex:999</div>
    </div>,
    document.getElementById('root')
);