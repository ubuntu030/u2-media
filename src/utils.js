
export const convert_time = duration => {
	var a = duration.match(/\d+/g);
	if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
		a = [0, a[0], 0];
	}
	if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
		a = [a[0], 0, a[1]];
	}
	if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
		a = [a[0], 0, 0];
	}
	duration = 0;
	if (a.length == 3) {
		duration = duration + parseInt(a[0]) * 3600;
		duration = duration + parseInt(a[1]) * 60;
		duration = duration + parseInt(a[2]);
	}
	if (a.length == 2) {
		duration = duration + parseInt(a[0]) * 60;
		duration = duration + parseInt(a[1]);
	}
	if (a.length == 1) {
		duration = duration + parseInt(a[0]);
	}
	return duration
}

export function timeFormat(sec) {
	const time = Math.round(sec);
	let minutes = Math.floor(time / 60);
	minutes = timeNumPrcs(minutes);
	let seconds = time - minutes * 60;
	seconds = timeNumPrcs(seconds);
	return { frmtTime: minutes + ':' + seconds, rndSec: time };
}

export function timeNumPrcs(num = 0) {
	num = num + '';
	return num = (num.length > 1) ? num : '0' + num;
}