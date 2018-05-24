import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import NtbRcln, { Tab } from '../../ntb_rcln';
import { getDomPosition, findHighestZIndex, fetchJsToObj } from '../utils';
import '../css.scss';

// function loopData (sourceData, levelKey, allData, nowKey, levelNum = 0, parentKey = [], disabledData = []) {
function loopData (parameters) {

    const parObj = Object.assign({}, {
        levelNum: 0,
        parentKey: [],
        disabledData: []
    }, parameters);

    let {
        sourceData,
        levelKey,
        allData,
        nowKey,
        levelNum,
        parentKey,
        disabledData
    } = parObj;

    const nowLevel = levelKey[levelNum];
    const parentLastVal = parentKey[parentKey.length - 1];

    let dataObj = {
        parent: parentKey,
        txt: (parentKey.length === 0) ? sourceData[nowLevel][nowKey] : sourceData[nowLevel][parentLastVal][nowKey],
        disable: (typeof disabledData !== 'undefined' && disabledData.indexOf(nowKey) !== -1) ? true : false
    };

    // 每筆資料都遍歷全部levelkey,parentKey沒有定義值就表示此選項是此區域的不限選項
    for (let i = 0, key; key = levelKey[i]; i++) {
        dataObj[key] = (typeof parentKey[i] === 'undefined') ? '_' : parentKey[i];
        if (i === levelNum) dataObj[key] = nowKey;
    }

    allData.push(dataObj);
    if (levelNum < levelKey.length - 1) {

        let newlevelNum = levelNum + 1;

        for (let Newnowkey in sourceData[levelKey[newlevelNum]][nowKey]) {
            if (Newnowkey === '_') {
                continue;
            } else {
                let parent = [...parentKey];
                parent.push(nowKey);
                // loopData(sourceData, levelKey, allData, nowkey, levelNum, parent, disabledData);
                loopData({
                    sourceData: sourceData,
                    levelKey: levelKey,
                    allData: allData,
                    nowKey: Newnowkey,
                    levelNum: newlevelNum,
                    parentKey: parent,
                    disabledData: disabledData
                });
            }

        }
    }
}


let fetchObject = {};


