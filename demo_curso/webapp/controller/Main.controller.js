sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demoname.democurso.controller.Main", {
            onInit: function () {

            },
             holaMundo: function () {

                var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                var sName = this.getView().getModel("nombre").getProperty("/data/nombre");
                var sText = oBundle.getText("msg", [sName]);

                MessageToast.show(sText);
            }
        });
    });



