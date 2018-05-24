import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import Styles from '../css.scss';

const Day = (props) => {
    let className = 'date'
    let AstartDate = new Date(props.AstartDate[0], props.AstartDate[1] - 1, props.AstartDate[2]);
    let isDisabled = () => {
        return props.date < AstartDate || props.date > props.endDate
    }
    if (!!props.date) {
        if (props.selectedStart && props.selectedStart.getTime() == props.date.getTime()) {
            className += ' start'
        } else if (props.selectedEnd && props.selectedEnd.getTime() == props.date.getTime()) {
            className += ' end'
        } else if (props.selectedStart && props.selectedStart < props.date && props.selectedEnd && props.selectedEnd > props.date) {
            className += ' between'
        }
        if (isDisabled()) {
            className += ' disabled'
        }
    }
    return (
        <td className={className}>
            { !!props.date
                ? ( !isDisabled() ? 
                <span onClick={(e) => props.handleClickDate(e, props.date)}>{props.date.getDate()}</span>
                : <span>{props.date.getDate()}</span> )
                : <span></span> }
        </td>
    )
}

const Week = (props) => {
    return (
        <tr>
            {((startDate) => {
                let week = [];
                let currDate = startDate;
                let isBeforeEndDate = (date) => {
                    return !props.renderEnd ? true : date < props.renderEnd;
                };
                for (let day = 0; day < 7; day++) {
                    if (day >= startDate.getDay() && currDate.getMonth() == startDate.getMonth() && isBeforeEndDate(currDate)) {
                        week.push(
                            <Day AstartDate={props.AstartDate} endDate={props.endDate} startDate={startDate} selectedStart={props.selectedStart} selectedEnd={props.selectedEnd} handleClickDate={props.handleClickDate} date={currDate} key={day + 1}></Day>
                        );
                        currDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 1);
                    } else {
                        week.push(
                            <Day AstartDate={props.AstartDate} endDate={props.endDate} startDate={startDate} selectedStart={props.selectedStart} selectedEnd={props.selectedEnd} handleClickDate={props.handleClickDate} key={day + 1}></Day>
                        );
                    }
                }
                return week;
            })(props.startDate)}
        </tr>
    )
}

const Labels = (props) => {
    return (
        <div className="labelBox">
            <div className={'label' + (props.selecting == 0 ? ' active' : '')}>
                <p>{props.startLabelText}</p>
                <span>{props.selectedStart && props.dateFormat(props.selectedStart)}</span>
            </div>
            {!props.singleSelectMode && <div className="middle"> ~ </div>}
            {!props.singleSelectMode &&
                <div className={'label' + (props.selecting == 1 ? ' active' : '')}>
                    <p>{props.endLabelText}</p>
                    <span>{props.selectedEnd && props.dateFormat(props.selectedEnd)}</span>
                </div>}
            {(props.haveAmountLabel == 'day' || props.haveAmountLabel == 'night') &&
                <div className="label amount">
                    <span>
                        共 {props.selectedEnd != '' ? (props.haveAmountLabel == 'day'
                            ? props.dateCompare(props.selectedStart, props.selectedEnd)
                            : props.dateCompare(props.selectedStart, props.selectedEnd) - 1)
                            : '0'} {props.haveAmountLabel == 'day'
                                ? '天'
                                : '晚'}
                    </span>
                </div>}

        </div>
    )
}

