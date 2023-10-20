sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "ui5/ui5final/model/models" , //  Esta va cuando uso variables declaradas en model/models
        
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/routing/History",
        "sap/m/MessageToast"],

    
        
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,models,JSONModel,History,MessageToast) {//  agrego models 
      "use strict";
      function _onObjectMatch(oEvent) {
        this.getView().getModel("viewModel").setProperty("/editmode", false);
        var editarEmpleado = this.getView().byId("editarEmpleado");
        console.log('test',sap.ui.getCore().getModel("top").getProperty("/tipo"))
        if (sap.ui.getCore().getModel("top").getProperty("/tipo")==='USER')
          editarEmpleado.setVisible(false);
        else
          editarEmpleado.setVisible(true);     
                
        var idempleado = oEvent.getParameter("arguments").id;                 
        console.log("Valor del parámetro id: " + idempleado);
        var oModel = this.getView().getModel("ui5_datos"); // Obtener el modelo de datos                  
        var sPath = "/empleadosSet('" + idempleado + "')"; // Construir el path de lectura utilizando el id
        this.getView().bindElement({
        path: sPath ,model: "ui5_datos"
        });
        
        oModel.read(sPath, {
          success: function(oData) {
            // Lógica cuando la lectura es exitosa
            console.log("Registro recuperado:", oData);
            // Acceder a los campos del registro recuperado
        
        

          },
          error: function(oError) {
            // Lógica cuando ocurre un error
            console.log("Error al recuperar el registro:", oError);
          }
        });     

      }
      return Controller.extend("ui5.ui5final.controller.EditarEmpleado", {
        onInit() {
                var oRouter =  sap.ui.core.UIComponent.getRouterFor(this);// busca elrouter ( donde estan definidos todas las rutas)
                oRouter
                  .getRoute("editar")  // obtiene la ruta ( en este caso la ruta se llama pagina)
                  .attachPatternMatched(_onObjectMatch, this); // se asocia la funcion _onObjectMatch  cuando se produce el matcheo de la ruta
                //Declaramos Modelo local para trabajar con la vista
                const oViewModel = new JSONModel({
                  editmode: false,
                });
                this.getView().setModel(oViewModel, "viewModel");
                },

        formatDate: function(oValue) {
          var fecha = new Date(oValue);
          fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
          var dia = ("0" + fecha.getDate()).slice(-2);
          var mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
          var anio = fecha.getFullYear().toString().slice(-2);
          var fechaFormateada = dia + "/" + mes + "/" + anio;                     
          return fechaFormateada;
        },

        onEditarPress: function(oEvent){
          this.getView().getModel("viewModel").setProperty("/editmode", true);
        },
        onGuardarPress: function(oEvent){
          this.getView().getModel("viewModel").setProperty("/editmode", false);
          // Obtener una referencia al modelo
          var oModel = this.getView().getModel("ui5_datos");

          // Obtener el contexto del elemento seleccionado
          var oContext = this.getView().getBindingContext("ui5_datos");

          // Guardar los cambios
          
          var oEntry = oContext.getObject();

          oEntry.Nombre =  this.getView().byId("Nombre").getValue();;
          oEntry.Apellido =  this.getView().byId("Apellido").getValue();;
          
          oEntry.Cargo= this.getView().byId("Cargo").getSelectedItem().getText();

          //formateo la fecha de acuerdo a como la espera el oData
          var sFecha = this.getView().byId("FechaIngreso").getValue();
          var aFechaParts = sFecha.split('/'); // Divide la cadena en partes

          // Asumiendo que las partes son día, mes y año respectivamente
          var sFormattedDate = '20' + aFechaParts[2] + '-' + aFechaParts[1] + '-' + aFechaParts[0];
          var oDate = new Date(sFormattedDate);
          var sFormattedDate2 = oDate.toISOString().split(".")[0] ;

          oEntry.FechaIngreso= sFormattedDate2;//this.getView().byId("FechaIngreso").getValue();            
          oEntry.Sueldo= this.getView().byId("Sueldo").getValue();
          oEntry.Direccion= this.getView().byId("Direccion").getValue();
          oEntry.Ciudad= this.getView().byId("Ciudad").getValue();
          oEntry.Pais=this.getView().byId("Pais").getValue();

          var oCheckBox = this.getView().byId("Activo");
          var bSelected = oCheckBox.getSelected();
          var oActivo;
          if (bSelected) {
            oActivo=true;
          } else {
            oActivo=false;
          }
          
          oEntry.Activo= oActivo;//this.getView().byId("Activo").getValue();
          this.getView().getModel("ui5_datos").update(oContext.getPath(), oEntry, {
              success: function (oResult, oResp) {
                  // Lógica en caso de éxito
              }.bind(this),
              error: function (oErr) {
                  // Lógica en caso de error
              }.bind(this)
          });
          this.onBack();
        },

        onBack: function(){
          var oHistory = History.getInstance();
          var sPrevia = oHistory.getPreviousHash();
  
         // if (sPrevia !== undefined) {
            window.history.go(-1);
        //  } else {
         //   var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        //    oRouter.navTo("RouteMain");
        //  }
         
        }, 
       
        onAfterRendering: function () {
         
          
        } 

       

      });
    }
  );