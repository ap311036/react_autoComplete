import React from 'react';
import ReactDOM from 'react-dom';
import CyRcmb from './components/Module.js';
import '../core/core.scss';

ReactDOM.render(
	<div className="row">
		<div className="col-md-8">
			<h3>style: default</h3>
			<CyRcmb
				startDate="2018/01/08"
				endDate="2018/04/25"
				renderStartDate="2018/01/05"
				renderEndDate="2018/05/25"
			></CyRcmb>
		</div>
		<div className="col-md-8">
			<h3>style: default</h3>
			<CyRcmb
				startDate="2018/04/15"
				endDate="2018/09/18"
				selectedStartDate="2018/04/20"
				selectedEndDate="2018/04/25"
				startLabelText= '入住日期'
				endLabelText= '退房日期'
				haveAmountLabel='day'
				onClickDate={(start, end) => {
					console.log(start, end)
				}}
			></CyRcmb>
		</div>
		<div className="col-md-8">
			<h3>style: default</h3>
			<CyRcmb
				startDate="2018/09/08"
				endDate="2019/04/25"
				haveLabelBox={false}
				singleSelectMode={true}
			></CyRcmb>
		</div>
	</div>,
	document.getElementById('root')
);