class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {
                start: this.convertToDate(this.props.selectedStartDate),
                end: this.convertToDate(this.props.selectedEndDate)
            },
            selecting: 0,
            nowSelect: 0
        }
        this.handleClickDate = this.handleClickDate.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.dateCompare = this.dateCompare.bind(this);
    }
    
	UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps);
        if (this.props.selectedStartDate !== nextProps.selectedStartDate || this.props.selectedEndDate !== nextProps.selectedEndDate) {
            this.setState({
                selected: {
                    start: this.convertToDate(nextProps.selectedStartDate),
                    end: this.convertToDate(nextProps.selectedEndDate)
                }
            });
        }
	}
    dateCompare(start, end) {
        start = !start ? new Date() : start;
        end = !end ? new Date() : end;
        return Math.abs((end - start) / 1000 / 60 / 60 / 24);
    }
    dateFormat(date, format) {
        format = !!format ? format : 'YYYY/MM/DD';
        return format.toLowerCase()
            .replace('yyyy', date.getFullYear())
            .replace('mm', date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
            .replace('dd', date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    }
    convertToDate(date) {
        date = !date ? [] : date.split('/');
        return date.length > 0 ? new Date(date[0], date[1]-1, date[2]) : '';

    }
    handleClickDate(e, date) {
        let nextState = this.state.selecting == 0
        ? {
            selected: {
                start: date,
                end: ''
            },
            selecting: this.props.singleSelectMode ? 0 : 1
        }
        : {
            selected: {
                start: this.state.selected.start > date ? date : this.state.selected.start,
                end: this.state.selected.start > date ? this.state.selected.start : date
            },
            selecting: 0
        };
        let start = !!nextState.selected.start ? this.dateFormat(nextState.selected.start) : ''
        let end = !!nextState.selected.end ? this.dateFormat(nextState.selected.end) : ''
        
        this.setState((prevState, props) => {
            // nextState = this.state.selecting == 0
            // ? {
            //     selected: {
            //         start: date,
            //         end: ''
            //     },
            //     selecting: props.singleSelectMode ? 0 : 1
            // }
            // : {
            //     selected: {
            //         start: prevState.selected.start > date ? date : prevState.selected.start,
            //         end: prevState.selected.start > date ? prevState.selected.start : date
            //     },
            //     selecting: 0
            // };
            return nextState;
        });

        !!this.props.onClickDate && ( this.props.singleSelectMode ? this.props.onClickDate(start) : this.props.onClickDate(start, end) );
    }
    render() {
         window.FORCE = this.forceUpdate.bind(this);
        const Weekday = (
            <div className='weekdayName'>
                <ul>
                    <li className='txtRed'><span>日</span></li>
                    <li><span>一</span></li>
                    <li><span>二</span></li>
                    <li><span>三</span></li>
                    <li><span>四</span></li>
                    <li><span>五</span></li>
                    <li className='txtRed'><span>六</span></li>
                </ul>
            </div>
        );
        
        let startDate = this.props.startDate.split('/');
        let endDate = this.props.endDate.split('/');
        let renderStart = !!this.props.renderStartDate ? this.props.renderStartDate.split('/') : [startDate[0], startDate[1], '1'];
        let renderEnd = !!this.props.renderStartDate ? this.props.renderEndDate.split('/') : '';
        let selectedStart = this.state.selected.start;
        let selectedEnd = this.state.selected.end;
        
        startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
        endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);
        renderStart = new Date(renderStart[0], renderStart[1] - 1, renderStart[2]);
        renderEnd = !!renderEnd ? new Date(renderEnd[0], renderEnd[1] - 1, renderEnd[2]) : renderEnd;
        
        return (
            <div styleName="cy_rcmb" className={this.props.className}>
                
                {
                    this.props.haveLabelBox && 
                    <Labels 
                        selectedStart={selectedStart} 
                        dateFormat={this.dateFormat}
                        startLabelText={this.props.startLabelText}
                        singleSelectMode={this.props.singleSelectMode}
                        haveAmountLabel={this.props.haveAmountLabel}
                        selectedEnd={selectedEnd}
                        selecting={this.state.selecting}
                        endLabelText={this.props.endLabelText}
                        dateCompare={this.dateCompare}
                    /> 
                }
                {Weekday}
                <div className='dateBox'>
                    {(() => {
                        let months = [];
                        let currMonthStartDate = renderStart;
                        let end = !!renderEnd ? renderEnd : endDate;
                        while (currMonthStartDate < end) {
                            months.push(
                                <table key={currMonthStartDate.getMonth()}>
                                    <thead>
                                        <tr>
                                            <th className='yearMonth' colSpan='7'>{currMonthStartDate.getFullYear()} 年 {currMonthStartDate.getMonth() + 1} 月</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ((monthStartDate) => {
                                            let month = []; 
                                            let currWeekStartDate = monthStartDate;
                                            while (currWeekStartDate.getMonth() == monthStartDate.getMonth()) {
                                                month.push(
                                                    <Week endDate={endDate} renderEnd={renderEnd} selectedStart={selectedStart} selectedEnd={selectedEnd} handleClickDate={this.handleClickDate} key={month.length + 1} startDate={currWeekStartDate} AstartDate={this.props.startDate.split('/')}></Week>
                                                )
                                                currWeekStartDate = new Date(currWeekStartDate.getFullYear(), currWeekStartDate.getMonth(), currWeekStartDate.getDate() - currWeekStartDate.getDay() + 7);
                                            }
                                            return month;
                                            })(currMonthStartDate)
                                        }
                                    </tbody>
                                </table>
                                )
                                currMonthStartDate = new Date(currMonthStartDate.getFullYear(), currMonthStartDate.getMonth() + 1, 1);
                            }
                            return months;
                        })()}
                </div>
            </div>
        );
    }
}
// Props default value write here
Module.defaultProps = {
    className: '',
    startDate: '', // 月曆的可選起始日期 
    endDate: '', // 月曆的可選結束日期
    renderStartDate: '', // 月曆的起始日期, 若為''則月曆會以startDate日期當月的第一天為起始日期
    renderEndDate: '', // 月曆的結束日期, 若為''則月曆會以endDate日期當月的最後一天為結束日期
    selectedStartDate: '',
    selectedEndDate: '', 
    maxSelectedDays: -1,
    singleSelectMode: false, // true為選擇單日模式, false為選擇區間模式
    haveLabelBox: true,
    haveAmountLabel: '', // ''為不顯示選擇日期數欄位, 'day'為顯示共幾天, 'night'為顯示共幾晚
    labelClickMode: false,
    startLabelText: '去程日期',
    endLabelText: '回程日期',
    onClickDate: function () {},
    onChange: function () {}
}
// Typechecking with proptypes, is a place to define prop api
Module.propTypes = {
    className: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    clickableStartDate: PropTypes.string,
    clickableEndDate: PropTypes.string,
    selectedStartDate: PropTypes.string,
    selectedEndDate: PropTypes.string,
    maxSelectedDays: PropTypes.number,
    singleSelectMode: PropTypes.bool,
    haveLabelBox: PropTypes.bool,
    haveAmountLabel: PropTypes.string,
    labelClickMode: PropTypes.bool,
    startLabelText: PropTypes.string,
    endLabelText: PropTypes.string,
    onClickDate: PropTypes.func,
    onChange: PropTypes.func
};

export default CSSModules(Module, Styles, {allowMultiple: true});

