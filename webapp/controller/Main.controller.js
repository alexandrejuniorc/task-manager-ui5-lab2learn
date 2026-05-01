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
                const aTasks = oModel.getProperty("/tasks");

                const sTaskTitle = this.byId("titleInput");
                const sTaskDescription = this.byId("descInput");
                const sTaskPriority = this.byId("prioritySelect");

                if (!sTaskTitle.getValue()) {
                    MessageToast.show("Informe um título!");
                    return;
                }

                aTasks.push({
                    title: sTaskTitle.getValue(),
                    description: sTaskDescription.getValue(),
                    status: "NÃO INICIADA",
                    priority: sTaskPriority.getSelectedKey()
                });

                oModel.setProperty("/tasks", aTasks);

                sTaskTitle.setValue("");
                sTaskDescription.setValue("");
                sTaskPriority.setSelectedKey("MEDIA");

                MessageToast.show("Tarefa adicionada!");
            }
        });
    }
);
