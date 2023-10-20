sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/ui5curso/model/models"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, models) {
        "use strict";
        function _onObjectMatch(oEvent) {    
          var sRouteName = oEvent.getParameter("name");
          console.log(sRouteName);
          if (sRouteName === "Routemain") {
            sessionStorage.clear();
            // Si vuelvo a la pagina de login reseteo las variables globales
          //  top.usuario='';
          //  top.contrasena='';
          //  top.Tipo='';
          }
        }

        return Controller.extend("ui5.ui5curso.controller.main", {
         
            onInit: function () {
              var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
              oRouter.getRoute("Routemain").attachPatternMatched(_onObjectMatch, this);

              // creo las variables globales
            
              sap.ui.getCore().setModel(models.createVarGlobales(), "top");
                
                sap.ui.getCore()
                  .getModel("top")
                  .setProperty("/usuario", 'HOLA');  
                 
               
            },

            onAfterRendering: function () {

              console.log('INIT',sap.ui.getCore()
              .getModel("top")
              .GetProperty("/usuario"))
              
            },
            onIniciarSesion: function() {
                var usuario = this.getView().byId("usuarioInput").getValue();
                var contrasena = this.getView().byId("contrasenaInput").getValue();
                var errorLabel = this.getView().byId("errorLabel");
                
                //Inicializo variables
               // var top= sap.ui.getCore().getModel("top");

               // sap.ui.getCore().getModel("top").setPropery.usuario(10);
               // sap.ui.getCore().getModel("top").setProperty("/contrasena", contrasena);
               
              //  top.usuario=usuario;
               // top.contrasena=contrasena;
               // top.Tipo='';

              //  sessionStorage.clear();
              //          sessionStorage.setItem('usuario', usuario);
              //          sessionStorage.setItem('contrasena', contrasena);
              //         sessionStorage.setItem('tipo', ''); 
                errorLabel.setVisible(false);
                var oModel = this.getView().getModel("ui5_datos"); 
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oModel.read("/userSet('"+usuario+"')", {
                  success: function(oData) {
                    console.log("Registro recuperado:", oData.Tipo);
                    if (usuario==oData.Usuario && contrasena==oData.Password) {
                        // Redirige al usuario a la página de lista de empleados  y guardo  inicio de sesion 
                        
                        sessionStorage.setItem('tipo', oData.Tipo);  
                        console.log('PASO TIPO',sessionStorage.getItem('tipo'));           
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
