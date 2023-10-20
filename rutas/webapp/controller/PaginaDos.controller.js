sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "rutas/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,models) {
        "use strict";
        function _onObjectMatch(oEvent) {
            var mMsg= oEvent.getParameter("arguments").msg;  // cuan se llama a la funcionse buscan los parametros que se pasaron cundo se ruteo la pagina
            var vista =this.getView().byId("lbMsg"); // se busca el label que muestra el mensaje 
            vista.setText("Estoy en la pagina Dos y recibi como dato.....=   "+ mMsg);// se  modifica el mensaje  con el dato recibido
            console.log(mMsg);
        //    this.getView().setModel(models.createVarGlobales(), "top");
            //sap.ui.getCore().setModel(models.createVarGlobales(), "top");
                
            console.log('xxxx',sap.ui.getCore()
              .getModel("top")
              .getProperty("/usuario"));

           /*  
           
           this.getView().bindElement({
              path: "laboratorio>/ClientesSet('" + idCliente + "')",
            }); */
          }
        return Controller.extend("rutas.controller.PaginaDos", {
            onInit: function () {
                var oRouter =  sap.ui.core.UIComponent.getRouterFor(this);// busca elrouter ( donde estan definidos todas las rutas)
                oRouter
                  .getRoute("pagina")  // obtiene la ruta ( en este caso la ruta se llama pagina)
                  .attachPatternMatched(_onObjectMatch, this); // se asocia la funcion _onObjectMatch  cuando se produce el matcheo de la ruta
                  
            },
            
        });
    });