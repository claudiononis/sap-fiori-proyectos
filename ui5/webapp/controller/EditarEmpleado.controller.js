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
            if (sap.ui.getCore().getModel("top").getProperty("/tipo")==='ADMIN')
                 console.log('estoy');

                 var idempleado = oEvent.getParameter("arguments").id;
                 
                 console.log("Valor del parámetro id: " + idempleado);
                 var vista = this.getView();
                // vista.byId("id").setValue(sId ); 
                 var oModel = this.getView().getModel("ui5_datos"); // Obtener el modelo de datos 
                 empleadosSet(Idempleado='00000001')   
                 var sPath = "/empleadosSet('" + idempleado + "')"; // Construir el path de lectura utilizando el id
                 oModel.read(sPath, {
                   success: function(oData) {
                     // Lógica cuando la lectura es exitosa
                     console.log("Registro recuperado:", oData);
                     // Acceder a los campos del registro recuperado
                    
                     vista.byId("Nombre").setValue(oData.Name); 
                   /*  vista.byId("calle").setValue(oData.Street); 
                     vista.byId("Ciudad").setValue(oData.City); 
                     vista.byId("pais").setValue(oData.Country); 
                     vista.byId("telefono").setValue(oData.Telephone); 
                     vista.byId("email").setValue(oData.Email);  
                     vista.byId("tipo").setSelectedKey(oData.Custtype); 
                     vista.byId("web").setValue(oData.Webuser); 
                     vista.byId("descuento").setValue(Number(oData.Discount)); 
 
                    //desabilito todos los inputs
                     
                     vista.byId("calle").setEnabled(false); 
                     vista.byId("Ciudad").setEnabled(false);
                     vista.byId("pais").setEnabled(false);
                     vista.byId("telefono").setEnabled(false);
                     vista.byId("email").setEnabled(false);
                     vista.byId("tipo").setEnabled(false);
                     vista.byId("tipo").setEnabled(false);
                     vista.byId("web").setEnabled(false);
                     vista.byId("descuento").setEnabled(false);
                     vista.byId("guardarCliente").setVisible(false);
                     vista.byId("editarCliente").setVisible(true);*/
 
                   },
                   error: function(oError) {
                     // Lógica cuando ocurre un error
                     console.log("Error al recuperar el registro:", oError);
                   }
                 });      

      }
      return Controller.extend("ui5curso.ui5.controller.EditarEmpleado", {
        onInit() {
                var oRouter =  sap.ui.core.UIComponent.getRouterFor(this);// busca elrouter ( donde estan definidos todas las rutas)
                oRouter
                  .getRoute("editar")  // obtiene la ruta ( en este caso la ruta se llama pagina)
                  .attachPatternMatched(_onObjectMatch, this); // se asocia la funcion _onObjectMatch  cuando se produce el matcheo de la ruta
                

                },

        onClick: function (oEvent){

        },

        onAfterRendering: function () {
         
          
        },  

        onDeletePress: function (oEvent) {
        
        }

      });
    }
  );