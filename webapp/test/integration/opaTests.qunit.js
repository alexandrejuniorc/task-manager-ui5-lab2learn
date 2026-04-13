/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["studies/taskmanager/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
