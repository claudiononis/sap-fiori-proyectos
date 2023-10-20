sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "ui5/ui5final/model/models" , //  Esta va cuando uso variables declaradas en model/models
        "sap/ui/core/Fragment",
        "sap/m/MessageToast"
    ],
    
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,models,Fragment,MessageToast) {//  agrego models 
      "use strict";
      var oContexto;
      function _onObjectMatch(oEvent) {
         
            // Oculto boton si no es ADMIN
            var btNuevoEmpleado=this.getView().byId("btNuevoEmpleado");
            var oModel = sap.ui.getCore().getModel("top"); // recupero el modelo global
            btNuevoEmpleado.setVisible(oModel.getProperty("/tipo") === 'ADMIN');
        
            var acciones=this.getView().byId("acciones");
            acciones.setVisible(oModel.getProperty("/tipo") === 'ADMIN');
    

      }
      return Controller.extend("ui5.ui5final.controller.lista", {
        onInit() {
                var oRouter =  sap.ui.core.UIComponent.getRouterFor(this);// busca el router ( donde estan definidos todas las rutas)
                oRouter
                  .getRoute("listaEmpleados")  // obtiene la ruta ( en este caso la ruta se llama listaEmpleados)
                  .attachPatternMatched(_onObjectMatch, this); // se asocia la funcion _onObjectMatch  cuando se produce el matcheo de la ruta
                },
        
        onClick: function (oEvent){
          console.log('BBBB')
          // Obtén el contexto de datos asociado a la fila clicada
          var oContext = oEvent.getSource().getBindingContext("ui5_datos");

          // Verifica que el contexto existe y contiene idEmpleado
          if (oContext) {
            var sPath = oContext.getPath(); // Obtener la ruta del contexto
            const regex = /'(\d{8})'/; // Busca una secuencia de 8 dígitos entre comillas simples

            const matches = sPath.match(regex);

            var idEmpleado = matches[1];
            console.log(idEmpleado); // Esto imprimirá el valor entre comillas
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("editar", { id: idEmpleado});
          }
        },

        
        //Open Dialogo para crear el empleado
        onNuevoEmpleadoPress: function (evt) {    

        //Cargamos el Dialogo
        var oView = this.getView();
        if (!this.byId("formEmpleados")) {
          console.log('dssdfsdf');
          Fragment.load({
            id: this.oView.getId(),
            name: "ui5.ui5final.view.EmpleadoForm",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.bindElement({
              path: "empleadosSet",
              model: "ui5_datos",
            });
            oDialog.open();
          });
        }
        
      },

      //Destroy del Dialogo cuando se cierra (se ejecuta el Close)
      closeDialog: function (evt) {
       // evt.getSource().destroy();
        this.byId("formEmpleados").destroy();
      },

      onAfterOpenDialog: function(oEvent) {
        var oDatePicker = this.getView().byId("FechaIngreso");
        var oDialog = oEvent.getSource();
        var currentDate = new Date();
    
        if (oDatePicker && oDialog) {
            oDatePicker.setMaxDate(currentDate);
        }
      },

        //Crea el Integrante en el BackEnd desde boton crear en Dialogo
        crearEmpleado: function (evt) {  

          var oDialog = this.byId("formEmpleados");
          this.byId("formEmpleados").setBusy(true);
          var oCheckBox = this.byId("Activo");
          var bSelected = oCheckBox.getSelected();
          var oActivo;
          if (bSelected) {
            oActivo=true;
          } else {
            oActivo=false;
          }
          //formateo la fecha de acuerdo a como la espera el oData
          var sFecha = this.getView().byId("FechaIngreso").getValue();
          var aFechaParts = sFecha.split('/'); // Divide la cadena en partes

          // Asumiendo que las partes son día, mes y año respectivamente
          var sFormattedDate =  aFechaParts[2] + '-' + aFechaParts[1] + '-' + aFechaParts[0];
          var oDate = new Date(sFormattedDate);
          var sFormattedDate2 = oDate.toISOString().split(".")[0] ;
          console.log(sFormattedDate2)
          var oEmpleado = {
          
            Nombre: this.getView().byId("Nombre").getValue(),
            Apellido: this.getView().byId("Apellido").getValue(),
            Cargo: this.getView().byId("Cargo").getSelectedItem().getText(),
            FechaIngreso: sFormattedDate2,            
            Sueldo: this.getView().byId("Sueldo").getValue(),
            Direccion: this.getView().byId("Direccion").getValue(),
            Ciudad: this.getView().byId("Ciudad").getValue(),
            Pais: this.getView().byId("Pais").getValue(),
            Activo: oActivo,
          };
          // controlo campos obligatorios
          if (oEmpleado.Nombre  === "" || oEmpleado.Apellido  === ""  || oEmpleado.Sueldo  === ""  || oEmpleado.Cargo  === ""   || oEmpleado.FechaIngreso  === ""){
            MessageToast.show("Por favor, complete todos los campos requeridos.");
            this.byId("formEmpleados").setBusy(false);// vuelvo al formulario
          }
          else{
            if (isNaN(oEmpleado.Sueldo)  ){
              MessageToast.show("Ingrese un valor numerico en Sueldo.");
              this.byId("formEmpleados").setBusy(false);// vuelvo al formulario
            }
            else{
              this.getView()
                .getModel("ui5_datos")
                .create("/empleadosSet", oEmpleado, {
                  success: function (oResult, oResp) {
                    // oResp info sobre la REST (status code 201 ok)
      
                    //Vuelve sin error (oResult tiene la entidad creada)
                    MessageToast.show("Se creo el Empleado " +oResult.Nombre + " "+oResult.Apellido + " con Id:" + oResult.Idempleado);
                    this.byId("formEmpleados").setBusy(false);
                    this.byId("formEmpleados").destroy();
                    //this.byId("formEmpleados").close();
                  }.bind(this),
                  error: function (oErr) {
                    //Vuelve con error (oErr tiene el error)
                    var response = JSON.parse(oErr.responseText);
                    MessageToast.show(response.error.message.value);
                    this.byId("formEmpleados").setBusy(false);
                  }.bind(this),
                });
              }
          }
        },

        onDeletePress: function (oEvent) {
           //Cargamos el Dialogo
        var oView = this.getView();
        if (!this.byId("deleteConfirmation")) {
          Fragment.load({
            id: this.oView.getId(),
            name: "ui5.ui5final.view.ConfirmacionForm",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.bindElement({
              path: "empleadosSet",
              model: "ui5_datos",
            });
            oDialog.open();
          });
        }
        

          
          oContexto = oEvent.getSource().getBindingContext("ui5_datos");//guardo contexto

        },
        onConfirmDelete: function() {
          var oContext = oContexto;

          // Verifica que el contexto existe y contiene idEmpleado
          if (oContext) {
            var sPath = oContext.getPath(); // Obtener la ruta del contexto
            const regex = /'(\d{8})'/; // Busca una secuencia de 8 dígitos entre comillas simples
            const matches = sPath.match(regex);
            var idEmpleado = matches[1];
            console.log(idEmpleado); // Esto imprimirá el valor entre comillas
           var sPathInteg = "/empleadosSet('"+idEmpleado+"')";
           this.getView().getModel("ui5_datos").remove(sPathInteg, {
            method: "DELETE",
            success: function (oResult, oResp) {
              // Lógica en caso de éxito
            }.bind(this),
            error: function (oErr) {
              // Lógica en caso de error
            }.bind(this)
          });

          }
      
          this.byId("deleteConfirmation").destroy(); // Cierra el diálogo después de confirmar
      },

        onCancelDelete: function (evt) {
          // evt.getSource().destroy();
           this.byId("deleteConfirmation").destroy();
         },

      });
    }
  );