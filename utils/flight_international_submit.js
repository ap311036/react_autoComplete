import { toQueryString } from './utils';

// 把航段物件轉成需要的字串
function parseSeekObj (seek, targetCode) {
    let txt = seek.selectedData[0].txt;
    let result = txt.match(/[A-Z]+(?=\))/g);
    switch (targetCode) {
        case 'country':
            return result[0];
        case 'city':
            return result[1];
        default:
            return result[0];
    }
}

// 把replacedStr字串轉換成newStr字串
function convertStr (str, replacedStr, newStr) {
    let reg = new RegExp(replacedStr, 'ig');
    let newS = str.replace(reg, newStr);
    return newS;
}

// 判斷此筆航段是否有空值得欄位
function dataChecking (seek, originfailedText, checkBackDate = false) {
    let failedText = originfailedText;
    if (seek.departure.showText === '' && failedText.indexOf('出發地') === -1) failedText += '、出發地';
    if (seek.arrive.showText === '' && failedText.indexOf('目的地') === -1) failedText += '、目的地';
    if (seek.departureDate === '' && failedText.indexOf('去程日期') === -1) failedText += '、去程日期';
    if (seek.backDate === '' && checkBackDate) failedText += '、回程日期';
    return failedText;
}

// 資料驗證
function beforeSubmit () {
    const {
        Rtow,
        seek1,
        seek2,
        addedSeekSection
    } = this.state;

    let failedText = '請輸入/選擇:';

    switch (Rtow) {
        case 0:
            // 檢查seek1
            failedText = dataChecking(seek1, failedText);
            break;
        case 1:
            // 檢查seek1
            failedText = dataChecking(seek1, failedText, true);
            break;
        case 3:
            // 檢查seek1, seek2, addedSekSection
            failedText = dataChecking(seek1, failedText);
            failedText = dataChecking(seek2, failedText);
            for (let i = 0, seek; seek = addedSeekSection[i]; i++) {
                failedText = dataChecking(seek, failedText);
            }
            break;
    }

    failedText = failedText.replace(/請輸入\/選擇:、/, '請輸入/選擇:');

    if (failedText.length > 7) {
        return failedText;
    }

    return null;
}

export default function handleSubmit () {
    const {
        Rtow,
        ClsType,
        Adt,
        Chd,
        Inf,
        NoTrans,
        HaveSeat,
        NonPreferTrans,
        NonPreferTransNight,
        SourceSystem,
        seek1,
        seek2,
        addedSeekSection
    } = this.state;

    // 檢查資料是否有錯，若有，回傳錯誤字串
    let verifyOK = beforeSubmit.call(this);
    if (verifyOK) {
        // 如果拿到錯誤字串, alert
        alert(verifyOK);
        return;
    }

    const seek1DepCity1 = parseSeekObj(seek1.departure, 'city');
    const seek1DepCountry1 = parseSeekObj(seek1.departure, 'country');
    const seek1ArrCity1 = parseSeekObj(seek1.arrive, 'city');
    const seek1ArrCountry1 = parseSeekObj(seek1.arrive, 'country');
    let SubmitObj = {
        Rtow,
        ClsType,
        Adt,
        Chd,
        Inf,
        NoTrans,
        HaveSeat,
        NonPreferTransNight,
        SourceSystem,
        DepCity1: seek1DepCity1,
        DepCountry1: seek1DepCountry1,
        ArrCity1: seek1ArrCity1,
        ArrCountry1: seek1ArrCountry1,
        DepDate1: convertStr(seek1.departureDate, '/', '-')
    };

    switch (Rtow) {
        case 1:
            // 回程航段就等於是第一筆航段的交換
            SubmitObj.DepCity2 = seek1ArrCity1;
            SubmitObj.DepCountry2 = seek1ArrCountry1;
            SubmitObj.ArrCity2 = seek1DepCity1;
            SubmitObj.ArrCountry2 = seek1DepCountry1;
            SubmitObj.DepDate2 = convertStr(seek1.backDate, '/', '-');
            break;
        case 3:
            // 多航段參數收集
            SubmitObj.DepCity2 = parseSeekObj(seek2.departure, 'city');
            SubmitObj.DepCountry2 = parseSeekObj(seek2.departure, 'country');
            SubmitObj.ArrCity2 = parseSeekObj(seek2.arrive, 'city');
            SubmitObj.ArrCountry2 = parseSeekObj(seek2.arrive, 'country');
            SubmitObj.DepDate2 = convertStr(seek2.departureDate, '/', '-');

            for (let i = 0; i < addedSeekSection.length; i++) {
                SubmitObj['DepCity' + (i + 3)] = parseSeekObj(addedSeekSection[i].departure, 'city');
                SubmitObj['DepCountry' + (i + 3)] = parseSeekObj(addedSeekSection[i].departure, 'country');
                SubmitObj['ArrCity' + (i + 3)] = parseSeekObj(addedSeekSection[i].arrive, 'city');
                SubmitObj['ArrCountry' + (i + 3)] = parseSeekObj(addedSeekSection[i].arrive, 'country');
                SubmitObj['DepDate' + (i + 3)] = convertStr(addedSeekSection[i].departureDate, '/', '-');
            }

            break;
    }

    // 如果有填排除轉機國家
    if (NonPreferTrans.length > 0) {
        let text = NonPreferTrans[0].txt.match(/\w+(?=\))/g);
        SubmitObj.NonPreferTrans = text[0];
    }

    console.log('SubmitObj', SubmitObj);

    let Query = toQueryString(SubmitObj);

    console.log(Query);
}

