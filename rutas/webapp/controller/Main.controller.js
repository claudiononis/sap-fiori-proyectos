sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "rutas/model/models"
],  
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,models) {
        "use strict";

        return Controller.extend("rutas.controller.Main", {
            onInit: function () {
                this.myVariable = "Hola Mundo";
               // this.getView().setModel(models.createVarGlobales(), "top");
                sap.ui.getCore().setModel(models.createVarGlobales(), "top");
                
                sap.ui.getCore()
                  .getModel("top")
                  .setProperty("/usuario", 'hola');

            },
            
            onAfterRendering: function() {
                // Obtén el label por su ID (asegúrate de tener un label en tu vista con el ID "myLabel")
                var myLabel = this.getView().byId("idMsg");
          
                // Asigna el valor de la variable al label
                myLabel.setValue(this.myVariable);
              },
            onEdit: function(){
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var vista = this.getView().byId("idMsg");
                console.log(vista.getValue());
                oRouter.navTo("pagina", {msg: vista.getValue()},);
            }
        });
    });
