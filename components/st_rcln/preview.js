import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StRcln from './components/Module.js';
import IcRcln from '../ic_rcln/components/Module';

import '../core/core.scss';

const options = [
    { text: '數字1', value: 1 },
    { text: '數字2', value: 2 },
    { text: '數字3', value: 3 },
    { text: '數字7', value: 7 },
    { text: '數字9', value: 9 }
];
const Country = [
    { text: '不限', value: 0 },
    { text: '德國', value: 1 },
    { text: '蘇門答臘', value: 2 },
    { text: '俄羅斯', value: 3 },
    { text: '捷克', value: 4 },
    { text: '匈牙利', value: 5 },
    { text: '愛爾蘭', value: 6 },
    { text: '阿爾巴尼亞', value: 7 },
    { text: '芬蘭', value: 8 },
    { text: '克羅埃西亞', value: 9 },
    { text: '挪威', value: 10 },
    { text: '羅馬尼亞', value: 11 },
];
const level = [
    { text: '經濟艙', value: 'd' },
    { text: '商務艙', value: 'e' },
    { text: '頭等艙', value: 'f' },
    { text: '一等艙', value: 'g' },
    { text: '二等艙', value: 'h' },
];
const longOption = (() => {
    const arr = [];
    for (let i = 1; i <= 50; i++) {
        const obj = {};
        obj['text'] = `數字${i}`;
        obj['value'] = `${i}`;
        arr.push(obj);
    }
    return arr;
})();

ReactDOM.render(
    <div>
        <h3>Demo</h3>
        <StRcln option={options} onBlurCallBack={() => console.log('父層onBlurCallBack')} ClassName="d-no" success></StRcln>
        <h3>有輸入placeholder</h3>
        <StRcln option={Country} placeholder="目的地" onChangeCallBack={() => console.log('父層onChangeCallBack')} error></StRcln>
        <h3>被disable的style</h3>
        <StRcln option={level} placeholder="被disable" disabled></StRcln>
        <h3>有label的style</h3>
        <StRcln option={level} placeholder="請選擇" label="艙等" whenClick={() => console.log('父層whenClick')}></StRcln>
        <h3>有label的style</h3>
        <StRcln option={longOption} placeholder="請選擇" label="出發地" req whenCloseCallBack={() => console.log('父層whenCloseCallBack')}></StRcln>
        <h3>label與placeholder中間換行的style</h3>
        <StRcln option={options} placeholder="請選擇" label="出發地" req breakline whenFocus={() => console.log('父層whenFocus')} defaultValue={7}></StRcln>
        <h3>加上icon且換行的style</h3>
        <StRcln option={options} placeholder="請選擇" label="旅遊主題" icon={<IcRcln name="planetaxf" />} req breakline whenMouseDown={() => console.log('父層whenMouseDown')}></StRcln>
        <h3>可輸入文字</h3>
        <StRcln option={level} placeholder="請選擇" label="旅遊主題" contentEditable whenOpenCallBack={() => console.log('父層whenOpenCallBack')}></StRcln>
    </div>,
    document.getElementById('root')
);