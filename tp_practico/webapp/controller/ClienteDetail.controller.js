sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/routing/History",
  "sap/m/MessageToast",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
       /*  function _onObjectMatch(oEvent) {
          var idCliente = oEvent.getParameter("arguments").id;
          this.getView().bindElement({
            path: "laboratorio>/ClientesSet('" + idCliente + "')",
          }); 
        } */
          /* function _onRouteMatched (oEvent) {   
          var idCliente = oEvent.getParameter("arguments").id;
          this.getView().bindElement({
            path: "laboratorio>/ClientesSet('" + idCliente + "')", 
          });
        }   */
        return Controller.extend("claudio.tppractico.controller.EditarCliente", {
            onInit: function () {
               // var oRouter = sap.ui.core.UIComponent.getRouterFor(this); // Obtener el enrutador
               // oRouter.getRoute("editarcliente").attachPatternMatched(_onRouteMatched, this); // Asociar la función al evento "patternMatched" de la ruta
          //Recuperamos los argumentos y cargamos el binding
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this); // Obtener el enrutador
          oRouter.getRoute("clienteDetail").attachPatternMatched(this._onRouteMatched, this); // Asociar la función al evento "patternMatched" de la ruta
           
              },

             

            _onRouteMatched: function(oEvent) {   
                var oParameters = oEvent.getParameters(); // Obtener los parámetros de la ruta
                var sId = oParameters.arguments.id; // Obtener el valor del parámetro "id"
                console.log("Valor del parámetro id: " + sId);
                   var vista = this.getView();
               vista.byId("id").setValue(sId ); 
                var oModel = this.getView().getModel("laboratorio"); // Obtener el modelo de datos "laboratorio"
                     
                var sPath = "/ClientesSet('" + sId + "')"; // Construir el path de lectura utilizando el id
              //  vista.byId("panel").setBusy(true); 
                oModel.read(sPath, {
                  success: function(oData) {
             //       vista.byId("panel").setBusy(false);
                    // Lógica cuando la lectura es exitosa
                    console.log("Registro recuperado:", oData);
                    // Acceder a los campos del registro recuperado
                   
                    vista.byId("Nombre").setValue(oData.Name); 
                    vista.byId("calle").setValue(oData.Street); 
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
                    vista.byId("editarCliente").setVisible(true);

                  },
                  error: function(oError) {
                    vista.byId("panel").setBusy(false);
                    // Lógica cuando ocurre un error
                    console.log("Error al recuperar el registro:", oError);
                  }
                });  

              },
           

/* 

            onGuardarPress: function() {
                var oModel = this.getView().getModel("laboratorio"); // Obtener el modelo de datos "laboratorio"
                //var sPath = "/ClientesSet('" + sId + "')";
                var calle=this.getView().byId("calle").getValue();
                var oData = {
                  // Crear el objeto de datos con los valores a guardar
                  
                  Street:     calle,
                  Name :      this.getView().byId("Nombre").getValue(),
                  Street:     this.getView().byId("calle").getValue(),
                  City :      this.getView().byId("Ciudad").getValue(),
                  Country:    this.getView().byId("pais").getValue(),
                  Telephone:  this.getView().byId("telefono").getValue(),
                  Email:      this.getView().byId("email").getValue() ,  
                  Custtype:   this.getView().byId("tipo").getSelectedKey() ,
                  Webuser:    this.getView().byId("web").getValue() ,
                  Discount:   this.getView().byId("descuento").getValue().toString()
       
                  
                };
                var oRouter2 = sap.ui.core.UIComponent.getRouterFor(this);
                oModel.update("/ClientesSet('" + this.getView().byId("id").getValue() + "')", oData, {
                  success: function() {
                    // Lógica cuando la creación es exitosa
                    console.log("Datos guardados exitosamente");
                    //Vuelvo a la pagina principal
                    
                    oRouter2.navTo("RouteMain");
                  },
                  error: function(oError) {
                    // Lógica cuando ocurre un error
                    console.log("Error al guardar los datos: " + oError);
                  }
                });
              },
              onEditarPress: function() {
                var vistaEditarCliente = this.getView();// obtengo la vista y habilito los input
                vistaEditarCliente.byId("calle").setEnabled(true); 
                vistaEditarCliente.byId("Ciudad").setEnabled(true);
                vistaEditarCliente.byId("pais").setEnabled(true);
                vistaEditarCliente.byId("telefono").setEnabled(true);
                vistaEditarCliente.byId("email").setEnabled(true);
                vistaEditarCliente.byId("tipo").setEnabled(true);
                vistaEditarCliente.byId("tipo").setEnabled(true);
                vistaEditarCliente.byId("web").setEnabled(true);
                vistaEditarCliente.byId("descuento").setEnabled(true);
                vistaEditarCliente.byId("guardarCliente").setVisible(true);
                vistaEditarCliente.byId("editarCliente").setVisible(false);
              },

              onCancelarPress:function() {
               
                var oRouter2 = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter2.navTo("RouteMain");
           

          } */
        });
    });
