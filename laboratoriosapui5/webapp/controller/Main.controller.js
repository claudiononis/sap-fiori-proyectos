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
                
                console.log("pase1");
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




             onEditPress: function(oEvent) {
                // Acciones a realizar cuando se presione el botón de edición
                var oSelectedItem = oEvent.getSource().getParent().getParent();
                var sSelectedName = oSelectedItem.getCells()[0].getText();
                
                // Ejemplo de acción: mostrar un mensaje de edición
                sap.m.MessageToast.show("Editando: " + sSelectedName);
            },

		onEdit: function(oEvent) {
            var oItem = oEvent.getSource();
            var oBindingContext = oItem.getBindingContext();
            //var sPath = oBindingContext.getPath();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("editarCliente");	
		},


		
        onItemPress: function(oEvent) {
           
                var oTabla=this.getView().byId("tIntegrantes");
                    oTabla.bindElement( "laboratorio>" + oEvent.getSource().getBindingContextPath() );
                    var oPanel =this.getView().byId("pIntegrantes");
                    oPanel.setVisible(true);	
            
            },


		mifuncion: function(oEvent) {
            var oTabla=this.getView().byId("tIntegrantes");
            oTabla.bindElement( "laboratorio>" + oEvent.getSource().getBindingContextPath() );
            var oPanel =this.getView().byId("pIntegrantes");
            oPanel.setVisible(true);	
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
    }

        });
        
    });
