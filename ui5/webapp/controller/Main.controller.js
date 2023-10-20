sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5curso/ui5/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,models) {
        "use strict";
        function _onObjectMatch(oEvent) {    
            
            sap.ui.getCore().getModel("top").setProperty("/usuario", '');
            sap.ui.getCore().getModel("top").setProperty("/contrasena", '');
            sap.ui.getCore().getModel("top").setProperty("/tipo", '');
            }
        return Controller.extend("ui5curso.ui5.controller.Main", {
            onInit: function () {
                sap.ui.getCore().setModel(models.createVarGlobales(), "top");               
               //  this.oModelo=sap.ui.getCore().getModel("top");
            },

            onIniciarSesion: function() {
                // leo los valores ingresados
                var usuario = this.getView().byId("usuarioInput").getValue();
                var contrasena = this.getView().byId("contrasenaInput").getValue();
                var errorLabel = this.getView().byId("errorLabel");
                // Seteo variables globales
                sap.ui.getCore().getModel("top").setProperty("/usuario", usuario);
                sap.ui.getCore().getModel("top").setProperty("/contrasena", contrasena);
                
                errorLabel.setVisible(false);
                // Consulto BD 
                var oModel = this.getView().getModel("ui5_datos"); 
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oModel.read("/userSet('"+usuario+"')", {
                  success: function(oData) {
                    console.log("Registro recuperado:", oData.Tipo);
                    if (usuario==oData.Usuario && contrasena==oData.Password) {
                        // Redirige al usuario a la página de lista de empleados   
                        sap.ui.getCore().getModel("top").setProperty("/tipo", oData.Tipo);
                        console.log('kk',sap.ui.getCore().getModel("top").getProperty("/tipo"))    
                        oRouter.navTo("listaEmpleados");
                    } else {
                        // Muestra el mensaje de error
                        errorLabel.setText("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
                        errorLabel.setVisible(true);
                    }                    
                    
                  },
                  error: function(oError) {
                    // Manejar errores de la consulta al servicio OData
                    console.error("Error al consultar el servicio OData: ", oError);
                    errorLabel.setText("ElL Usuario no existe en la base de datos");
                    errorLabel.setVisible(true);
                  }
                });
            }
        });
    });
