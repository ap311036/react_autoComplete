import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    CyRcmb
} from 'components';
import { hotelSeoPathConfig } from 'Root/source.config.js';

import './css/css.scss';
import SearchInput from './components/act_rajx/components/SearchInput';
import moment from 'moment';
export default class Demo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            destinationToggle: false, // 預設目的地頁關閉
            calendarToggle: false, // 預設月曆人數頁關閉
            roomPeopleToggle: false, // 預設間數人數頁關閉
            destinationTextInMainPage: '',
            calendarTextInMainPage: '',
            // ======== 目的地 ========
            SearchInputDisabled: true,
            // 補字
            isLoading: true,
            destinationTextInputPlaceHolder: '請選擇',
            destinationKeyword: '',
            destinationOldObj: { level1: '', level3: '' },
            destinationObj: { level1: '', level3: '' },
            destinationSelectVal: null,
            destinationShowAct: false,
            // 快速選單
            selectedData: [],
            // ======== 月曆 ========
            checkInDate: 'YYYY/MM/DD',
            checkOutDate: 'YYYY/MM/DD',
            checkInOldDate: 'YYYY/MM/DD',
            checkOutOldDate: 'YYYY/MM/DD',
            // ======== 間數人數 ========
            roomSelected: false,
            roomOldRoomData: [{ AdultQty: 1, ChildQty: 0, ChildAges: [] }],
            roomOldRoomCount: 1,
            roomOldAdultCount: 1,
            roomOldChildCount: 0,
            roomData: [{ AdultQty: 1, ChildQty: 0, ChildAges: [] }],
            roomCount: 1,
            roomAdultCount: 1,
            roomChildCount: 0,
            // ======== Excel 制定規格 ========
            filterChecked: false,
        };
        this.dom = null;
        this.fetchData = this.fetchData.bind(this);
        this.AbortController = null;
    }
    componentDidUpdate () {
        if (this.state.destinationToggle && this.state.isLoading) {
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 1500);
        }
    }
    _destinationOnClick = () => {
        console.log('_destinationOnClick');
        this.setState({ destinationToggle: !this.state.destinationToggle });
    }
    _calendarOnClick = () => {
        console.log('_calendarOnClick');
        this.setState({ calendarToggle: !this.state.calendarToggle });
    }
    _roomPeopleToggle = () => {
        console.log('_roomPeopleToggle');
        this.setState({ roomPeopleToggle: !this.state.roomPeopleToggle });
        this.countRoomDetail();
    }
    _orderTodayOnClick = () => {
        if (this.state.destinationObj.txt !== '' && this.state.calendarTextInMainPage !== '' && this.state.roomSelected === true) {
            this.windowOpen();
        } else {
            alert('請確認目的地、入住日期、間數/人數欄位都已填完');
        }
    }
    filterCheckedToggle = () => {
        this.setState({ filterChecked: !this.state.filterChecked });
    }
    windowOpen (get) {
        console.log('this.state.roomOldRoomData', this.state.roomOldRoomData);

        let url = `searchParam={
            "Destination":{
                "Code":"${this.state.destinationOldObj.level3}",
                "Kind":"${this.state.destinationOldObj.level1}",
                "Txt":"${this.state.destinationOldObj.txt}"
            },
            "CheckIn":"${this.state.checkInOldDate}",
            "CheckOut":"${this.state.checkOutOldDate}",
            "Rooms":${JSON.stringify(this.state.roomOldRoomData)},
            "Filter":{"Allotment":"${this.state.filterChecked ? 0 : 1}"}
        }`;
        url = url.replace(/[\n\s]*/g, '');
        console.log('url', url);

        window.open('https://uhotel.liontravel.com/Search?' + url, '_blank').focus();
    }
    // "目的地分頁"的事件
    //  補字事件
    searchHandler = (txt) => {
        // 輸入大於兩個字才能搜尋
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            self.setState({ isLoading: true });
            self.fetchData(txt);
        }, 500);
    }
    fetchData (value) {
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
            .then(res => {
                return res.json();
            })
            .then(d => this.processData(d, value))
            .catch(res => console.error('request has error', res));
    }
    processData (data, searchKeyWord) {
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
                return item;
            });
            resolve(data);
        });
        this.setState({ data: data.Destinations, destinationKeyword: searchKeyWord, isLoading: false });
        return p;
    }
    clearWord = (text) => {
        this.setState({ destinationSelectVal: text });
    }
    receive = (i) => {
        this.setState({ destinationSelectVal: i.txt, destinationObj: i });
        console.log('主頁面接收到', i);
    }
    showText = () => {
        this.state.showText ? this.setState({ showText: '' }) : this.setState({ showText: '請先輸入上方目的地條件' });
    }
    destinationPageConfirm = () => {
        this.setState({ destinationTextInMainPage: this.state.destinationSelectVal, destinationOldObj: this.state.destinationObj });
        this.setState({ destinationToggle: !this.state.destinationToggle });
    }
    destinationPageCancel = () => {
        this.setState({ destinationObj: this.state.destinationOldObj });
        this.setState({ destinationToggle: !this.state.destinationToggle });
    }
    // 月曆分頁事件
    calendarSetDate = (startDate, endDate) => {
        this.setState({ checkInDate: startDate, checkOutDate: endDate });
    }
    calendarConfirm = () => {
        let nights = moment(this.state.checkOutDate).diff(this.state.checkInDate, 'days');
        let text = `${this.state.checkInDate}~${this.state.checkOutDate}，共${nights}晚`;
        this.setState({ calendarToggle: !this.state.calendarToggle, checkInOldDate: this.state.checkInDate, checkOutOldDate: this.state.checkOutDate, calendarTextInMainPage: text });
    }
    calendarCancel = () => {
        this.setState({ checkInDate: this.state.checkInOldDate, checkOutDate: this.state.checkOutOldDate });
        this.setState({ calendarToggle: !this.state.calendarToggle });
    }
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
        this.setState({
            selectedData: data, destinationSelectVal: data[0] ? data[0].txt : '', destinationObj: obj
        });
    }
    // 間數人數分頁的事件
    _roomSelectOnClick = (val) => {
        console.log('%c選了' + val + '間(預設選1間)', 'color:#957bbe');
        this.setState({ roomCount: val });
        this.addRoom(val); // 增加房間
    };
    // 設定房間數量
    addRoom = (val) => {
        let newArry = JSON.parse(JSON.stringify(this.state.roomData));
        const roomTemp = { AdultQty: 1, ChildAges: [] };
        if (val > this.state.roomData.length) {
            for (let i = this.state.roomData.length; i < val; i++) {
                newArry.push(roomTemp);
            }
        } else {
            newArry.length = val;
        }
        this.setState({ roomData: [...newArry] }, () => this.countRoomDetail());
        this.countRoomDetail();
    }
    adultHandler = (pv, v, i) => {
        let roomData = JSON.parse(JSON.stringify(this.state.roomData));
        roomData[i].AdultQty = v;
        this.setState({ roomData });
        this.countRoomDetail();
    }
    childHandler = (pv, v, i) => {
        let roomData = JSON.parse(JSON.stringify(this.state.roomData));
        if (v > pv) {
            roomData[i].ChildAges.push(0);
        }
        if (pv > v) {
            roomData[i].ChildAges.length = v;
        }
        roomData[i].ChildQty = roomData[i].ChildAges.length;
        this.setState({ roomData });
    }
    ageChange = (v, i, idx) => {
        let roomData = JSON.parse(JSON.stringify(this.state.roomData));
        roomData[i].ChildAges[idx] = Number(v);
        this.setState({ roomData });
        this.countRoomDetail();
    }
    countRoomDetail = () => {
        let roomData = JSON.parse(JSON.stringify(this.state.roomData));
        const reducer = (acc, cur) => acc + cur;
        let roomCount = roomData.length;
        let roomAdultCount = roomData.map(
            (item) => {
                return item.AdultQty;
            }
        );
        let roomChildCount = roomData.map(
            (item) => {
                return item.ChildAges.length;
            }
        );
        roomAdultCount = roomAdultCount.reduce(reducer);
        roomChildCount = roomChildCount.reduce(reducer);
        this.setState({ roomCount, roomAdultCount, roomChildCount });
    }
    roomPageConfirm = () => {
        this.setState({ roomOldRoomData: this.state.roomData, roomSelected: true });
        this._roomPeopleToggle();
    }
    roomPageCancel = () => {
        this.setState({
            roomData: this.state.roomOldRoomData,
            roomCount: this.state.roomOldRoomCount,
            roomAdultCount: this.state.roomOldAdultCount,
            roomChildCount: this.state.roomOldChildCount
        });
        this._roomPeopleToggle();
    }
    render () {
        const destinationPage = (
            <div className="nav c-dker">
                <div className="nvb-header fixed">
                    <div className="column w42" onClick={this.destinationPageCancel} >
                        <IcRcln name="toolbefore" size="x15" />
                    </div>
                    <div className="column">
                        <h3>目的地</h3>
                    </div>
                    <div className="column w42"></div>
                </div>
                <div className="nvb-body destination_body">
                    <div className="destination_body_nav">
                        <SearchInput
                            containerClass={'int_rcln intrcln_destination int-p-l-86 breakline noBorder request blue'}
                            labelClass="int_rcln_label"
                            inputClass="int_rcln_input"
                            style={null}
                            placeholderText={this.state.destinationTextInputPlaceHolder}
                            onChange={this.searchHandler}
                            keyWord={this.state.destinationSelectVal} // 傳出input輸入的字串
                            clearWord={this.clearWord} // 清除所有文字的callbackFn
                        > {/* 當input被focus時告訴preview */}
                        </SearchInput>
                        <div className="destination_body_nav_notice">更多目的地，請輸入關鍵字</div>
                    </div>
                    <div className="destination_body_select">
                        {
                            this.state.isLoading ?
                                <div className="loading">
                                    載入中，請稍候...
                                </div>
                                :
                                <div className="list_container">
                                    <ActRajax
                                        containerClass={['customAct', this.state.destinationKeyword.length >= 2 ? '' : 'd-no'].join(' ')} // 傳入custom class
                                        data={this.state.data}
                                        matchWord={this.state.destinationKeyword} // 傳入篩選的字串
                                        showText={this.state.showText} // 顯示預設文字
                                        getItemClickValue={this.receive} // 模組回傳被選取的物件資料
                                        minimumStringQueryLength={2} // 最少輸入幾個字
                                        minimumStringQuery={'請至少輸入兩個字'} // 尚未輸入文字字數到達要求會顯示此字串
                                        noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
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
                                    >
                                    </ActRajax>
                                    <div className="dtm_rcln_wrap"
                                        ref={e => { this.dom = e }}
                                    >
                                        <DtmRcln
                                            onMouseDown={this.dtmRclnHandleMouseDown}
                                            onMouseUp={this.dtmRclnHandleMouseUp}
                                            open={this.state.destinationKeyword.length < 2}
                                            onChange={this.dtmRclnOnChange}
                                            whenClose={() => {
                                                this.setState({
                                                    open: false
                                                });
                                            }}
                                            max={1}
                                            fetchPath={hotelSeoPathConfig.dtm}
                                            // 改洲別順序, 必填, 須注意lineOrder這個props的順序
                                            showOrder1={['_6', '_5', '_7', '_3', '_1', '_4', '_2']}
                                            // 改地區順序, 必填, 須注意lineOrder這個props的順序
                                            showOrder2={['_TPE_KLU', '_TAO_HCU_MLI', '_TCH_CHA_NTO', '_YLI_CYI_TNN', '_KHH_PIN', '_YLN_HLN_TTT']}
                                            selectedData={this.state.selectedData}
                                            lineOrder={['out', 'in']}
                                            levelKey={['vAbord', 'vLine', 'vCountry', 'vCity']}
                                            positionDOM={this.dom}
                                            removeStringOnMenu="\(.+"
                                            noTabItem
                                            secItemReadOnly
                                            isMobile
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
                        }
                    </div>
                </div>
                <div className="nvb-footer fixed">
                    <button className="nvb-btn gray cancel" onClick={this.destinationPageCancel}>取消</button>
                    <button className="nvb-btn confirm" onClick={this.destinationPageConfirm}>確認</button>
                </div>
            </div>
        );
        const calendarPage = (
            <div className="nav">
                <div className="nvb-header fixed">
                    <div className="column w42" onClick={this.calendarCancel} >
                        <IcRcln name="toolbefore" size="x15" />
                    </div>
                    <div className="column">
                        <h3>月曆</h3>
                    </div>
                    <div className="column w42"></div>
                </div>
                <div className="nvb-body">
                    <CyRcmb className="nvb-calendar" startDate="2017/06/08" endDate="2017/09/25" onClickDate={(start, end) => this.calendarSetDate(start, end)} />
                </div>
                <div className="nvb-footer fixed">
                    <button className="nvb-btn gray cancel" onClick={this.calendarCancel}>取消</button>
                    <button className="nvb-btn confirm" onClick={this.calendarConfirm}>確認</button>
                </div>
            </div>
        );
        // render間數人數分頁
        const roomPeoplePage = () => {
            const roomPeople = [
                { text: '共1間', value: 1 },
                { text: '共2間', value: 2 },
                { text: '共3間', value: 3 },
                { text: '共4間', value: 4 },
                { text: '共5間', value: 5 },
                { text: '共6間', value: 6 },
                { text: '共7間', value: 7 },
            ];
            const age = [
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
            // render房間
            let room = this.state.roomData;
            return (
                <div className="nav c-dker">
                    <div className="nvb-header fixed">
                        <div className="column w42" onClick={this.roomPageCancel} >
                            <IcRcln name="toolbefore" size="x15" />
                        </div>
                        <div className="column">
                            <h3>間數/人數</h3>
                        </div>
                        <div className="column w42"></div>
                    </div>
                    <div className="nvb-body roomPeople_body">
                        <div className="roomPeople_body_nav">
                            <IntRcln className="intrcln_destination int-p-l-86 breakline noBorder"
                                placeholder="請選擇"
                                label="間數/人數"
                                value={`共${this.state.roomCount}間，${this.state.roomAdultCount}位大人、${this.state.roomChildCount}位小孩`}
                                request
                                readOnly
                            />
                        </div>
                        <div className="roomPeople_body_select">
                            <StRcln ClassName="" option={roomPeople} placeholder="請選擇" label="間數" defaultValue={this.state.roomCount} onChangeCallBack={this._roomSelectOnClick}></StRcln>
                        </div>
                        <div className="roomPeople_body_room">
                            {
                                room.map((ele, i) => {
                                    return (
                                        <div className="roomPeople_body_count" key={i}>
                                            <div className="num">
                                                <span>{i + 1}</span>
                                            </div>
                                            <div className="people">
                                                <div className="adult">
                                                    成人
                                                    <IntGpct
                                                        className="marginLeft7"
                                                        max={4}
                                                        min={1}
                                                        count={1}
                                                        keyin={false}
                                                        btnClassMinus="ic_rcln toolcancelb"
                                                        btnClassAdd="ic_rcln tooladdb"
                                                        onChange={(prevValue, Val) => this.adultHandler(prevValue, Val, i)}
                                                    >
                                                    </IntGpct>
                                                </div>
                                                <div className="child">
                                                    小孩
                                                    <IntGpct
                                                        className="marginLeft7"
                                                        max={3}
                                                        min={0}
                                                        count={0}
                                                        keyin={false}
                                                        btnClassMinus="ic_rcln toolcancelb"
                                                        btnClassAdd="ic_rcln tooladdb"
                                                        onChange={(prevValue, Val) => this.childHandler(prevValue, Val, i)}
                                                    >
                                                    </IntGpct>
                                                    <div className="displayFlex marginLeft30">
                                                        {
                                                            ele.ChildAges.length > 0 && ele.ChildAges.map((item, idx) => (
                                                                <StRcln option={age} onChangeCallBack={(val) => this.ageChange(val, i, idx)} ClassName="age" key={idx} defaultValue={0}></StRcln>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="roomPeople_warningText">※單次訂購提供相同房型，相同房型不同入住人數依選購的專案售價。</div>
                        {/* <p>這次setState的資料</p> */}
                        {/* <pre>{JSON.stringify(this.state.roomData)}</pre> */}
                        {/* <p>點選取消要覆蓋回去的資料</p> */}
                        {/* <pre>{JSON.stringify(this.state.roomOldRoomData)}</pre> */}
                    </div>
                    <div className="nvb-footer fixed">
                        <button className="nvb-btn gray cancel" onClick={this.roomPageCancel}>取消</button>
                        <button className="nvb-btn confirm" onClick={this.roomPageConfirm}>確認</button>
                    </div>
                </div>
            );
        };
        return (
            <div className="hotel_container">
                <h1 className="fontSize20 textAlignCenter paddingTopBottom20 whiteFontColor">國內外訂房搜尋</h1>
                <IntRcln className="intrcln_destination marginTop10" placeholder="" value={this.state.destinationObj.txt} onClick={this._destinationOnClick} label="目的地" breakline request readOnly color="blue" noBorder /> {/*  destination */}
                <IntRcln className="intrcln_room_days marginTop10" placeholder="" value={this.state.calendarTextInMainPage} onClick={this._calendarOnClick} label="住房期間" breakline request readOnly color="blue" noBorder /> {/*  room_days */}
                <IntRcln className="intrcln_room_people marginTop10" placeholder="" value={this.state.roomSelected ? (`共${this.state.roomCount}間，${this.state.roomAdultCount}位大人、${this.state.roomChildCount}位小孩`) : ''} onClick={this._roomPeopleToggle} label="間數/人數" breakline request readOnly color="blue" noBorder />  {/*  room_people */}
                <div className="m-t"><CrRcln className="crrcln_custom" type="checkbox" textContent="顯示可立即確認訂房" whenChange={this.filterCheckedToggle}></CrRcln></div> {/*  ☑️顯示可立即確認訂房 */}
                <BtRcnb className="w-full m-t bg-lightPink" lg radius whenClick={this._orderTodayOnClick}>搜尋</BtRcnb> {/*  Btn 搜尋 */}
                <span className="whiteFontColor textAlignCenter paddingTopBottom20"><IcRcln border circular className="marginLeftRight5" name="toolchoose" /><span className="underLine userCursorPointer" onClick={e => { window.open('http://globalhotel.liontravel.com/') }}>我要訂購今日住宿</span></span>
                {/*  目的地分頁 */}
                <NvbRslb
                    visible={this.state.destinationToggle}
                    ContentComponent={destinationPage}
                    className=""
                    direction={['right']}
                    width="100%"
                />
                {/*  月曆分頁 */}
                <NvbRslb
                    visible={this.state.calendarToggle}
                    ContentComponent={calendarPage}
                    className=""
                    direction={['right']}
                    width="100%"
                />
                {/*  間數/人數分頁 */}
                <NvbRslb
                    visible={this.state.roomPeopleToggle}
                    ContentComponent={roomPeoplePage()}
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