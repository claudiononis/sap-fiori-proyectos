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
          /*  var oColumnListItem= this.getView().byId("miColumnListItem");
           
            var tipo = sessionStorage.getItem('tipo');  
             console.log('esto es tipo', tipo);
            if(tipo==='ADMIN'){
              console.log('XADMIN');
              oColumnListItem.setType(sap.m.ListType.DetailAndActive);
            }
            else{
              console.log('XUSER..');
              oColumnListItem.setType(sap.m.ListType.Inactive);
            }  */
            
           //  sap.ui.getCore().getModel("top");// obtener las variables globales
           
           //var omodel=sap.ui.getCore().getModel("top");
       
            var oModel = this.getView().getModel("ui5_datos"); // Obtener el modelo de datos (oData de tensolite)
            var sPath = "/empleadosSet"; // Construir el path de lectura 
            var vista=this.getView();  
            var oColumnListItem = this.getView().byId("miColumnListItem");
            oModel.read(sPath, {
              success: function(oData) {  // Leo la base de datos
                // Lógica cuando la lectura es exitosa
                console.log("Registro recuperado:", oData);  
                
                // Obtengo valores de  INICIO DE SESSION
             // var usuario = sessionStorage.getItem('usuario');
             //var contrasena = sessionStorage.getItem('contrasena');  
             // var tipo = sessionStorage.getItem('tipo');  
             // console.log("usuario:", usuario);
             // console.log("contrasena:", contrasena);              
             // console.log("tipo:", tipo);
             // var tipo = sessionStorage.getItem('tipo');
             // var oMsg = vista.byId("msg");
             // console.log('tipooo',tipo);
              
              
            },  
              
              error: function(oError) {
                // Lógica cuando ocurre un error
                console.log("Error al recuperar el registro:", oError);
              }
            });
        
                 
          }
       
        return Controller.extend("ui5.ui5curso.controller.lista", {
         
            onInit: function () {   
              
             /*   var usuario = sessionStorage.getItem('usuario');
                var contrasena = sessionStorage.getItem('contrasena');  
                this.tipo = sessionStorage.getItem('tipo');  */
                this.getView().setModel(models.createVarGlobales(), "top");
                console.log('xxxx',sap.ui.getCore()
                .getModel("top")
                .getProperty("/usuario"));
              
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter
                  .getRoute("listaEmpleados")
                  .attachPatternMatched(_onObjectMatch, this);

               
            },

            onBack: function (oEvent) {
           /*   var oHistory = History.getInstance();
              var sPrevia = oHistory.getPreviousHash();
      
              if (sPrevia !== undefined) {
                window.history.go(-1);
              } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteMain");
              }*/
            },

            onAfterRendering: function () {
             
            },


            onEdit: function(){

            },

 
            
        });
    });
