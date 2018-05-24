import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ActRacp from './index.js';
import SearchInput from './components/SearchInput';
import IcRcln from '../ic_rcln/components/Module';
// import Source from './source';
import '../core/core.scss';

// const data = [...Source];
// data.forEach((item) => {
//     item.level1 = item.line;
//     item.level2 = item.country;
//     item.level3 = item.city;
//     item.level4 = item.cityzone;
//     item.txt = item.merged;
//     delete item.line;
//     delete item.country;
//     delete item.city;
//     delete item.cityzone;
//     delete item.merged;
// });

// let data;

// fetch('./source3.json').then(res => {
//     return res.json();
// }).then(d => {
//     data = JSON.parse(JSON.stringify(d)).array;
//     data.forEach((item) => {
//         item.level1 = item.line;
//         item.level2 = item.country;
//         item.level3 = item.city;
//         item.level4 = item.cityzone;
//         item.txt = item.merged;
//         delete item.line;
//         delete item.country;
//         delete item.city;
//         delete item.cityzone;
//         delete item.merged;
//     });
//     console.log(data);
// });

class Preview extends Component {
    constructor (props) {
        super(props);
        this.state = {
            statename: 'state',
            placeholderText: 'placeholderText here',
            keyword: '',
            selectVal: null,
            isFocus: false,
            showAct: false,
            value: 0,
            obj: null
        };
        this.searchHandler = this.searchHandler.bind(this);
        this.clearWord = this.clearWord.bind(this);
        this.isFocus = this.isFocus.bind(this);
        this.closeBtnClickHandleCallback = this.closeBtnClickHandleCallback.bind(this);
    }
    // componentWillMount () {
    //     console.log('componentWillMount(render前)');
    // }
    componentDidMount () {
        // console.log('componentDidMount(當元件被寫入DOM 之後)');
    }
    // componentWillReceiveProps (object) {
    //     console.log('componentWillReceiveProps(已掛載的元件收到新的 props 時被觸發)');
    // }
    shouldComponentUpdate (nextProps, nextState) {
        if (this.state === nextState) {
            return false;
        }
        return true;
    }
    // componentWillUpdate () {
    //     console.log('componentWillUpdate(被觸發準備更新)');
    // }
    componentDidUpdate () {
        console.log('componentDidUpdate(已經更新)');
        // console.log(this.state.value);
    }
    // componentWillUnmount () {
    //     console.log('componentWillUnmount');
    // }
    searchHandler (txt) {
        // 輸入大於兩個字才能搜尋
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            self.setState({ keyword: '' });
            (txt.length >= 2 || txt.length === 0) && self.setState({ keyword: txt, selectVal: txt });
        }, 500);
    }
    receive (i) {
        this.setState({ selectVal: i.txt ,obj: i });
        console.log('主頁面接收到', i);
    }
    clearWord (text) {
        this.setState({ selectVal: text });
    }
    isFocus (flag) {
        this.setState({ isFocus: flag });
        if (flag) { this.setState({ showAct: true }) }
    }
    closeBtnClickHandleCallback (e) {
        if (this._actref && !this._actref.contains(e.target) && !this.state.isFocus) {
            console.log('點在act外面');
            this.setState({ showAct: false });
        }
    }
    searchMore () {
        console.log('searchMore CallbackClick');
        window.open('https://uwww.liontravel.com/', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=250,left=500,width=400,height=400');
    }
    showText () {
        this.state.showText ? this.setState({ showText: '' }) : this.setState({ showText: '請先輸入上方目的地條件' });
    }
    render () {
        console.log(this.state.showAct);
        const bt_style = {
            display: 'block',
            margin: '10px 0px'
        };
        const containerStyle = {
            border: '10px solid',
            padding: '50px'
        };
        return (
            <div style={containerStyle}>
                <h1>Demo</h1>
                目前使用訂房的資料
                <button onClick={() => this.showText()} style={bt_style}>切換LIST模式</button>
                <SearchInput
                    className={''}
                    style={null}
                    placeholderText={this.state.placeholderText}
                    onItemSearch={this.searchHandler} //
                    keyWord={this.state.selectVal} // 傳出input輸入的字串
                    clearWord={this.clearWord} // 清除所有文字的callbackFn
                    isFocus={this.isFocus}> {/* 當input被focus時告訴preview */}
                </SearchInput>
                <ActRacp
                    url={'../source2.json'}
                    minimumStringQueryLength={2} // 最少輸入幾個字
                    minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                    setRef={actRef => this._actref = actRef} // 用來監聽點擊對象
                    ClassName={(!this.state.showAct && 'd-no')} // 傳入custom class
                    searchKeyWord={this.state.keyword} // 傳入篩選的字串
                    showText={this.state.showText} // 顯示預設文字
                    whenItemSelect={this.receive.bind(this)} // 模組回傳被選取的物件資料
                    InputIsFocus={this.state.isFocus} // 告訴act 上面的input是否被focus
                    noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                    footer={true}  // 是否顯示footer
                    closeActcallback={() => this.setState({ showAct: false })} // 強勢關閉act callbackFn
                    closeBtnClickHandleCallback={this.closeBtnClickHandleCallback} // 點擊關閉視窗icon callbackFn
                    searchMore={this.searchMore} // 搜尋更多"xxx"的產品 callback
                    jsonKey={'destinations'}
                    setSelectValue={this.state.obj ? this.state.obj.dataIndex : ''}
                    changeKey={(data) => {
                        data.forEach((item) => {
                            item.level1 = item.Kind;
                            item.level2 = item.KindName;
                            item.level3 = item.Code;
                            item.txt = item.Name;
                            delete item.Kind;
                            delete item.KindName;
                            delete item.Code;
                            delete item.Name;
                        });
                        return data;
                    }}
                    catalogue={[{
                        catalogueName: '城市',
                        catafilter: (data) => {
                            return data.filter(item => {
                                return (item.level2 === '城市');
                            }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
                        },
                        icon: (<IcRcln name="toolmapf" />)
                    },
                    {
                        catalogueName: '區域',
                        catafilter: (data) => {
                            return data.filter(item => {
                                return (item.level2 === '區域');
                            }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
                        },
                        icon: (<IcRcln name="toolmapf" />)
                    },
                    {
                        catalogueName: '行政區',
                        catafilter: (data) => {
                            return data.filter(item => {
                                return (item.level2 === '行政區');
                            }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
                        },
                        icon: (<IcRcln name="productreferf" />)
                    },
                    {
                        catalogueName: '飯店',
                        catafilter: (data) => {
                            return data.filter(item => {
                                return (item.level2 === '飯店');
                            }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
                        },
                        icon: (<IcRcln name="toolmapf" />)
                    }
                    ]}
                >
                </ActRacp>
            </div>
        );
    }
}

ReactDOM.render(
    <Preview />,
    document.getElementById('root')
);