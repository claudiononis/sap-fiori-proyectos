sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "ui5curso/ui5/model/models"  //  Esta va cuando uso variables declaradas en model/models

    ],
    
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,models) {//  agrego models 
      "use strict";
      function _onObjectMatch(oEvent) {
       
         console.log('TIPO',sap.ui.getCore()
           .getModel("top")
           .getProperty("/tipo"));
            // Obtengo el label por su ID 
            var myLabel = this.getView().byId("lbUser");       
            // Asigna el valor de la variable al label
            myLabel.setText(sap.ui.getCore().getModel("top").getProperty("/usuario") + ':'+sap.ui.getCore().getModel("top").getProperty("/tipo"));
            var btNuevoEmpleado=this.getView().byId("btNuevoEmpleado");
            if (sap.ui.getCore().getModel("top").getProperty("/tipo") ==='ADMIN')
                 btNuevoEmpleado.setVisible(true);

      }
      return Controller.extend("ui5curso.ui5.controller.lista", {
        onInit() {
                var oRouter =  sap.ui.core.UIComponent.getRouterFor(this);// busca elrouter ( donde estan definidos todas las rutas)
                oRouter
                  .getRoute("listaEmpleados")  // obtiene la ruta ( en este caso la ruta se llama pagina)
                  .attachPatternMatched(_onObjectMatch, this); // se asocia la funcion _onObjectMatch  cuando se produce el matcheo de la ruta
                },

        onClick: function (oEvent){
          // Obtén el contexto de datos asociado a la fila clicada
          var oContext = oEvent.getSource().getBindingContext("ui5_datos");

          // Verifica que el contexto existe y contiene idEmpleado
          if (oContext) {
            var sPath = oContext.getPath(); // Obtener la ruta del contexto
            var aPathParts = sPath.split("="); // Dividir la ruta en partes
            var idEmpleado = aPathParts[1].split("=")[0].split("'")[1];

             
              console.log(idEmpleado)
              const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
              oRouter.navTo("editar", { id: idEmpleado});
          }
        },

        onAfterRendering: function () {
          this.Usuario=sap.ui.getCore().getModel("top").getProperty("/usuario");
          this.Tipo=sap.ui.getCore().getModel("top").getProperty("/tipo");
          
        },  

        onDeletePress: function (oEvent) {
          var oButton = oEvent.getSource();
          var oCustomData = oButton.getCustomData()[0];
          var idEmpleado = oCustomData.getValue();         
          console.log('id empleado',idEmpleado)
      
          // Ahora puedes usar sValor para determinar cuál botón fue presionado
        }

      });
    }
  );