import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import cx from 'classnames';
import styles from '../css.scss';

class Module extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        let classes = cx('nvb_rslb', this.props.className, this.props.visible ? 'active' : null, {});
        let divStyle = {
            width: this.props.width,
        };
        return ReactDOM.createPortal(
            <div
                className={classes}
                style={divStyle}
                direction={this.props.direction}
            >
                {this.props.ContentComponent}
            </div>
            , document.body);
    }
}
Module.defaultProps = {
    direction: ['left', 'right'],
    width: '100%',
};

Module.propTypes = {
    className: PropTypes.string.isRequired,
    direction: PropTypes.array.isRequired,
    width: PropTypes.string,
    visible: PropTypes.bool,
};

export default Module;
