/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"tp2/comparar/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
