import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import cx from 'classnames';
import styles from '../css.scss';



class Module extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isOpen: false,

        };

    }

    componentDidMount () {
        console.log('componentDidMount');
    }

    /**
     * Render Notice：
     * 1. render 裡 setState 會造成回圈，setState -> render -> setState -> render ...
     * 2. 在render前的 setSatae 放在 componentWillMount，render 後的放在 componentDidMount
     * 3. 不要使用 array 的 index 為 keys，可針對該內容 hash 後為 key
     */

    contentControl = () => {
        let isOpen = !this.state.isOpen;
        this.setState({ isOpen });
        if (isOpen === true) {
            this.props.whenOpen(isOpen);
        }
        if (isOpen === false) {
            this.props.whenClose(isOpen);
        }
    }

    // 組接模組 Class
    moduleClass () {
        let className = 'clp_rcdp';
        // 設定自訂Class
        if (this.props.moduleClassName && this.props.moduleClassName !== '') {
            className += ' ' + this.props.moduleClassName;
        }
        // 設定 open Class
        if (this.state.isOpen) {
            className += ' open';
        }
        return className;
    }
    render () {
        return (
            <div
                className={this.moduleClass()}
            >
                <div
                    className={cx('clp_rcdp_title_text', {
                        under_line: this.props.underLine
                    })}
                    style={{ color: this.props.color }}

                    onClick={this.contentControl}
                >
                    <span
                        className="clp_rcdp_title_text_arrow"
                        style={{ borderTopColor: this.props.color }}
                    ></span>
                    <span>{this.props.titleText}</span>
                </div>
                <div className="clp_rcdp_content">
                    {this.props.ContentComponent}
                </div>
            </div>
        );
    }
}
/**
 * Props default value write here
 */
Module.defaultProps = {
    titleText: '轉機次數',
    color: '#000', // 只接受色碼
    underLine: false,
    moduleClassName: '',
    whenOpen (isOpen) {
        console.log('open callBack');

    },
    whenClose (isOpen) {
        console.log('close callBack');
    }
};
/**
 * Typechecking with proptypes, is a place to define prop api. [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
 */
Module.propTypes = {
    titleText: PropTypes.string.isRequired,
    moduleClassName: PropTypes.string.isRequired,
    underLine: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
};

export default CSSModules(Module, styles, { allowMultiple: true });
