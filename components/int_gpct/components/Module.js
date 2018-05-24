import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import cx from 'classnames';
import styles from '../css.scss';
import IcRcln from '../../ic_rcln';
import IntRcln from '../../int_rcln';
import BtRcnb from '../../bt_rcnb';

class Module extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            count: this.props.count < this.props.min ? this.props.min : this.props.count
        };
        this.handleClick = this.handleClick.bind(this);
        this.afterClick = this.props.afterClick;
        this.handleChange = this.handleChange.bind(this);
        this.min = this.props.min;
        this.max = this.props.max;
    }

    /* life cycle */
    // Mounting
    // componentWillMount() {
    // 	console.log('父親componentWillMount');
    // }
    // componentDidMount() {
    // 	console.log('componentDidMount');
    // }

    // Updating
    // componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps');
    // }

    // shouldComponentUpdate(nextProps, nextState){
    // }

    // componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate', this.state, nextState);
    // }
    componentDidUpdate (nextProps, nextState) {
        let returnVal = nextState > this.props.max ? this.props.max : this.state.count;
        returnVal = nextState < this.props.min ? this.props.btnClassMinus : this.state.count;
        (this.state != nextState) && (!!this.props.afterClick && typeof this.props.afterClick === 'function') && this.props.afterClick(returnVal);
    }
    handleClick (e) {
        // console.log('handleClick');
        let newNum;
        if (e.target.classList.contains('add')) {
            if (this.state.count < this.props.max) {
                newNum = this.state.count + 1;
                this.setState({
                    count: this.state.count + 1
                });
            } else if (this.state.count >= this.props.max) {
                // console.log('counter number larger than max number');
                newNum = this.props.max;
                this.setState({
                    count: this.props.max
                });
            }
        } else if (e.target.classList.contains('minus')) {
            if (this.state.count > this.props.min) {
                newNum = this.state.count - 1;
                this.setState({
                    count: this.state.count - 1
                });
            } else if (this.state.count <= this.props.min) {
                newNum = this.props.min;
                this.setState({
                    count: this.props.min
                });
            }
        }
        this.props.onChange && this.props.onChange(this.state.count, newNum);
        // this.setState({
        //     count: newNum
        // });
    }
    handleChange (e, data) {
        let nowNum = data;
        let Num = Number(nowNum);
        // console.log(isNaN(Num))
        let newNum;
        if (isNaN(Num) === false) { // 輸入的值不等於NaN
            if (Num >= this.max) { // 輸入的值大於最大值
                newNum = this.max;
            } else if (Num < this.max) { // 輸入的值小於最大值
                newNum = Num;
            } else if (Num < this.min) { // 輸入的值小於最小值
                newNum = this.min;
            } else if (Num === 0) { // 輸入空白
                newNum = this.state.count;
            }
        } else if (isNaN(Num)) {
            newNum = this.state.count < this.min ? this.min : this.state.count;
        }
        this.props.onChange && this.props.onChange(this.state.count, newNum);
        this.setState({
            count: newNum
        });
    }

    // Unmounting
    // componentWillUnmount(nextProps, nextState) {
    // console.log('componentWillUnmount');
    // }

    render () {
        const moduleClass = cx('int_gpct', {
            xin: this.props.xin,
            'xin-circle': this.props['xin-circle'],
            'label-unit': this.props['label-unit']
        });
        let minusBtnClass = cx('minus', this.props.btnClassMinus, {
            disabled: this.state.count <= this.props.min
        });
        let addBtnClass = cx('add', this.props.btnClassAdd, {
            disabled: this.state.count >= this.props.max
        });


        const {
            keyin,
            label,
            className,
            id
        } = this.props;

        const {
            count
        } = this.state;


        return (
            <div styleName={moduleClass} id={id} className={className}>
                <BtRcnb prop="string" whenClick={this.handleClick} className={minusBtnClass} ></BtRcnb>
                <IntRcln styleName="amount"
                    label={label}
                    value={count}
                    readOnly={keyin}
                    onChange={this.handleChange}
                />
                <BtRcnb prop="string" whenClick={this.handleClick} className={addBtnClass}></BtRcnb>
            </div>
        );
    }
}
// Props default value write here
Module.defaultProps = {
    className: '',
    max: 10,
    min: 0,
    keyin: true,
    label: '',
    count: 0,
    whenClick: function ($dom) {},
    beforeChangeFun: function ($dom) {}
};

// Typechecking with proptypes, is a place to define prop api
Module.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    max: PropTypes.number,
    min: PropTypes.number,
    keyin: PropTypes.bool,
    label: PropTypes.string,
    count: PropTypes.number,
    whenClick: PropTypes.func.isRequired,
    beforeChangeFun: PropTypes.func.isRequired
};

export default CSSModules(Module, styles, {	allowMultiple: true });
