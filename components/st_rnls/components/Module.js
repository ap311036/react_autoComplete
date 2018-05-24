import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import cx from 'classnames';
import styles from '../css.scss';

function getDomPosition (elem, property) {
    if (property === 'top') return elem.getBoundingClientRect()[property] + document.documentElement.scrollTop;
    return elem.getBoundingClientRect()[property];
}

class Module extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.isStillInContent = false; // 是否還在下方容器內
        this.showDOM = null;
    }

    componentDidMount () {
        this.forceUpdate();
    }
    componentDidUpdate (prevProps, prevState, snapshot) {

        if (prevState.isOpen === this.state.isOpen) return;

        if (this.state.isOpen) {
            this.props.whenOpen();
        } else {
            this.props.whenClose();
        }

    }
    // panel Open
    customContentOpenClick (e) {
        let isOpen =  true;
        this.setState({ isOpen });
    }
    // panel Close
    customContentCloseClick = (e) => {
        /*
            1.上方組件 onfocus 時打開panel
            2.onblur 關閉panel
                2-1.blur時若是 mouseDown(紀錄變數是否還在容器內 = ture)是在下方容器內就不關
                    ，mouseUp (紀錄變數是否還在容器內 = false)
                2-2.blur時是在外面就關閉
            3.click下方容器後若下方容器 blur時就呼叫關閉方法
        */
        if (this.isStillInContent === false && this.state.isOpen === true) {
            let isOpen = false;
            this.setState({ isOpen });
        }
        // input 或下方content區塊blur時，將紀錄還在下方狀態設false避免onMouseUp時不在下方區塊導致
        // 無法關閉panel
        this.isStillInContent = false;
    }

    handleMouseDown = () => {
        this.isStillInContent = true;
    }
    handleMouseUp = () => {
        this.isStillInContent = false;
    }

    _renderContent = () => {

        const styles = {
            width: this.props.width ? this.props.width : null
        };

        if (this.props.appendToBody) {

            const position = {
                'top': this.showDOM ? getDomPosition(this.showDOM, 'top') + getDomPosition(this.showDOM, 'height') : null,
                'left': this.showDOM ? getDomPosition(this.showDOM, 'left') : null
            };

            styles.top = position.top;
            styles.left = position.left;
            styles.position = 'absolute';
            styles.zIndex = '10';

            return ReactDOM.createPortal(this._rendeConten_inner(styles), document.body);
        } else {

            return this._rendeConten_inner(styles);

        }
    }

    _rendeConten_inner_class = () => {
        let classArr = ['st_rnls_descendant_content'];
        if (this.state.isOpen) {
            classArr.push('active');
        }
        if (this.props.innerComponentClass.length > 0) {
            classArr = [...classArr, ...this.props.innerComponentClass];
        }
        return classArr.join(' ');
    }
    _rendeConten_inner = (styles = null) => {

        return (
            <div
                className={this._rendeConten_inner_class()}
                tabIndex="-1"
                onBlur={this.customContentCloseClick}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                style={styles}
            >
                <div
                    className="st_rnls_descendant_content_close"
                    onClick={this.customContentCloseClick}
                >
                    &times;
                </div>
                <div>
                    {this.props.ContentComponent}
                </div>
            </div>
        );

    }

    /**
     * Render Notice：
     * 1. render 裡 setState 會造成回圈，setState -> render -> setState -> render ...
     * 2. 在render前的 setSatae 放在 componentWillMount，render 後的放在 componentDidMount
     * 3. 不要使用 array 的 index 為 keys，可針對該內容 hash 後為 key
     */



    render () {
        // 彈出視窗依附的模組，click 此組件會彈出視窗
        // this.props.CustomComponent;
        // 容器內component
        // this.props.ContentComponent

        const classes = cx('st_rnls', this.props.moduleClassName);

        return (
            <div className={classes}>

                <div
                    className="st_rnls_descendant_custom_content"
                    tabIndex="-1"
                    onFocus={e => this.customContentOpenClick(e)}
                    onBlur={this.customContentCloseClick}
                    ref={e => { this.showDOM = e }}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                >
                    {this.props.CustomComponent}
                </div>

                {this._renderContent()}

            </div>
        );
    }
}
/**
 * Props default value write here
 */
Module.defaultProps = {
    width: 'auto',
    moduleClassName: '',
    innerComponentClass: ['test'],
    whenOpen () {
        console.log('open callBack');

    },
    whenClose () {
        console.log('close callBack');
    }
};
/**
 * Typechecking with proptypes, is a place to define prop api. [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
 */
Module.propTypes = {
    width: PropTypes.string.isRequired,
    moduleClassName: PropTypes.string.isRequired,
    appendToBody: PropTypes.bool
};

export default CSSModules(Module, styles, { allowMultiple: true });
