/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"claudio/tp_practico/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
