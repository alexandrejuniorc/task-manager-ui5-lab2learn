sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageToast"],
    (Controller, JSONModel, MessageToast) => {
        "use strict";

        return Controller.extend("studies.taskmanager.controller.Main", {
            onInit() {
                const oData = {
                    tasks: [
                        {
                            title: "Estudar live do Start SAP",
                            description: "Finalizar aula",
                            status: "FEITO",
                            priority: "ALTA"
                        },
                        {
                            title: "Revisar conteúdos",
                            description: "Finalizar próximas aulas",
                            status: "EM PROGRESSO",
                            priority: "MEDIA"
                        },
                        {
                            title: "Criar tela inicial",
                            description: "Montar interface Fiori do app",
                            status: "NÃO INICIADO",
                            priority: "BAIXA"
                        }
                    ]
                };
                const oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
            },
            onAddTask() {
                const oModel = this.getView().getModel();
            }
        });
    }
);
