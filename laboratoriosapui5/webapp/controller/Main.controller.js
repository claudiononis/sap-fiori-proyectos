sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sapui5.laboratoriosapui5.controller.Main", {
            onInit: function () { 
                
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this); // Obtener el enrutador
                oRouter.getRoute("editarcliente").attachPatternMatched(this._onRouteMatched, this); // Asociar la función al evento "patternMatched" de la ruta
            },

           

              
            edad: function (fecha){
               console.log(fecha); 
                var oCurrentDate = new Date();
                var anio = parseInt(fecha.substring(0,4));
                if (!isNaN(anio)) {
                    //console.log(anio);
                    var diffInYears = oCurrentDate.getFullYear() - anio;
                    return diffInYears;  
                }
                else
                    return 0;
                
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
     
                oRouter.navTo("editarcliente", { id: Id });
      
             
               
            },

            onAgregarClick:function(oEvent){
                sap.m.MessageToast.show("Agregar " );
            },
            
            onItemPress: function(oEvent) {            
                    var oTabla=this.getView().byId("tIntegrantes");
                        oTabla.bindElement( "laboratorio>" + oEvent.getSource().getBindingContextPath() );
                        var oPanel =this.getView().byId("pIntegrantes");
                        oPanel.setVisible(true);	
                
                },

                
            onEditPress: function(oEvent) {
                    // Acciones a realizar cuando se presione el botón de edición
                    var oSelectedItem = oEvent.getSource().getParent().getParent();
                    var sSelectedName = oSelectedItem.getCells()[0].getText();
                    
                    // Ejemplo de acción: mostrar un mensaje de edición
                    sap.m.MessageToast.show("Editando: " + sSelectedName);
                },
                
            onDeletePress: function(oEvent) {
            // Acciones a realizar cuando se presione el botón de borrado
            var oSelectedItem = oEvent.getSource().getParent().getParent();
            var sSelectedName = oSelectedItem.getCells()[0].getText();
            
            // Ejemplo de acción: mostrar un mensaje de confirmación de borrado
            sap.m.MessageBox.confirm("¿Estás seguro de que deseas borrar a " + sSelectedName + "?", {
                actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                onClose: function(oAction) {
                        if (oAction === sap.m.MessageBox.Action.YES) {
                            // Realizar la acción de borrado
                            sap.m.MessageToast.show("Borrado exitoso: " + sSelectedName);
                        }
                }
                });
            },
// fin codigo controlador Main

            ////  codigo para la vista EdtarCliente

            _onRouteMatched: function(oEvent) {              
             

                var oParameters = oEvent.getParameters(); // Obtener los parámetros de la ruta
                var sId = oParameters.arguments.id; // Obtener el valor del parámetro "id"
                console.log("Valor del parámetro id: " + sId);
                var vista = this.getView();
                vista.byId("id").setValue(sId ); 
                var oModel = this.getView().getModel("laboratorio"); // Obtener el modelo de datos "laboratorio"
                     
                var sPath = "/ClientesSet('" + sId + "')"; // Construir el path de lectura utilizando el id
                oModel.read(sPath, {
                  success: function(oData) {
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
                    // Lógica cuando ocurre un error
                    console.log("Error al recuperar el registro:", oError);
                  }
                });

              },
           



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
           

          }

        });
        
    });
