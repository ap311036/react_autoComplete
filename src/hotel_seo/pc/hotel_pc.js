import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';

import {
    IcRcln,
    IntRcln,
    CrRcln,
    DtmRcln,
    BtRcnb,
    ActRajax,
    StRcln,
    IntGpct,
    NvbRslb,
    CyRnmb,
    StRnls,
    PpRcln
} from 'components';
import { toQueryString, getDomPosition } from 'Root/utils';
import { hotelSeoPathConfig } from 'Root/source.config.js';
import '../css.scss';


// 可自訂模組 click時彈出視窗
const CustomComponent = ({ roominfos }: props) => {
    let roomCounts = roominfos.roomCounts;
    let adultCount = roominfos.roomPeopleInfos.reduce((total,current) => {
        total += current.adult;
        return total;
    },0);
    let childrenCount = roominfos.roomPeopleInfos.reduce((total, current) => {
        total += current.children.length;
        return total;
    }, 0);
    return (
        <IntRcln
            placeholder="共N間、N位大人、N位孩童"
            label="間數/人數"
            color="blue"
            noBorder
            request
            icon={<IcRcln name="toolmember" />}
            readOnly
            value={`共${roomCounts}間，${adultCount}位大人，${childrenCount}位小孩`}
        />
    );
};

const roomDataOption = [
    { text: '共1間', value: 1 },
    { text: '共2間', value: 2 },
    { text: '共3間', value: 3 },
    { text: '共4間', value: 4 },
    { text: '共5間', value: 5 },
    { text: '共6間', value: 6 },
    { text: '共7間', value: 7 },
];

const childAgeOption = [
    { text: '0歲', value: 0 },
    { text: '1歲', value: 1 },
    { text: '2歲', value: 2 },
    { text: '3歲', value: 3 },
    { text: '4歲', value: 4 },
    { text: '5歲', value: 5 },
    { text: '6歲', value: 6 },
    { text: '7歲', value: 7 },
    { text: '8歲', value: 8 },
    { text: '9歲', value: 9 },
    { text: '10歲', value: 10 },
    { text: '11歲', value: 11 },
    { text: '12歲', value: 12 },
];

