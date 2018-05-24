import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IntGpct from './index.js';
import '../core/core.scss';
import IcRcln from '../ic_rcln/css.scss';

class Preview extends Component {
    constructor (props) {
        super(props);
        this.maxSum = 7;
        this.state = {
            adultObj: {
                min: 1,
                max: 7,
                count: 1
            },
            childObj: {
                min: 0,
                max: 7,
                count: 0
            },
            babyObj: {
                min: 0,
                max: 1,
                count: 0
            }
        };
        this.adultNum = this.state.adultObj.count;
        this.childNum = this.state.childObj.count;
        this.babyNum = this.state.babyObj.count;
    }
    renderState () {
        let adultNum = this.adultNum,
            childNum = this.childNum,
            babyNum = this.babyNum;

            adultNum < this.state.babyObj.max ? this.state.babyObj.max = adultNum : '';
        this.setState({
            adultObj: {
                min: 1,
                max: this.maxSum - childNum - babyNum,
                count: adultNum
            },
            childObj: {
                min: 0,
                max: this.maxSum - adultNum - babyNum,
                count: childNum
            },
            babyObj: {
                min: 0,
                max: (childNum + adultNum * 2 <= this.maxSum) || (adultNum < this.state.babyObj.max) ? adultNum : this.maxSum - adultNum - childNum,
                count: adultNum < this.state.babyObj.max ? adultNum : babyNum
            }
        });
        // console.log("adultNum: ", adultNum, "childNum: ", childNum, "babyNum: ", babyNum, "babyMax: ", this.state.babyObj.max, this.state)
    }
    returnAdultState (currentCount) {
        console.log('currentCount', currentCount);
        this.adultNum = currentCount;
        this.renderState();
    }
    returnChildState (currentCount) {
        console.log('currentCount', currentCount);
        this.childNum = currentCount;
        this.renderState();
    }
    returnBabyState (currentCount) {
        console.log('currentCount', currentCount);
        this.babyNum = currentCount;
        this.renderState();
    }
    render () {
        return (
            <div>
                <h3>Style: default</h3>
                <div>
                    <IntGpct
                        max={10}
                        min={1}
                        count={1}
                        keyin={false}
                        btnClassMinus="ic_rcln toolcancelb"
                        btnClassAdd="ic_rcln tooladdb"
                        onChange={(prevValue, Val) => console.log(prevValue, Val)}
                    ></IntGpct>
                </div>
                <h3>Style: default label-unit</h3>
                <div>
                    <IntGpct
                        className="hihi"
                        label-unit
                        max={10}
                        min={0}
                        count={0}
                        keyin={false}
                        label="位"
                        onChange={(prevValue, Val) => console.log(prevValue, Val)}
                        btnClassMinus="ic_rcln toolcancelb"
                        btnClassAdd="ic_rcln tooladdb"
                    ></IntGpct>
                </div>
                <h3>Style: xin</h3>
                <div>
                    <div>
                        <h4>成人</h4>
                        <IntGpct
                            id="test1"
                            xin
                            max={this.state.adultObj.max}
                            min={this.state.adultObj.min}
                            count={this.state.adultObj.count}
                            btnClassMinus="ic_rcln toolcancelb"
                            btnClassAdd="ic_rcln tooladdb"
                            afterClick={this.returnAdultState.bind(this)}
                        ></IntGpct>
                    </div>
                    <div>
                        <h4>兒童</h4>
                        <IntGpct
                            xin
                            max={this.state.childObj.max}
                            min={this.state.childObj.min}
                            count={this.state.childObj.count}
                            btnClassMinus="ic_rcln toolcancelb"
                            btnClassAdd="ic_rcln tooladdb"
                            afterClick={this.returnChildState.bind(this)}
                        ></IntGpct>
                    </div>
                    <div>
                        <h4>嬰兒</h4>
                        <IntGpct
                            xin
                            max={this.state.babyObj.max}
                            min={this.state.babyObj.min}
                            count={this.state.babyObj.count}
                            btnClassMinus="ic_rcln toolcancelb"
                            btnClassAdd="ic_rcln tooladdb"
                            afterClick={this.returnBabyState.bind(this)}
                        ></IntGpct>
                    </div>
                </div>
                <h3>Style: xin-circle</h3>
                <div>
                    <IntGpct
                        xin-circle
                        btnClassMinus="ic_rcln toolcancelbf"
                        btnClassAdd="ic_rcln tooladdbf"
                    ></IntGpct>
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <Preview />,
    document.getElementById('root')
);