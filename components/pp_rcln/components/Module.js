import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import cx from 'classnames';
import styles from '../css.scss';

// 取得目標 ele 的座標位置
function getDomPosition (elem, property) {
    if (property === 'top') return elem.getBoundingClientRect()[property] + document.documentElement.scrollTop ;
    return elem.getBoundingClientRect()[property];
}

class Module extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.isStillInContent = false; // 是否還在下方容器內
        // 外層預處理的Class
        this.moduleWrapClass = (() => {
            let className = 'pp_rcln';
            if (this.props.moduleClassName && this.props.moduleClassName !== '') {
                className += ' ' + this.props.moduleClassName;
            }
            return className;
        })();
        // 處理mouseleave close panel 計時的物件
        this.setTimeoutObj = null;
        //  hover 模式預防時間差在leave setTimeOut時又先執行enter時間到又執行 leave
        this.isHover = false;
        // 要讓浮動視窗依附的Dom物件
        this.customContentDom = null;
        // 事件綁定模式
        // 是否開啟hover模式
        this.hoverMode = this.props.events.some((item) => item === 'hover');
        // 是否開啟click模式
        this.clickMode = this.props.events.some((item) => item === 'click');
    }

    componentDidMount () {    
        this.forceUpdate();
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        // console.log('componentDidUpdate');
        // 當這次isOpen 與上次isOpen不一樣時代表才是真的 call open or close
        if (prevState.isOpen !== this.state.isOpen) {
            if (this.state.isOpen === true) {
                this.props.whenOpen();
            }
            if (this.state.isOpen === false) {
                this.props.whenClose();
            }
        }
    }

    // 內容打開 target == 上方自訂 trigger開啟元素
    customContentOpenClick (e, target = 'header') {
        let isOpen = true;
        this.setState({ isOpen });
    }
    // 內容關閉
    customContentCloseClick (e, target = 'header') {
        /*
            1.上方組件 onfocus 時打開panel
            2.onblur 關閉panel
                2-1.blur時若是 mouseDown(紀錄變數是否還在容器內 = ture)是在下方容器內就不關
                    ，mouseUp (紀錄變數是否還在容器內 = false)
                2-2.blur時是在外面就關閉
            3.click下方容器後若下方容器 blur時就呼叫關閉方法
        */
        // console.log('isCloseEventType', e.type);
        let closePanel = () => {
            // 已經不在下方內容
            let notStillInContent = this.isStillInContent === false;
            // 是否再開啟狀態
            let isStateOpen = this.state.isOpen === true;
            // 是否有Hover到header
            let isHover = this.isHover === false;
            // console.log('已經不在下方內容', notStillInContent);
            // console.log('是否再開啟狀態', isStateOpen);
            // console.log('是否有Hover到header', isHover);
            // console.log('this.isHover', this.isHover);

            if (notStillInContent && isStateOpen && isHover && this.state.isOpen === true) {
                let isOpen = false;
                this.isHover = false;
                this.setState({ isOpen });
            }
        };
        // hover 模式 在 header hover 打開 panel
        if (e.type === 'mouseleave' && target === 'header') {
            // 預防重覆計時，讓滑出在滑入時不會自動關閉
            if (this.setTimeoutObj) {
                clearTimeout(this.setTimeoutObj);
                this.setTimeoutObj = null;
            }
            const promiseState = new Promise((resolve, reject) => {
                this.setTimeoutObj = setTimeout(() => {
                    resolve();
                }, 300);
            });
            promiseState.then(() => closePanel());
        }
        // 其他 onblur 的情況
        else {
            closePanel();
        }
    }

    // 劃出彈跳泡泡視窗
    contentRenderComponent () {
        // 處理箭頭位置與泡泡框容器位置 css
        const styles = (() => {
            // 主要方向
            let mainDirection = (() => {
                let result = '';
                if (this.props.position.some(item => item === 'top')) {
                    result = 'top';
                }

                if (this.props.position.some(item => item === 'bottom')) {
                    result = 'bottom';
                }

                if (this.props.position.some(item => item === 'left')) {
                    result = 'left';
                }

                if (this.props.position.some(item => item === 'right')) {
                    result = 'right';
                }
                return result;
            })();
            // 附屬方向
            let subDirection = (() => {
                let result = '';
                if (this.props.position.some(item => item === 'horizon_left')) {
                    result = 'horizon_left';
                }

                if (this.props.position.some(item => item === 'horizon_center')) {
                    result = 'horizon_center';
                }

                if (this.props.position.some(item => item === 'horizon_right')) {
                    result = 'horizon_right';
                }

                if (this.props.position.some(item => item === 'vertical_top')) {
                    result = 'vertical_top';
                }

                if (this.props.position.some(item => item === 'vertical_center')) {
                    result = 'vertical_center';
                }

                if (this.props.position.some(item => item === 'vertical_bottom')) {
                    result = 'vertical_bottom';
                }
                return result;
            })();
            // 回傳主內容 Style
            let contentStyle = {
                position: 'absolute'
            };
            // 回傳 arrow Style
            let arrowStyle = {
                position: 'absolute'
            };
            // direction = 次要方向 ，contentStyle = 主內容style，arrowStyle = arrow的style
            let swtichSubDirection = (direction, contentStyle, arrowStyle) => {
                switch (direction) {
                    case 'horizon_left':
                        contentStyle.left = getDomPosition(this.customContentDom, 'left');
                        arrowStyle.left = '5px';
                        // arrowStyle.left = getDomPosition(this.customContentDom, 'width') / 6;
                        break;
                    case 'horizon_center':
                        contentStyle.left = (getDomPosition(this.customContentDom, 'left') + (getDomPosition(this.customContentDom, 'width') / 2)) - (getDomPosition(this.mainContentDom, 'width') / 2);
                        arrowStyle.left = '50%';
                        arrowStyle.transform = 'translateX(-50%)';
                        // arrowStyle.left = (getDomPosition(this.mainContentDom, 'width') / 2) - 10;
                        break;
                    case 'horizon_right':
                        contentStyle.left = (getDomPosition(this.customContentDom, 'left') + getDomPosition(this.customContentDom, 'width')) - getDomPosition(this.mainContentDom, 'width');
                        // arrowStyle.right = getDomPosition(this.customContentDom, 'width') / 6;
                        arrowStyle.right = '5px';
                        break;
                    case 'vertical_top':
                        contentStyle.top = getDomPosition(this.customContentDom, 'top');
                        arrowStyle.top = '5px';
                        // arrowStyle.top = getDomPosition(this.customContentDom, 'height') / 6;
                        break;
                    case 'vertical_center':
                        contentStyle.top  = (getDomPosition(this.customContentDom, 'top') + 
                                            (getDomPosition(this.customContentDom, 'height') / 2)) - 
                                            (getDomPosition(this.mainContentDom, 'height') / 2);
                        arrowStyle.top = '50%';
                        arrowStyle.transform = 'translateY(-50%)';
                        // arrowStyle.top = (getDomPosition(this.mainContentDom, 'height') / 2) - 10;
                        break;
                    case 'vertical_bottom':
                        contentStyle.top = (getDomPosition(this.customContentDom, 'top') + 
                                            getDomPosition(this.customContentDom, 'height')) - 
                                            getDomPosition(this.mainContentDom, 'height');
                        arrowStyle.bottom = '5px';
                        // arrowStyle.bottom = getDomPosition(this.customContentDom, 'height') / 6;
                        break;
                    default:
                        break;
                }
            };
            // 主要方向 position 處理
            switch (mainDirection) {
                case 'top':
                    // 目標 top - 容器 hight + 15 讓容器固定在上方
                    if (this.mainContentDom && this.customContentDom) {
                        this.mainContentDom.style.display = 'block';
                        contentStyle.top = getDomPosition(this.customContentDom, 'top') - getDomPosition(this.mainContentDom, 'height') - 15;
                        // 執行其他 position 設定
                        swtichSubDirection(subDirection, contentStyle, arrowStyle);
                        this.mainContentDom.style.removeProperty = 'display';
                    }
                    break;
                case 'bottom':
                    // 目標 top - 目標 hight + 10 讓容器固定在上方
                    if (this.mainContentDom && this.customContentDom) {
                        this.mainContentDom.style.display = 'block';
                        contentStyle.top = getDomPosition(this.customContentDom, 'top') + getDomPosition(this.customContentDom, 'height') + 10;
                        // 執行其他 position 設定
                        swtichSubDirection(subDirection, contentStyle, arrowStyle);
                        this.mainContentDom.style.removeProperty = 'display';
                    }
                    break;
                case 'left':
                    if (this.mainContentDom && this.customContentDom) {
                        this.mainContentDom.style.display = 'block';
                        contentStyle.left = getDomPosition(this.customContentDom, 'left') - getDomPosition(this.mainContentDom, 'width') - 12;
                        // 執行其他 position 設定
                        swtichSubDirection(subDirection, contentStyle, arrowStyle);
                        this.mainContentDom.style.removeProperty = 'display';
                    }
                    break;
                case 'right':
                    if (this.mainContentDom && this.customContentDom) {
                        this.mainContentDom.style.display = 'block';
                        contentStyle.left = getDomPosition(this.customContentDom, 'left') + getDomPosition(this.customContentDom, 'width') + 12;
                        // 執行其他 position 設定
                        swtichSubDirection(subDirection, contentStyle, arrowStyle);
                        this.mainContentDom.style.removeProperty = 'display';
                    }
                    break;
                default:
                    break;
            }
            return { contentStyle, arrowStyle};
        })();

        let ContentComponent = (props) => {
            return (
                <div
                    className={(() => {
                        let className = 'pp_rcln_main_content';
                        if (this.state.isOpen) {
                            className += ' open';
                        }
                        if (this.props.position && this.props.position !== '') {
                            className += ' ' + this.props.position.join(' ');
                        }
                        return className;
                    })()}
                    tabIndex="-1"
                    onBlur={e => {
                        if (this.clickMode) {
                            this.customContentCloseClick(e);
                        }
                    }}
                    onMouseDown={e => {
                        if (this.clickMode) {
                            this.isStillInContent = true;
                        }
                    }}
                    onMouseUp={e => {
                        if (this.clickMode) {
                            this.isStillInContent = false;
                        }
                    }}
                    onMouseEnter={e => {
                        if (this.hoverMode) {
                            this.isStillInContent = true;
                        }
                    }}
                    onMouseLeave={e => {
                        if (this.hoverMode) {
                            this.isStillInContent = false;
                            this.customContentCloseClick(e);
                        }
                    }}
                    style={Object.assign(
                        {}, 
                        { width: this.props.width }, 
                        { transform: `translate(${this.props.horizontalOffset},${this.props.verticalOffset })`}, styles.contentStyle
                    )}
                    ref={e => this.mainContentDom = e}
                >
                    {this.props.ContentComponent}
                    <div 
                        className={(() => {
                            let className = 'pp_rcln_main_content_arrow';
                            if (this.props.position && this.props.position !== '') {
                                className += ' ' + this.props.position.join(' ');
                            }
                            return className;
                        })()}
                        style={styles.arrowStyle}
                    >
                    </div>
                </div>
            );
        };
        return ReactDOM.createPortal(<ContentComponent />, document.body);
    }

    render () {
        return (
            <div className={this.moduleWrapClass}>
                <div
                    className={
                        cx('pp_rcln_custom_content', {
                            open: this.state.isOpen
                        })
                    }
                    tabIndex="-1"
                    onBlur={e => {
                        console.log('上方目標 onBlur');
                        if (this.clickMode) {
                            this.customContentCloseClick(e);
                        }
                    }}
                    onMouseUp={e => {
                        console.log('上方目標 onMouseUp');
                        if (this.clickMode) {
                            let isOpen = this.state.isOpen;
                            if (isOpen === true) {
                                this.isHover = false;
                                this.customContentCloseClick(e);
                            }
                            else {
                                this.customContentOpenClick(e);
                            }
                        }
                    }}
                    onMouseEnter={e => {
                        if (this.hoverMode) {
                            this.isHover = true;
                            this.customContentOpenClick(e, 'header');
                        }
                    }}
                    onMouseLeave={e => {
                        if (this.hoverMode) {
                            this.isHover = false;
                            this.customContentCloseClick(e, 'header');
                        }
                    }}
                    ref={e => { this.customContentDom = e }}
                >
                    {this.props.CustomComponent}
                </div>

                {this.contentRenderComponent()}

            </div>
        );
    }
}

