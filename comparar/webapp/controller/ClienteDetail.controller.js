sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",
      "sap/ui/core/routing/History",
      "sap/m/MessageToast",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, History, MessageToast) {
      "use strict";
  
      function _onObjectMatch(oEvent) {
        var idCliente = oEvent.getParameter("arguments").id;
        this.getView().bindElement({
          path: "laboratorio>/ClientesSet('" + idCliente + "')",
        });
      }
      function  _onRouteMatched(oEvent) {   
          var oParameters = oEvent.getParameters(); // Obtener los parámetros de la ruta
          var sId = oParameters.arguments.id; // Obtener el valor del parámetro "id"
          
        var vista = this.getView();
         vista.byId("id").setText(sId ); 
           var oModel = this.getView().getModel("laboratorio"); // Obtener el modelo de datos "laboratorio"
               
           var sPath = "/ClientesSet('" + sId + "')"; // Construir el path de lectura utilizando el id
           console.log("Valor del parámetro id: " + sId);
           //vista.byId("panel").setBusy(true); 
           oModel.read(sPath, {
             success: function(oData) {
              vista.byId("street").setValue(oData.Street); 
              vista.byId("city").setValue(oData.City); 
              /* vista.byId("pais").setValue(oData.Country); 
              vista.byId("telefono").setValue(oData.Telephone); 
              vista.byId("email").setValue(oData.Email);  
              vista.byId("tipo").setSelectedKey(oData.Custtype); 
              vista.byId("web").setValue(oData.Webuser); 
              vista.byId("descuento").setValue(Number(oData.Discount));  */
             },
             error: function(oError) {
               vista.byId("panel").setBusy(false);
               // Lógica cuando ocurre un error
               console.log("Error al recuperar el registro:", oError);
             }
           });  

         }
    
  

  
      return Controller.extend("tp2.tp2fiori.controller.ClienteDetail", {
        onInit: function () {
          //Recuperamos los argumentos y cargamos el binding
        /*   var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter
            .getRoute("clienteDetail")
            .attachPatternMatched(_onObjectMatch, this); */
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this); // Obtener el enrutador
                oRouter.getRoute("clienteDetail").attachPatternMatched(_onRouteMatched, this); // Asociar la función al evento "patternMatched" de la ruta
               
          //Declaramos Modelo local para trabajar con la vista
          /* const oViewModel = new JSONModel({
            editmode: false,
          });
          this.getView().setModel(oViewModel, "viewModel"); */
        },
        convToInt: function (dsc) {
          return parseInt(dsc);
        },
       
  
        onBack: function () {
          var oHistory = History.getInstance();
          var sPrevia = oHistory.getPreviousHash();
  
          if (sPrevia !== undefined) {
            window.history.go(-1);
          } else {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMain");
          }
        },
  
        handleEditPress: function (oEvent) {
          this.getView().getModel("viewModel").setProperty("/editmode", true);
        },
        handleCancelPress: function (oEvent) {
          this.getView().getModel("viewModel").setProperty("/editmode", false);
        },
  
        handleSavePress: function (oEvent) {
          const oContext = oEvent.getSource().getBindingContext("laboratorio");
          var oClientePath = oContext.getPath();
  
          var body = {
            Id: this.getView().byId("id").getText(),
            Name: this.getView().byId("name").getText(),
            Street: this.getView().byId("street").getValue(),
            City: this.getView().byId("city").getValue(),
            Country: this.getView().byId("country").getValue(),
            Telephone: this.getView().byId("telephone").getValue(),
            Custtype: this.getView().byId("tipo").getSelectedItem().getKey(),
            Discount: this.getView().byId("discount").getValue().toString(),
            Email: this.getView().byId("email").getValue(),
            Webuser: this.getView().byId("web").getValue(),
          };
  
          //Modificamos el Cliente
          this.getView()
            .getModel("laboratorio")
            .update(oClientePath, body, {
              success: function (oData, oResp) {
                // oResult devulve la entidad que en el update no la devuelve,
                // oResp info sobre la REST (status code 204 ok, pero sin respuesta)
  
                //Vuelve sin error (oResult tiene la entidad creada)
                MessageToast.show("Cliente Editado Correctamnete");
                this.handleCancelPress();
                this.onBack();
              }.bind(this),
              error: function (oErr) {
                //Vuelve con error (oErr tiene el error)
                var response = JSON.parse(oErr.responseText);
                MessageToast.show(response.error.message.value);
              }.bind(this),
            });
        },
      });
    }
  );