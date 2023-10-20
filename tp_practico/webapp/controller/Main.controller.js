sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("claudio.tppractico.controller.Main", {
            onInit: function () {
               
            },
            edad: function (fecha){
                console.log(fecha); 
                 var oCurrentDate = new Date();
               /*   var anio = parseInt(fecha.substring(0,4));
                 if (!isNaN(anio)) {
                     //console.log(anio);
                     var diffInYears = oCurrentDate.getFullYear() - anio;
                     return diffInYears;  
                 }
                 else
                     return 0; */
                 
             } ,
 
 
             tipoCliente: function (tipo){
                
                 if (tipo=='B') {
                     return 'Cliente Empresa';                  
                 }
                 else if (tipo=='P') {
                     return 'Cliente Particular';                  
                 }
                 else                   
                     return 'Desconocido';  
                 
             } ,
            
           
             onEdit: function(oEvent) {
                 const Id = oEvent
                 .getSource()
                 .getBindingContext("laboratorio")
                 .getObject().Id;
                 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      
                 oRouter.navTo("clienteDetail", { id: Id });
       
              
                
             }
        });
    });