/*
props 使用
// 選擇泡泡框用甚麼event開啟
events :接收參數
['click|hover']
// 開啟位置
position  :接收參數
['top|bottom','horizon_left|horizon_center|horizon_right'] or
['left|right','vertical_top|vertical_center|vertical_bottom']

// 水平位移
horizontalOffset :接收參數 string 結尾須加上單位 Ex: horizontalOffset: '3px'
// 垂直位移
verticalOffset  :接收參數 string 結尾須加上單位 Ex: verticalOffset: '3px'

// 限制泡泡框寬度
width :接收參數 string 結尾須加上單位 Ex: width: '3px'

// 可加入自訂class到模組最外層
moduleClassName :接收參數 string
*/
Module.defaultProps = {
    events: ['click'],
    position: ['bottom', 'horizon_left'],
    width: '200px',
    moduleClassName: '',
    horizontalOffset: '0px',
    verticalOffset: '0px',
    whenOpen () {
        console.log('開啟 callBack');
    },
    whenClose () {
        console.log('關閉 callBack');
    }
};
Module.propTypes = {
    events: PropTypes.array.isRequired,
    position: PropTypes.array.isRequired,
    width: PropTypes.string.isRequired,
    moduleClassName: PropTypes.string.isRequired,
    horizontalOffset: PropTypes.string.isRequired,
    verticalOffset: PropTypes.string.isRequired
};
/**
 * Render Notice：
 * 1. render 裡 setState 會造成回圈，setState -> render -> setState -> render ...
 * 2. 在render前的 setSatae 放在 componentWillMount，render 後的放在 componentDidMount
 * 3. 不要使用 array 的 index 為 keys，可針對該內容 hash 後為 key
 */
export default CSSModules(Module, styles, { allowMultiple: true });
