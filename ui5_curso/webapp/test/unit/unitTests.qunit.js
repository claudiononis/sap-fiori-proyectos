/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ui5/ui5_curso/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