class Module extends Component {
    constructor (props) {
        super(props);
        this.state = {
            max: this.props.max,
            open: this.props.open || false,
            allData: [],
            selectedData: []
        };
        this.sourceData = null;
        this.zIndex = null;
        this.menuClose = this.menuClose.bind(this);
        this.menuOpen = this.menuOpen.bind(this);
        this.toggleItem = this.toggleItem.bind(this);
    }
    componentDidMount () {
        let highestZindex = findHighestZIndex('div');
        this.zIndex = highestZindex + 1;

        const alreadyFetchData = fetchObject[this.props.fetchPath]; // 檢查是否已經有fetch過此source

        if (typeof alreadyFetchData === 'undefined') {
            this.loadData(this.props.fetchPath);
        } else {
            this._fetchDataCallBack(alreadyFetchData);
        }

    }
    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.open === this.state.open && nextProps.selectedData === this.state.selectedData) return;
        this.setState({
            open: nextProps.open,
            selectedData: nextProps.selectedData
        });
    }
    loadData (source) {

        if (source.indexOf('.json') !== -1) { // 若檔案格式為json
            fetch(source, {
                method: 'GET',
            }).then(response => {
                return response.json();
            }).then(data => {
                fetchObject[source] = data; // 把data存起來,若下次再fetch相同網址直接取用就好,不用再發送http request
                this._fetchDataCallBack(data);
            });
        } else {
            fetchJsToObj(source, (data) => {
                fetchObject[source] = data;
                this._fetchDataCallBack(data);
            });
        }


    }
    _fetchDataCallBack = (data) => {
        const {
            customSourceData
        } = this.props;

        if (typeof customSourceData === 'function') {
            this.sourceData = customSourceData(data);
        } else {
            this.sourceData = data;
        }

        this.arrangeData(this.props.levelKey, this.props.lineOrder);
    }
    arrangeData (levelKey, lineArray) {
        let sourceData = this.sourceData;
        let allData = [];
        const disabledData = this.props.disabledData;

        for (let i = 0, item; item = lineArray[i]; i++) {
            loopData({
                sourceData,
                levelKey,
                allData,
                nowKey: item,
                disabledData
            });
        }

        this.setState({ allData });
    }
    _renderContent = () => {
        if (!this.sourceData) return;
        // 針對訂房有4層Tab做額外處理
        if (this.props.levelKey.length > 3) {
            return (
                <NtbRcln
                    wrap_dtm_rcln={!this.props.isMobile}
                    wrap_ntb_rcln={this.props.isMobile}
                    activeTabIndex={0}
                >
                    <Tab label={this.sourceData[this.props.levelKey[0]][this.props.lineOrder[0]]}>
                        <NtbRcln
                            customClass={cx({
                                noTab: this.props.noTab
                            })}
                            dtm_rcln_mode={!this.props.isMobile}
                            activeTabIndex={0}
                        >
                            {this._renderTab2(this.props.showOrder1, this.props.lineOrder[0])}
                        </NtbRcln>
                    </Tab>
                    <Tab label={this.sourceData[this.props.levelKey[0]][this.props.lineOrder[1]]}>
                        <NtbRcln
                            customClass={cx({
                                noTab: this.props.noTab
                            })}
                            dtm_rcln_mode={!this.props.isMobile}
                            activeTabIndex={0}
                        >
                            {this._renderTab2(this.props.showOrder2, this.props.lineOrder[1])}
                        </NtbRcln>
                    </Tab>
                </NtbRcln>
            );
        }

        return (
            <NtbRcln
                customClass={cx({
                    noTab: this.props.noTab
                })}
                dtm_rcln_mode={!this.props.isMobile}
                activeTabIndex={0}
            >
                {this._renderTab()}
            </NtbRcln>
        );
    }
    renderLabel () {
        return <p className="dtm_label">{this.props.label}</p>;
    }
    _renderTab = () => {
        // 把lineOrder陣列轉成對應的中文字陣列
        let level1 = this.props.lineOrder.map((v, i) => {
            return this.sourceData[this.props.levelKey[0]][v];
        });
        let tabs = level1.map((v, i) => {
            return (
                <Tab key={v}
                    label={v}
                    dot={this.hasSelectedItem(i)}
                >
                    {this._renderPanlContent_secAll(this.props.lineOrder[i])}
                </Tab>
            );
        });

        return tabs;
    }
    _renderTab2 = (lineOrder, abord) => {
        let level1 = lineOrder.map((v, i) => {
            return this.sourceData[this.props.levelKey[1]][abord][v];
        });
        let tabs = level1.map((v, i) => {
            return (
                <Tab
                    key={v}
                    label={v}
                >
                    {this._renderPanlContent_secAll(lineOrder[i], 1)}
                </Tab>
            );
        });
        return tabs;
    }
    _renderPanlContent_secAll (parent = null, levelNum = 0) {
        // 初次循環parnet預設null,levelNum預設為0
        const levelKey = [...this.props.levelKey];
        let panls = this.state.allData.filter((v, i) => {
            v.index = i;
            return v[levelKey[levelNum + 1]] === '_' && v[levelKey[levelNum]] === parent;
        });
        return panls.map((v, i) =>
            <React.Fragment key={i}>
                <a
                    className={cx('sec-all', {
                        hide: this.props.noTabItem,
                        selected: this.hasBeenSelected(v.index)
                    })}
                    onClick={() => { this.toggleItem(v.index) }}
                >
                    {(this.props.Icon) && this.props.Icon.tab}
                    {v.txt + '全區'}
                </a>
                {this._renderPanlContent_secPanel(parent, levelNum + 1)}
            </React.Fragment>
        );

    }
    _renderPanlContent_secPanel = (parent, levelNum) => {
        const levelKey = [...this.props.levelKey];

        if (levelKey.length < 3) { // 針對資料只有兩筆物件的情形
            return this._renderPanlContent_last(parent, levelNum);
        }

        let panls = this.state.allData.filter((v, i) => {
            return v[levelKey[levelNum - 1]] === parent && v[levelKey[levelNum]] !== '_' && v[levelKey[levelNum + 1]] === '_';
        });
        return panls.map((v, i) =>
            <div key={i}
                className={cx('sec-wrap', {
                    inline: this.props.inline
                })}
            >
                {
                    (this.props.secItemReadOnly) ?
                        <span key={v.index}>
                            {(this.props.Icon) && this.props.Icon.sec}
                            {v.txt}
                        </span>
                        :
                        <a
                            className={cx({
                                selected: this.hasBeenSelected(v.index)
                            })}
                            key={v.index}
                            onClick={() => { this.toggleItem(v.index) }}
                        >
                            {(this.props.Icon) && this.props.Icon.sec}
                            {v.txt}
                        </a>
                }
                {this._renderPanlContent_last(v[levelKey[levelNum]], levelNum + 1)}
            </div>
        );
    }
    _renderPanlContent_last = (parent, levelNum) => {
        const levelKey = [...this.props.levelKey];
        let panls = this.state.allData.filter((v, i) => {
            return v[levelKey[levelNum - 1]] === parent && v[levelKey[levelNum]] !== '_';
        });
        return (
            <ul className="last_menu">
                {
                    panls.map((v, i) => {
                        return (
                            <li key={v.index}>
                                <a
                                    className={cx({
                                        selected: this.hasBeenSelected(v.index),
                                        disable: v.disable
                                    })}
                                    onClick={() => { this.toggleItem(v.index) }}
                                >
                                    {
                                        (this.props.removeStringOnMenu) ?
                                            v.txt.replace(new RegExp(this.props.removeStringOnMenu, 'g'), '') :
                                            v.txt
                                    }
                                </a>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
    menuClose () {
        this.setState({ open: false });
        if (this.props.whenClose) this.props.whenClose();
    }
    menuOpen () {
        this.setState({ open: true });
    }
    hasSelectedItem (i) { // 檢查此tab下是否有已選取過的選項
        const levelKey = this.props.lineOrder[i];
        const selectedData = [...this.state.selectedData];
        let hasData = selectedData.some((v) => v[this.props.levelKey[0]] === levelKey);

        if (hasData) return true;
        else return false;
    }
    hasBeenSelected (i) { // 檢查此<a>是否已選取過
        const selectedData = [...this.state.selectedData];
        let check = selectedData.some((v) => v.index === i);
        if (check) return true;
        else return false;
    }
    checkItem (i) { // 檢查此筆資料上下對應關係,此function返回需要被處理的資料
        const levelKey = [...this.props.levelKey];
        let selectedData = [...this.state.selectedData];
        const thisData = this.state.allData[i];
        const parentArray = thisData.parent;
        // 如果沒有parent,代表此次是全區選取
        if (parentArray.length === 0) {
            let key = thisData[levelKey[0]];
            const childItem = selectedData.filter((v, i) => {
                return v[levelKey[0]] === key;
            });

            return childItem;

        } else if (parentArray.length === 1) {
            // 這層是第二層選單選取
            let key = thisData[levelKey[1]];
            const parentItem = selectedData.filter((v) => {
                return v[levelKey[0]] === thisData[levelKey[0]] && v[levelKey[1]] === '_';
            });
            const childItem = selectedData.filter((v, i) => {
                return v[levelKey[1]] === key;
            });

            return [...parentItem, ...childItem];

        } else if (parentArray.length === levelKey.length - 1) {
            // 最底層選單選取
            let key = thisData[levelKey[0]];
            let key2 = thisData[levelKey[1]];
            const parentItem = selectedData.filter((v) => {
                return (v[levelKey[1]] === key2 && v[levelKey[levelKey.length - 1]] === '_') || (v[levelKey[0]] === key && v[levelKey[1]] === '_');
            });

            return parentItem;
        }
    }
    autoFilter (data) { // 此function返回,整理好的資料
        let result = [...this.state.selectedData];
        for (let i = 0; i < data.length; i++) {
            const key = data[i].index;
            result = result.reduce((a, b, c, d) => {
                if (b.index === key) a.splice(c, 1);
                return a;
            }, [...result]);
        }
        return result;
    }
    toggleItem (i) {
        // 如果這筆資料是disable 不做任何事
        if (this.state.allData[i].disable) return;

        let selectedData = [...this.state.selectedData];
        let index;
        const check = selectedData.filter((v, ind) => {
            if (v.index === i) index = ind;
            return v.index === i;
        });
        let hasThisData = (check.length === 0) ? false : true;

        // 如果已經有就拿掉,沒有就加在最後一個
        if (hasThisData) {
            selectedData.splice(index, 1);
        } else {

            // 若設定資料最多為一筆,此筆資料直接替換掉已選資料
            if (this.state.max === 1) {
                selectedData = [this.state.allData[i]];
                this.setState({ selectedData });
                if (this.props.onChange) this.props.onChange(selectedData);
                return;
            }

            // 檢查這筆資料是否有父或子項目已被選取
            const result = this.checkItem(i);

            // 有結果代表有需要對selectedData做操作
            if (result.length !== 0) {
                selectedData = this.autoFilter(result);
            }

            selectedData.push(this.state.allData[i]);

            // 若超過資料最大限制, 不做任何事
            if (selectedData.length > this.state.max) return;
        }

        this.setState({ selectedData });
        if (this.props.onChange) this.props.onChange(selectedData);
    }
    render () {

        const classes = cx('dtm_rcln', {
            open: this.state.open,
            isMobile: this.props.isMobile
        });

        if (this.props.isMobile) {
            return (
                <div className={classes}
                    onMouseDown={this.props.onMouseDown}
                    onMouseUp={this.props.onMouseUp}
                >

                    {this.props.label && this.renderLabel()}

                    {this._renderContent()}

                </div>
            );
        }

        const styles = {
            'zIndex': this.zIndex,
            'left': (this.props.positionDOM) ? getDomPosition(this.props.positionDOM, 'left') : null,
            'top': (this.props.positionDOM) ? getDomPosition(this.props.positionDOM, 'top') + getDomPosition(this.props.positionDOM, 'height') : null
        };

        return ReactDOM.createPortal(
            <div className={classes}
                style={styles}
                tabIndex={-1}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
            >

                {this.props.label && this.renderLabel()}

                <span
                    className="close_btn"
                    onClick={this.menuClose}
                >
                    ×
                </span>

                {this._renderContent()}

            </div>
            , document.body
        );
    }
}

// Props default value write here
Module.defaultProps = {
    max: 3,
    label: '',
};

// Typechecking with proptypes, is a place to define prop api
Module.propTypes = {
    open: PropTypes.bool.isRequired,
    max: PropTypes.number,
    label: PropTypes.string,
    lineOrder: PropTypes.array.isRequired,
    levelKey: PropTypes.array.isRequired,
    removeStringOnMenu: PropTypes.string,
    noTabItem: PropTypes.bool,
    noTab: PropTypes.bool,
    inline: PropTypes.bool,
    onChange: PropTypes.func,
    Icon: PropTypes.object,
    selectedData: PropTypes.array,
    whenClose: PropTypes.func,
    // sourceData: PropTypes.object.isRequired,
    // allData: PropTypes.array.isRequired,
    secItemReadOnly: PropTypes.bool,
    isMobile: PropTypes.bool,
    fetchPath: PropTypes.string.isRequired,
    customSourceData: PropTypes.func
};

export default Module;