// 彈出視窗的自訂模組
const ContentComponent = ({ roominfos, changeRoomCountsState, changeAdultCount, changeChildrenCount, changeChildrenSingleAge} :props) => {
    return (
        <React.Fragment>
            <div className="st_rnls_room_count">
                <StRcln 
                    ClassName=""
                    placeholder="請選擇" 
                    label="間數:" 
                    option={roomDataOption} 
                    defaultValue={roominfos.roomCounts}
                    onChangeCallBack ={count => {
                        // 再連動setState更改下方
                        changeRoomCountsState(count);
                    }}
                    whenClick={() => console.log('父層whenClick')}
                />
            </div>
            <ul className="st_rnls_room_info_list">
                {
                    roominfos.roomPeopleInfos.map((items,index) => {
                        return (
                            <li
                                key={'st_rnls_room_info_list'+index}
                            >
                                <div className="room_info_list_num">{index+1}</div>
                                <div className="room_info_list_people_count adult">
                                    <label>成人</label>
                                    <IntGpct
                                        max={4}
                                        min={1}
                                        count={1}
                                        btnClassMinus="ic_rcln toolcancelb"
                                        btnClassAdd="ic_rcln tooladdb"
                                        onChange={(prevValue, Val) => {
                                            console.log('成人目前計算數量的值', Val);
                                            changeAdultCount(index, Val);
                                        }}
                                    />
                                </div>
                                <div className="room_info_list_people_count children">
                                    <label>小孩</label>
                                    <IntGpct
                                        max={3}
                                        min={0}
                                        count={0}
                                        btnClassMinus="ic_rcln toolcancelb"
                                        btnClassAdd="ic_rcln tooladdb"
                                        onChange={(prevValue, Val) => {
                                            console.log('小孩目前計算數量的值', Val);
                                            changeChildrenCount(index, Val);
                                        }}
                                    />
                                </div>
                                <ul className="room_info_list_children_age">
                                    {
                                        items.children.map((item,i) => {
                                            return (
                                                <li
                                                    key={'room_info_list_children_age'+i}
                                                >
                                                    <StRcln
                                                        option={childAgeOption}
                                                        ClassName=""
                                                        success
                                                        defaultValue={0}
                                                        dropdownContentClassName={'hotel_pc_dropdown_content'}
                                                        onBlurCallBack={() => {
                                                            console.log('父層onBlurCallBack')
                                                        }}
                                                        onChangeCallBack={(val) => {
                                                            changeChildrenSingleAge(index, i, val);
                                                        }}
                                                    />
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                        );
                    })
                }
                
            </ul>
        </React.Fragment>
    );
};

// 搜尋input模組
const SearchInput = (
    { 
        placeholderText, 
        onItemSearch, 
        clearWord, 
        keyWord, 
        whenKeyPress, 
        isFocus, 
        readOnly ,
        inputDom
    }: SearchInputProps) => {
    let isOnComposition = false
    let searchKeyWord = null
    const isChrome = !!window.chrome && !!window.chrome.webstore

    const handleComposition = (e: KeyboardEvent) => {
        if (e.type === 'compositionend') {
            //composition結束，代表中文輸入完成
            isOnComposition = false
            if (e.target instanceof HTMLInputElement && !isOnComposition && isChrome) {
                //進行搜尋
                onItemSearch(searchKeyWord.value);
            }
            clearWord(searchKeyWord.value)

        } else {
            //composition進行中，代表正在輸入中文
            isOnComposition = true
        }

    }

    return (


        <div className="int_rcln breakline icon request">
            <i className="ic_rcln toolmap" />
            <label className="int_rcln_label">目的地</label>
            <input
                readOnly={readOnly}
                className="int_rcln_input"
                type="text"
                ref={el => { 
                    searchKeyWord = el;
                    inputDom(el);
                }}
                placeholder={placeholderText}
                onCompositionStart={handleComposition}
                onCompositionUpdate={handleComposition}
                onCompositionEnd={handleComposition}
                onChange={(e: KeyboardEvent) => {
                    //只有onComposition===false，才作onChange
                    if (e.target instanceof HTMLInputElement && !isOnComposition) {
                        //進行搜尋
                        onItemSearch(searchKeyWord.value)
                    }
                    clearWord(searchKeyWord.value)
                }
                }
                value={keyWord || ''}
                onFocus={() => isFocus && isFocus(true)}
                onBlur={() => isFocus && isFocus(false)}
            />
        </div>
    )
}


// 補字拼裝模組
class AutoTextModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            // ======== 目的地 ========
            SearchInputDisabled: true,
            // 補字
            data: [],
            isLoading: true,
            destinationTextInputPlaceHolder: '目的地、地標、區域、飯店名稱',
            destinationKeyword: '',
            destinationSelectVal: null,
            destinationObj: [],
            destinationShowAct: false,
            // 快速選單
            selectedData: [],
            isDtmFocus: false
        };
        this.dom = null;
        // 是否還在下方panel
        this.isStillInPanel= false;

        this.fetchData = this.fetchData.bind(this);
        this.AbortController = null;
    }
    componentDidMount () {
        window.addEventListener('keydown',(e) => {
            if (e.key === 'Enter') {
                if (this.state.destinationShowAct === true) {
                    this.searchInputDom !== null && this.searchInputDom.blur();
                    this.setState({
                        destinationShowAct: false
                    });
                }
                
            }
        },true);
    }
    componentDidUpdate() {
        // 只執行一次要完(Loading)完資料input解鎖
        if (this.state.isLoading) {
            setTimeout(() => {
                this.setState({ isLoading: false, SearchInputDisabled: false});
            }, 1500);
        }
    }
    _orderTodayOnClick = () => {
        this.windowOpen();
    }
    filterCheckedToggle = () => {
        this.setState({ filterChecked: !this.state.filterChecked });
    }
    windowOpen(get) {
        let url = `searchParam={"Destionation":{"Code":"${this.state.destinationOldObj.level3}","Kind":"${this.state.destinationOldObj.level1}"},"CheckIn":"${this.state.checkInOldDate}","CheckOut":"${this.state.checkOutOldDate}","Rooms":${JSON.stringify(this.state.roomOldRoomData)},"Filter":{"Allotment":"${this.state.filterChecked ? 0 : 1}"}}`;
        window.open('https://uhotels.liontravel.com/?' + url, '_blank').focus();
    }
    // "目的地分頁"的事件
    //  補字事件 (input觸發事件)
    searchHandler = (value) => {
        console.log(`searchHandler value = ${value}`);
        
        let self = this;

        let isDtmFocus = false;// 快速選單
        let destinationShowAct = false;// 補字
        
        if (value.length >= 2) {
            // input 長度大於2 開啟補字，小於開啟快速選單
            isDtmFocus = false;
            destinationShowAct = true;
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                self.fetchData(value);
            }, 500);
            this.setState({ 
                showText: (
                    <div className="hotel_pc_act_rajx_load_img">
                        <span>載入中...</span>
                    </div>
                ) 
            });
        }
        else {
            isDtmFocus = true;
            destinationShowAct = false;
        }
        this.setState({
            isDtmFocus,
            destinationShowAct
        });
    }
    fetchData(value) {
        // console.log(`fetchData value = ${value}`);
        // inputOnChange直接觸發fetch事件
        // 先清空 state 裡的 data
        // 如果有上一次發出的請求，立即執行取消abort()
        // fetch成功後，將資料回調給processData fn
        // this.setState({ data: [], selectText: value });
        this.AbortController && this.AbortController.abort();
        this.AbortController = new AbortController();
        const signal = this.AbortController.signal;

        let url = new URL('http://10.41.11.220/dashboard/ajax.php');
        let encodedValue = encodeURI(value);
        url.searchParams.append('KeyWord', encodedValue);

        fetch(url, {
            method: 'GET',
            mode: 'cors',
            signal,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }),
        })
        .then(res => res.json())
        .then(d => this.processData(d, value))
        .catch(res => {
            console.error('request has error', res)
            this.setState({
                showText: (<h4>找不到符合資料</h4>)
            });
        });
        
    }
    processData(data, searchKeyWord) {
        console.log('processData');
        console.log('data', data);
        console.log('searchKeyWord', searchKeyWord );
        // Destinations 是 fetch的第一個key name
        let p = new Promise(function (resolve, reject) {
            data.Destinations.map((item) => {
                item.level1 = item.Kind;
                item.level2 = item.KindName;
                item.level3 = item.Code;
                item.txt = item.Name;
                delete item.Kind;
                delete item.KindName;
                delete item.Code;
                delete item.Name;
            });
            resolve(data);
        });
        this.setState({ 
            data: data.Destinations,
            // destinationObj: data.Destinations, 
            showText: '',
            destinationKeyword: searchKeyWord });
        return p;
    }
    clearWord = (text) => {
        this.setState({ destinationSelectVal: text });
    }
    receive = (i) => {
        // destinationKeyword傳入篩選的字串
        // destinationKeyword是影響, destinationSelectVal
        this.setState({ 
            // destinationKeyword: i.txt,
            selected: true,
            destinationSelectVal: i.txt, 
            destinationObj: i 
        });
        // 將change結果回傳給父層
        // change input search value state(選到選單上的資料)
        this.props.setParentsDestinationObj(i, i.txt);
       
        console.log('主頁面接收到', i);
    }
    // showText = () => {
    //     this.state.showText ? this.setState({ showText: '' }) : this.setState({ showText: '請先輸入上方目的地條件' });
    // }

    // 快速選單事件
    dtmRclnHandleMouseDown = () => {
        this.isMouseDown = true;
    }
    dtmRclnHandleMouseUp = () => {
        this.isMouseDown = false;
    }
    dtmRclnOnChange = (data) => {
        console.log(data);
        let obj = {};
        let code = data[0].vCity;
        let kind = data[0].vCountry.split('_')[1];
        switch (kind) {
            case 'PCT': kind = 10; break;
            case 'PCTZ': kind = 18; break;
            case 'PCTP': kind = 80; break;
        }
        code = code.split('_');
        code = code[2] + '_' + code[1];
        obj.level1 = kind;
        obj.level3 = code;
        obj.txt = data[0].txt;
        // 地區選擇完資料
        let destinationSelectVal= data[0] ?data[0].txt : '';
        this.setState({
            selectedData: data, 
            destinationSelectVal, 
            destinationObj: obj,
            isDtmFocus: false,
            selected: true, // 是否有"click"選擇選單項目有就click到的項目存入父層，為了防止user自己打字時搜尋不到卻送出上一次的資料
            // 所以在有選到選單上的資料才送出資料，沒有就清空搜尋物件資料，txt傳遞目前input上的Value(不管有沒有結果)。
        });
        // 將change結果回傳給父層`,change input search value state to record in parents(選到選單上的資料)
        // change input search value state to record in parents(選到選單上的資料)
        this.props.setParentsDestinationObj(obj, destinationSelectVal);
    }
    
    render() {
        const positionDOM = !this.list_container_dom ? null : this.list_container_dom;

        const list_container_dom_styles = {
            'zIndex': 100,
            'left': (positionDOM) ? getDomPosition(positionDOM, 'left') : null,
            'top': (positionDOM) ? getDomPosition(positionDOM, 'top') + getDomPosition(positionDOM, 'height') : null
        };
        return (
            <div className="hotel_container">
                <div>
                    <div className="nvb-body destination_body">
                        <div className="destination_body_nav">
                            <SearchInput
                                readOnly={this.state.SearchInputDisabled}
                                className={''}
                                style={null}
                                inputDom={el => this.searchInputDom = el}
                                placeholderText={this.state.destinationTextInputPlaceHolder}
                                onItemSearch={this.searchHandler} //
                                keyWord={this.state.destinationSelectVal} // 傳出input輸入的字串
                                clearWord={this.clearWord} // 清除所有文字的callbackFn
                                isFocus={isFocus => {
                                    // console.log('isFocus', isFocus);
                                    // console.log('this.state.destinationKeyword', this.state.destinationKeyword);
                                    let isDtmFocus = false;// 快速選單
                                    let destinationShowAct = false;// 補字
                                    
                                    if (isFocus === true) {
                                        if (this.state.destinationKeyword.length >= 2) {
                                            // input 長度大於2 開啟補字，小於開啟快速選單
                                            isDtmFocus = false;
                                            destinationShowAct = true;
                                        }
                                        else {
                                            isDtmFocus = true;
                                            destinationShowAct = false;
                                        }
                                        this.setState({
                                            isDtmFocus,
                                            destinationShowAct
                                        });
                                        
                                    }
                                    if (isFocus === false && this.isStillInPanel === false) {
                                        // onblur
                                        this.setState({
                                            isDtmFocus: false,
                                            destinationShowAct: false
                                        });
                                    }
                                }}
                            /> 
                            {/* 當input被focus時告訴preview */}
                        </div>
                        <div className="destination_body_select">
                            <div 
                                className="list_container"
                                onMouseDown={e => {
                                    this.isStillInPanel = true;
                                }}
                                onMouseUp={e => {
                                    this.isStillInPanel = false;
                                }}
                                onBlur={e => {
                                    if (this.isStillInPanel === false) {
                                        // onblur
                                        this.setState({
                                            isDtmFocus: false,
                                            destinationShowAct: false
                                        });
                                    }
                                    
                                }}
                                ref={el => this.list_container_dom = el}
                            >
                                <ActRajax
                                    style={list_container_dom_styles}
                                    minimumStringQueryLength={2} // 最少輸入幾個字
                                    minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                                    containerClass={['hotel_container_autotext', this.state.destinationShowAct ? '' :'d-no'].join(' ')} // 傳入custom class
                                    data={this.state.data}
                                    matchWord={this.state.destinationKeyword}
                                    closeBtnOnClick = {() => {
                                        this.setState({ destinationShowAct: false});
                                    }}
                                    isFocus={this.state.destinationShowAct}
                                    showText={this.state.showText} // 顯示預設文字
                                    getItemClickValue={this.receive} // 模組回傳被選取的物件資料
                                    whenSpanClick={() => {
                                        // 下拉 item 被 click 收起選單
                                        this.setState({
                                            isDtmFocus: false,
                                            destinationShowAct: false
                                        });
                                    }}
                                    noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                                    footer={false}  // 是否顯示footer
                                    rules={
                                        [
                                            {
                                                title: '城市',
                                                icon: <IcRcln name="toolmapf" key={1} />
                                            },
                                            {
                                                title: '區域',
                                                icon: <IcRcln name="traffictrafficcruiseshipf" key={2} />
                                            },
                                            {
                                                title: '行政區',
                                                icon: <IcRcln name="hotelbusinesscen" key={3} />
                                            },
                                            {
                                                title: '商圈',
                                                icon: <IcRcln name="productpricef" key={4} />
                                            },
                                            {
                                                title: '地標',
                                                icon: <IcRcln name="hotelwify" key={5} />
                                            },
                                            {
                                                title: '飯店',
                                                icon: <IcRcln name="hotelforeignBookingf" key={6} />
                                            }
                                        ]
                                    }
                                />
                                
                                <div className="dtm_rcln_wrap"
                                    ref={e => { this.dom = e }}
                                >
                                    <DtmRcln
                                        onMouseDown={this.dtmRclnHandleMouseDown}
                                        onMouseUp={this.dtmRclnHandleMouseUp}
                                        open={this.state.isDtmFocus}
                                        onChange={this.dtmRclnOnChange}
                                        whenClose={() => {
                                            this.setState({
                                                isDtmFocus: false
                                            });
                                        }}
                                        max={1}
                                        fetchPath={hotelSeoPathConfig.dtm}
                                        selectedData={this.state.selectedData}
                                        lineOrder={['out', 'in']}
                                        // 改洲別順序, 必填, 須注意lineOrder這個props的順序
                                        showOrder1={['_6', '_5', '_7', '_3', '_1', '_4', '_2']} 
                                        // 改地區順序, 必填, 須注意lineOrder這個props的順序                                        
                                        showOrder2={['_TPE_KLU', '_TAO_HCU_MLI', '_TCH_CHA_NTO', '_YLI_CYI_TNN', '_KHH_PIN', '_YLN_HLN_TTT']}
                                        levelKey={['vAbord', 'vLine', 'vCountry', 'vCity']}
                                        positionDOM={this.dom}
                                        removeStringOnMenu="\(.+"
                                        noTabItem
                                        secItemReadOnly
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
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


// 主畫面
class Module extends Component {
    constructor (props) {
        super(props);
        this.state = {
            roominfos: {
                roomCounts: 1,
                roomPeopleInfos: [
                    {
                        adult: 1,
                        children: []
                    }
                ]
            },
            // ======== Excel 制定規格 ========
            filterChecked: false,
            
        };
        this.destinationObj={ level1: '', level3: '' ,txt:''}
        this.destinationSelectVal = '';// 目的地input value
        this.propsGetCalendarInfo = null;
        this.calendarDateInfo = {
            // startDate: '2018/05/01',
            // backDate: '2018/05/20',
            startDate: '',
            backDate: '',
        }
    }
    

    // 用數字增減array
    produceCountArr(count, pruduceArr, roomPeopleInfoObjTemplate) {
        // 需求長度大於目前就增加array數，若沒有就刪除
        if (count > pruduceArr.length) {
            for (let i = pruduceArr.length; i < count; i++) {
                pruduceArr.push(roomPeopleInfoObjTemplate);
            }
        } else {
            pruduceArr.length = count;
        }
        return pruduceArr;
    }

    // 搜尋送出開新視窗ㄨㄠ
    windowOpen (get) {
        let roomInfos = this.state.roominfos.roomPeopleInfos;
        let roomGetDataArr = roomInfos.map((items,index) => {
            return {
                AdultQty: items.adult,
                ChildQty: items.children.length,
                ChildAges: items.children
            };
        });
        
        // 若沒有click地區資料沒有的話，
        let destinationObjTxt = (this.destinationObj.txt === '' || this.destinationObj.txt === undefined) ? this.destinationSelectVal : this.destinationObj.txt;
        let url = `searchParam={
            "Destination":{
                "Code":"${this.destinationObj.level3}",
                "Kind":"${this.destinationObj.level1}",
                "Txt":"${destinationObjTxt}"
            },
            "CheckIn":"${this.calendarDateInfo.startDate}",
            "CheckOut":"${this.calendarDateInfo.backDate}",
            "Rooms":${JSON.stringify(roomGetDataArr)},
            "Filter":{"Allotment":"${this.state.filterChecked ? 0 : 1}"}
        }`;
        url = url.replace(/[\n\s]*/g,'');
        // console.log('url', url);
        let hasDestinationObjTxt = destinationObjTxt!=='';
        let hasRoomGetDataArr = roomGetDataArr.length > 0;
        let hasDate = this.calendarDateInfo.startDate !== '' && this.calendarDateInfo.backDate !== '';
        console.log('hasDestinationObjTxt', hasDestinationObjTxt);
        console.log('hasRoomGetDataArr', hasRoomGetDataArr);
        console.log('hasDate', hasDate);
        
        if (hasDestinationObjTxt && hasRoomGetDataArr && hasDate) {
            window.open('https://uhotel.liontravel.com/Search?' + url, '_blank').focus();
        }
        else{
            alert('請確認目的地、入住日期、間數/人數欄位都已填完');
        }
    }

    render () {

        return (
            <div className="hotel_pc">

                <div className="hotel_pc_info_panel">
                    <div className="hotel_pc_top">
                        {/*dtm*/}
                        <div className="hotel_pc_place">
                            <AutoTextModule
                                setParentsDestinationObj={(destinationObj, destinationSelectVal) => {                                    
                                    this.destinationObj = destinationObj;
                                    this.destinationSelectVal = destinationSelectVal;
                                }}
                            />
                        </div>
                        
                        {/*月曆*/}
                        <div className="hotel_pc_order_dates">
                            <CyRnmb
                                isShowIcon
                                moduleClassName="hotel_pc_cy_rnmb"
                                mode="doubleWay"
                                isNight
                                isReq
                                defaultStartDate={this.calendarDateInfo.startDate}
                                defaultEndDate={this.calendarDateInfo.backDate}
                                minDate="2018/04/03"
                                maxDate="2018/07/03"
                                activeStartDate="2018/04/24"
                                activeEndDate="2018/06/10"
                                labelStartDateText="住房期間"
                                onChange ={(dateObj) => {
                                    console.log('月曆物件', dateObj);
                                    this.calendarDateInfo.startDate = dateObj.startDate;
                                    this.calendarDateInfo.backDate = dateObj.backDate;
                                }}
                            />
                        </div>
                        {/*間數人數*/}
                        <div className="hotel_pc_people_count">
                            <StRnls
                                CustomComponent={
                                    <CustomComponent 
                                        roominfos={JSON.parse(JSON.stringify(this.state.roominfos))}
                                    />
                                }
                                ContentComponent={
                                    <ContentComponent
                                        roominfos={JSON.parse(JSON.stringify(this.state.roominfos))}
                                        changeRoomCountsState={count => {
                                            let roominfos = JSON.parse(JSON.stringify(this.state.roominfos));
                                            // count
                                            roominfos.roomCounts = count;
                                            // people Count
                                            let roomPeopleInfoTemplate = {
                                                adult: 1,
                                                children: []
                                            }

                                            roominfos.roomPeopleInfos = this.produceCountArr(count, roominfos.roomPeopleInfos, roomPeopleInfoTemplate);
                                            this.setState({ roominfos });
                                        }}
                                        changeAdultCount = {(index,val) => {
                                            let roominfos = JSON.parse(JSON.stringify(this.state.roominfos));
                                            roominfos.roomPeopleInfos[index].adult = val;
                                            this.setState({ roominfos });
                                        }}
                                        changeChildrenCount={(index, count) => {
                                            let roominfos = JSON.parse(JSON.stringify(this.state.roominfos));
                                            // let roomChildrenTemplate = { 
                                            //     age: 0
                                            // };
                                            // 目前要變動的小孩物件，增減完再塞回同樣位置的小孩物件
                                            let nowChildArr = JSON.parse(JSON.stringify(roominfos.roomPeopleInfos[index].children));
                                            nowChildArr = this.produceCountArr(count, nowChildArr, 0);
                                            
                                            roominfos.roomPeopleInfos[index].children = nowChildArr;
                                            this.setState({ roominfos });
                                        }}
                                        changeChildrenSingleAge= {(roomIndex,childrenIndex,count) => {
                                            let roominfos = JSON.parse(JSON.stringify(this.state.roominfos));
                                            // roominfos.roomPeopleInfos[roomIndex].children[childrenIndex] = {age: count};
                                            roominfos.roomPeopleInfos[roomIndex].children[childrenIndex] = count;
                                            this.setState({ roominfos });
                                        }}
                                    />
                                }
                                moduleClassName=""
                                appendToBody
                                width="570px"
                                whenOpen={e => console.log('Demo Panel Open')}
                                whenClose={e => console.log('Demo Panel Close')}
                                innerComponentClass={['st_rnls_people_container']}
                            />
                        </div>

                    </div>
                    <div className="hotel_pc_bottom">
                        <div className="hotel_pc_order_checkbox">
                            <CrRcln
                                type="checkbox"
                                className=""
                                textContent="顯示可立即確認訂房"
                                defaultChecked={this.state.filterChecked}
                                whenChange={(value) => {
                                    console.log('whenChangeCallBack', value)
                                    this.setState({
                                        filterChecked: value
                                    });
                                }}
                            />
                        </div>
                        <div 
                            className="hotel_pc_order_link"
                            onClick={e => { window.open('http://globalhotel.liontravel.com/') }}
                        >
                            <IcRcln name="toolchoosen" />
                            <span className="hotel_pc_order_link_text">我要訂購今日住宿</span>
                        </div>
                    </div>
                </div>
                {/*搜尋按鈕*/}
                <div className="hotel_pc_search_button">
                    <BtRcnb
                        prop="string"
                        className=""
                        radius
                        whenClick={ e => {this.windowOpen()}}
                    >
                        <IcRcln name="toolsearch2" size="x15" />
                    </BtRcnb>
                </div>
            </div>
        );
    }
}

Module.defaultProps = {
    prop: 'string'
};

Module.propTypes = {
    prop: PropTypes.string.isRequired
};

export default Module;