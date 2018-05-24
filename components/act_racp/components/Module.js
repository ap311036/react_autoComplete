import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'React-dom';
import cx from 'classnames';
import styles from '../css.scss';
/**
 * ## All Lifecycle: [see detail](https://reactjs.org/docs/react-component.html)
 * * React Lifecycle
 * > - componentDidMount()
 * > - shouldComponentUpdate(nextProps, nextState)
 * > - componentDidUpdate(prevProps, prevState)
 * > - componentWillUnmount()
 * * Will be removed in 17.0: [see detail](https://github.com/facebook/react/issues/12152)
 * > - componentWillMount()
 * > - componentWillReceiveProps(nextProps)
 * > - componentWillUpdate(nextProps, nextState)
 */

function diffData (array, selectedIndex) {
    return array.findIndex((item, i) => item.dataIndex === selectedIndex);
}

class Module extends Component {
    constructor (props) {
        super(props);
        this.state = {
            // data: this.props.data || [],
            data: [{ parent: [], level2: '_', level3: '_', level4: '_', level1: '_1', txt: '美洲', merged: '美洲' }],
            select: null,
            secondData: []
        };
    }

    // componentWillMount () {
    // console.log('Module componentWillMount');
    // 資料預處理
    // this.getData();
    // }
    componentDidMount () {
        console.log('Module componentDidMount');
        // DidMount 時註冊監聽事件 Unmount時會移除監聽事件
        window.addEventListener('keydown', (e) => this.whenKeyPress(e), true);
        window.addEventListener('mouseup', (e) => this.props.closeBtnClickHandleCallback && this.props.closeBtnClickHandleCallback(e), true);
        if (typeof (Storage) !== 'undefined') {
            this.getData();
        } else {
            // 不支援localStorage
        }
        // this.filterData();
    }
    componentWillReceiveProps (nextProps) {
        // 傳入props的searchKeyWord做資料預處理
        // this.dataProcess(nextProps.searchKeyWord);
        // this.filterData(nextProps.searchKeyWord);
        // 輸入兩個字以下 會直接設定為null
        this.props.searchKeyWord !== nextProps.searchKeyWord && this.filterData(nextProps.searchKeyWord);
        this.props.ClassName !== nextProps.ClassName && this.forceUpdate();
        this.state.select !== nextProps.setSelectValue && this.setSelectValue(nextProps.setSelectValue);
    }
    shouldComponentUpdate (nextProps, nextState) {
        if (this.state === nextState) {
            return false;
        }
        return true;
    }
    componentWillUnmount () {
        window.removeEventListener('keydown', (e) => this.whenKeyPress(e), true);
        window.removeEventListener('mouseup', (e) => this.props.closeBtnClickHandleCallback && this.props.closeBtnClickHandleCallback(e), true);
    }
    getData () {
        let url = this.props.url;
        let jsonKey = this.props.jsonKey;
        let date = new Date().getTime(); // now
        let data;
        let self = this;
        function takeDate () {
            if (url.indexOf('.json') !== -1) {
                fetch(url).then(res => { return res.json() }).then(d => {
                    if (self.props.jsonKey) {
                        data = JSON.parse(JSON.stringify(d))[jsonKey];
                        localStorage[url] = JSON.stringify(d[jsonKey]);
                    } else {
                        data = JSON.parse(JSON.stringify(d));
                        localStorage[url] = JSON.stringify(d);
                    }
                    localStorage.timeStamp = date;
                    self.setState({ data: self.props.changeKey(data) }, self.dataProcess);
                });
            } else {
                fetch(url, { method: 'GET' })
                    .then(response => response.text())
                    .then(data => {
                        let newVariable = data.replace(/(?:var|let|const)\s(\w+)\s=/g, '"$1":').replace(/;/g, ',').replace(/,$/g, '').replace(/'/g, '"');
                        let Obj = JSON.parse('{' + newVariable + '}');
                        let DataArray = Object.values(Obj)[0];
                        localStorage[url] = JSON.stringify(DataArray);
                        localStorage.timeStamp = date;
                        self.setState({ data: self.props.changeKey(DataArray) }, self.dataProcess);
                    });
            }
        }
        if (localStorage[url]) {
            let data = JSON.parse(localStorage[url]);
            let timeStamp = localStorage.timeStamp;
            if (date - timeStamp >= 86400000) {
                takeDate();
            } else {
                this.setState({ data: this.props.changeKey(data) }, this.dataProcess);
            }
        } else {
            takeDate();
        }

    }
    // 從state抓資料再處理
    dataProcess () {
        let dataHasDataInedx = [...this.state.data];
        dataHasDataInedx.map((item, i) => {
            item.dataIndex = i;
            return item;
        });
        let copyArry = JSON.parse(JSON.stringify(dataHasDataInedx));

        let level1 = this.props.catalogue[0] ? this.props.catalogue[0].catafilter(copyArry) : []; // 亞洲
        let level2 = this.props.catalogue[1] ? this.props.catalogue[1].catafilter(copyArry) : []; // 台灣
        let level3 = this.props.catalogue[2] ? this.props.catalogue[2].catafilter(copyArry) : []; // 台北市
        let level4 = this.props.catalogue[3] ? this.props.catalogue[3].catafilter(copyArry) : []; // 士林區
        let level5 = this.props.catalogue[4] ? this.props.catalogue[3].catafilter(copyArry) : [];
        let level6 = this.props.catalogue[6] ? this.props.catalogue[3].catafilter(copyArry) : [];
        // let newArry = [...level1, ...level2, ...level3, ...level4];
        // 在每個物件中加上dataIndex屬性 whenKeyPress會依照dataIndex順序"上" "下" 選取
        // newArry.forEach((ele, i) => {
        //     ele['dataIndex'] = i;
        // });
        // if (this.props.showList) {
        //     newArry.length = this.props.showList;
        // }
        let afterProcess = [...level1, ...level2, ...level3, ...level4, ...level5, ...level6];
        this.setState({ level1data: level1, level2data: level2, level3data: level3, level4data: level4, level5data: level5, level6data: level6, secondData: afterProcess });
        // return newArry;
    }
    filterData (searkey = this.props.searchKeyWord) {
        let re = new RegExp('(?:.*| [\(\) \-\s\_]*)(' + searkey.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + ')(?:.*| [\(\) \-\s\_]*)', 'i');
        let {
            level1data, level2data, level3data, level4data, level5data, level6data,
        } = this.state;

        let a = level1data.filter((item, i) => {
            return re.test(item.txt);
        })
            .map(item => {
                if (re.test(item.txt)) {
                    let searchResult = item.txt.match(re)[1];
                    item.Newtxt = item.txt.replace(searchResult, '<span class="red">' + searchResult + '</span>');
                }
                return item;
            });

        let b = level2data.filter((item, i) => {
            return re.test(item.txt);
        })
            .map(item => {
                if (re.test(item.txt)) {
                    let searchResult = item.txt.match(re)[1];
                    item.Newtxt = item.txt.replace(searchResult, '<span class="red">' + searchResult + '</span>');
                }
                return item;
            });

        let c = level3data.filter((item, i) => {
            return re.test(item.txt);
        })
            .map(item => {
                if (re.test(item.txt)) {
                    let searchResult = item.txt.match(re)[1];
                    item.Newtxt = item.txt.replace(searchResult, '<span class="red">' + searchResult + '</span>');
                }
                return item;
            });

        let d = level4data.filter((item, i) => {
            return re.test(item.txt);
        })
            .map(item => {
                if (re.test(item.txt)) {
                    let searchResult = item.txt.match(re)[1];
                    item.Newtxt = item.txt.replace(searchResult, '<span class="red">' + searchResult + '</span>');
                }
                return item;
            });
        let e = level5data.filter((item, i) => {
            return re.test(item.txt);
        })
            .map(item => {
                if (re.test(item.txt)) {
                    let searchResult = item.txt.match(re)[1];
                    item.Newtxt = item.txt.replace(searchResult, '<span class="red">' + searchResult + '</span>');
                }
                return item;
            });
        let f = level6data.filter((item, i) => {
            return re.test(item.txt);
        })
            .map(item => {
                if (re.test(item.txt)) {
                    let searchResult = item.txt.match(re)[1];
                    item.Newtxt = item.txt.replace(searchResult, '<span class="red">' + searchResult + '</span>');
                }
                return item;
            });
        let afterProcess = [...a, ...b, ...c, ...d, ...e, ...f];
        if (afterProcess.length > 0) {
            afterProcess.map((item) => {
                item.css = 'bd';
            });
            afterProcess[0].css = '';
        }
        this.setState({ showlevel1data: a, showlevel2data: b, showlevel3data: c, showlevel4data: d, showlevel5data: e, showlevel6data: f, secondData: afterProcess });

    }
    // Your handle property functions
    onItemSelect (item, i) {
        // 在樣式上加上已選取樣式 回傳父層告知哪一個被選取
        this.setState({ select: i });
        this.props.whenItemSelect(item);
    }
    onItemClick (item, i) {
        this.onItemSelect(item, i);
        this.props.closeActcallback && this.props.closeActcallback();
    }
    whenKeyPress (e) {
        if (this.props.InputIsFocus) {
            if (e.keyCode === 40) {
                let index = this.state.select === null ? 0 : diffData(this.state.secondData, this.state.select) + 1;
                if (index >= this.state.secondData.length) {
                    index = 0;
                }
                this.onItemSelect(
                    this.state.secondData[index] // 傳入被選取的物件
                    , this.state.secondData[index].dataIndex // 傳入被選取的索引值
                );
            }
            if (e.keyCode === 38) {
                let prevIndex = diffData(this.state.secondData, this.state.select) - 1;
                if (prevIndex < 0) {
                    prevIndex = this.state.secondData.length - 1;
                }
                this.onItemSelect(
                    this.state.secondData[prevIndex] // 傳入被選取的物件
                    , this.state.secondData[prevIndex].dataIndex // 傳入被選取的索引值
                );
            }
        }
    }
    setSelectValue (value) {
        this.setState({ select: value });
    }
    /**
     * Render Notice：
     * 1. render 裡 setState 會造成回圈，setState -> render -> setState -> render ...
     * 2. 在render前的 setSatae 放在 componentWillMount，render 後的放在 componentDidMount
     * 3. 不要使用 array 的 index 為 keys，可針對該內容 hash 後為 key
     */
    render () {
        const { catalogue, setRef, minimumStringQueryLength } = this.props;
        const select = this.state.select;
        const classes = cx('act_racp', this.props.ClassName, {
            overflowAuto: !this.props.showText,
        });
        const showText = () => {    // 必須先點選出發地才顯示的字串
            if (this.props.showText) {
                return (
                    <div className="m-place">
                        <button
                            onMouseDown={() => this.props.closeActcallback()}
                            className="close"
                        >x</button>
                        {this.props.showText}
                    </div>
                );
            }
        };
        const noMatchText = () => {    // 如果沒有搜尋到匹配的資料 則顯示noMatchText字樣
            if (this.state.secondData.length === 0 && !this.props.showText) {
                return (
                    <div className="noMatchText">
                        <button
                            onMouseDown={() => this.props.closeActcallback()}
                            className="close"
                        >x</button>
                        {this.props.noMatchText}
                    </div>
                );
            }
        };

        const moduleHtml = (
            <div className={classes} ref={setRef} style={this.props.style}>
                {/* 必須先點選出發地才顯示的字串 */}
                {showText()}
                {/* 如果沒有搜尋到匹配的資料 則顯示noMatchText字樣 */}
                {noMatchText()}
                {/* 資料 */}
                <div className={['section', this.state.showlevel1data ? (this.state.showlevel1data[0] && this.state.showlevel1data[0].css) : ''].join(' ')}>
                    {
                        (() => {
                            if (!this.props.showText && this.props.searchKeyWord.length >= minimumStringQueryLength) {
                                let list = this.state.showlevel1data.map((title, i) => {
                                    return (
                                        <span key={title.dataIndex}
                                            className={cx('item', { select: select === title.dataIndex })}
                                            dangerouslySetInnerHTML={{ __html: title.Newtxt }}
                                            onMouseDown={(e) => {
                                                this.onItemClick(title, title.dataIndex);
                                                this.props.whenSpanClick();
                                            }
                                            }
                                        >
                                        </span>
                                    );
                                });
                                if (this.state.showlevel1data.length > 0) {
                                    list.unshift(<span className="title" key={'title'}>{catalogue[0].icon && catalogue[0].icon}{catalogue[0].catalogueName}</span>);
                                }
                                return list;
                            }
                        })()
                    }
                </div>
                <div className={['section', this.state.showlevel2data ? (this.state.showlevel2data[0] && this.state.showlevel2data[0].css) : ''].join(' ')}>
                    {
                        (() => {
                            if (!this.props.showText && this.props.searchKeyWord.length >= minimumStringQueryLength) {
                                let list = this.state.showlevel2data.map((title, i) => {
                                    return (
                                        <span key={title.dataIndex}
                                            className={cx('item', { select: select === title.dataIndex })}
                                            dangerouslySetInnerHTML={{ __html: title.Newtxt }}
                                            onMouseDown={(e) => {
                                                this.onItemClick(title, title.dataIndex);
                                                this.props.whenSpanClick();
                                            }
                                            }
                                        >
                                        </span>
                                    );
                                });
                                if (this.state.showlevel2data.length > 0) {
                                    list.unshift(<span className="title" key={'title'}>{catalogue[1].icon && catalogue[1].icon}{catalogue[1].catalogueName}</span>);
                                }
                                return list;
                            }
                        })()
                    }
                </div>
                <div className={['section', this.state.showlevel3data ? (this.state.showlevel3data[0] && this.state.showlevel3data[0].css) : ''].join(' ')}>
                    {
                        (() => {
                            if (!this.props.showText && this.props.searchKeyWord.length >= minimumStringQueryLength) {
                                let list = this.state.showlevel3data.map((title, i) => {
                                    return (
                                        <span key={title.dataIndex}
                                            className={cx('item', { select: select === title.dataIndex })}
                                            dangerouslySetInnerHTML={{ __html: title.Newtxt }}
                                            onMouseDown={(e) => {
                                                this.onItemClick(title, title.dataIndex);
                                                this.props.whenSpanClick();
                                            }
                                            }
                                        >
                                        </span>
                                    );
                                });
                                if (this.state.showlevel3data.length > 0) {
                                    list.unshift(<span className="title" key={'title'}>{catalogue[2].icon && catalogue[2].icon}{catalogue[2].catalogueName}</span>);
                                }
                                return list;
                            }
                        })()
                    }
                </div>
                <div className={['section', this.state.showlevel4data ? (this.state.showlevel4data[0] && this.state.showlevel4data[0].css) : ''].join(' ')}>
                    {
                        (() => {
                            if (!this.props.showText && this.props.searchKeyWord.length >= minimumStringQueryLength) {
                                let list = this.state.showlevel4data.map((title, i) => {
                                    return (
                                        <span key={title.dataIndex}
                                            className={cx('item', { select: select === title.dataIndex })}
                                            dangerouslySetInnerHTML={{ __html: title.Newtxt }}
                                            onMouseDown={(e) => {
                                                this.onItemClick(title, title.dataIndex);
                                                this.props.whenSpanClick();
                                            }
                                            }
                                        >
                                        </span>
                                    );
                                });
                                if (this.state.showlevel4data.length > 0) {
                                    list.unshift(<span className="title" key={'title'}>{catalogue[3].icon && catalogue[3].icon}{catalogue[3].catalogueName}</span>);
                                }
                                return list;
                            }
                        })()
                    }
                </div>
                <div className={['section', this.state.showlevel5data ? (this.state.showlevel5data[0] && this.state.showlevel5data[0].css) : ''].join(' ')}>
                    {
                        (() => {
                            if (!this.props.showText && this.props.searchKeyWord.length >= minimumStringQueryLength) {
                                let list = this.state.showlevel5data.map((title, i) => {
                                    return (
                                        <span key={title.dataIndex}
                                            className={cx('item', { select: select === title.dataIndex })}
                                            dangerouslySetInnerHTML={{ __html: title.Newtxt }}
                                            onMouseDown={(e) => {
                                                this.onItemClick(title, title.dataIndex);
                                                this.props.whenSpanClick();
                                            }
                                            }
                                        >
                                        </span>
                                    );
                                });
                                if (this.state.showlevel5data.length > 0) {
                                    list.unshift(<span className="title" key={'title'}>{catalogue[4].icon && catalogue[4].icon}{catalogue[4].catalogueName}</span>);
                                }
                                return list;
                            }
                        })()
                    }
                </div>
                <div className={['section', this.state.showlevel6data ? (this.state.showlevel6data[0] && this.state.showlevel6data[0].css) : ''].join(' ')}>
                    {
                        (() => {
                            if (!this.props.showText && this.props.searchKeyWord.length >= minimumStringQueryLength) {
                                let list = this.state.showlevel6data.map((title, i) => {
                                    return (
                                        <span key={title.dataIndex}
                                            className={cx('item', { select: select === title.dataIndex })}
                                            dangerouslySetInnerHTML={{ __html: title.Newtxt }}
                                            onMouseDown={(e) => {
                                                this.onItemClick(title, title.dataIndex);
                                                this.props.whenSpanClick();
                                            }
                                            }
                                        >
                                        </span>
                                    );
                                });
                                if (this.state.showlevel6data.length > 0) {
                                    list.unshift(<span className="title" key={'title'}>{catalogue[5].icon && catalogue[5].icon}{catalogue[5].catalogueName}</span>);
                                }
                                return list;
                            }
                        })()
                    }
                </div>
                {
                    (!this.props.showText && this.props.searchKeyWord.length < this.props.minimumStringQueryLength) &&
                    <div className="noMatchText">
                        <button
                            onMouseDown={() => this.props.closeActcallback()}
                            className="close"
                        >x</button>
                        {this.props.minimumStringQuery}
                    </div>
                }
                {
                    (this.props.footer && !this.props.showText && this.props.searchKeyWord.length >= this.props.minimumStringQueryLength && this.state.secondData.length > 0) &&
                    <div className="foot">搜尋更多{'"' + this.props.searchKeyWord + '"'}的產品</div>
                }
            </div>
        );

        if (this.props.style === undefined) {
            return moduleHtml;
        }
        else{
            return (
                ReactDOM.createPortal(
                    moduleHtml, document.body
                )
            );
        }
        
    }
}
/**
 * Props default value write here
 */
Module.defaultProps = {
    prop: 'string'
};
/**
 * Typechecking with proptypes, is a place to define prop api. [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
 */
Module.propTypes = {
    prop: PropTypes.string.isRequired
};

export default Module;
