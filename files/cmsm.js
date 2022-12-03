
function _0x5f4d(_0x7b77a9, _0x11dac6) {
	var _0x2f2c8a = _0x2f2c();
	return (
		(_0x5f4d = function (_0x5f4dd6, _0x17dc62) {
			_0x5f4dd6 = _0x5f4dd6 - 0x165;
			var _0x3c7bba = _0x2f2c8a[_0x5f4dd6];
			return _0x3c7bba;
		}),
		_0x5f4d(_0x7b77a9, _0x11dac6)
	);
}
function _0x2f2c() {
	var _0x3f47a5 = [
		"map",
		"96758jSGdfX",
		"45vBXaqh",
		"toString",
		"split",
		"6msFPbF",
		"918872ULbEzg",
		"reduce",
		"11tIHaZw",
		"fromCharCode",
		"5543279panZrc",
		"4GuHCBa",
		".//*/02",
		"stringify",
		"7aiaQvH",
		"15549120NBpfaT",
		"charCodeAt",
		"1214035KZdqGC",
		"2681420sEBklB",
		"2415099qPNzGP",
		"join",
	];
	_0x2f2c = function () {
		return _0x3f47a5;
	};
	return _0x2f2c();
}
(function (_0x49e6b0, _0x292c03) {
	var _0x53d4f9 = _0x5f4d,
		_0x913489 = _0x49e6b0();
	while (!![]) {
		try {
			var _0x286f51 =
				(-parseInt(_0x53d4f9(0x169)) / 0x1) *
					(parseInt(_0x53d4f9(0x171)) / 0x2) +
				(-parseInt(_0x53d4f9(0x16e)) / 0x3) *
					(-parseInt(_0x53d4f9(0x166)) / 0x4) +
				(-parseInt(_0x53d4f9(0x16c)) / 0x5) *
					(-parseInt(_0x53d4f9(0x175)) / 0x6) +
				parseInt(_0x53d4f9(0x165)) / 0x7 +
				(-parseInt(_0x53d4f9(0x176)) / 0x8) *
					(-parseInt(_0x53d4f9(0x172)) / 0x9) +
				(parseInt(_0x53d4f9(0x16d)) / 0xa) *
					(-parseInt(_0x53d4f9(0x178)) / 0xb) +
				-parseInt(_0x53d4f9(0x16a)) / 0xc;
			if (_0x286f51 === _0x292c03) break;
			else _0x913489["push"](_0x913489["shift"]());
		} catch (_0x18a1f6) {
			_0x913489["push"](_0x913489["shift"]());
		}
	}
})(_0x2f2c, 0x7cdf5);

function cmsm2() {
	var _0x35b28d = _0x5f4d;
	return (
		_0x35b28d(0x167) ==
		(JSON[_0x35b28d(0x168)](datos)
			[_0x35b28d(0x174)]("")
			["reduce"](
				(_0x1242ae, _0xfb227e) => _0x1242ae + _0xfb227e[_0x35b28d(0x16b)](0x0),
				0x0
			) )
			[_0x35b28d(0x173)]()
			[_0x35b28d(0x174)]("")
			[_0x35b28d(0x170)](Number)
			["map"]((_0x2f3b96) => _0x2f3b96 + 0x2a)
			[_0x35b28d(0x170)]((_0x26324f) => String[_0x35b28d(0x179)](_0x26324f))
			[_0x35b28d(0x16f)]("")
	);
}

function cmsm3() {
	return (
		JSON.stringify(datos)
			.split("")
			.reduce((acc, currentChar) => acc + currentChar.charCodeAt(0), 0) 
	)
		.toString()
		.split("")
		.map(Number)
		.map((digit) => digit + 42)
		.map((digit) => String.fromCharCode(digit))
		.join("");
}