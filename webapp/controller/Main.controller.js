sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/m/MessageBox",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
    ],
    (Controller, JSONModel, MessageToast, MessageBox) => {
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
                const oTaskTitle = this.byId("titleInput");
                const oTaskDescription = this.byId("descInput");
                const oTaskPriority = this.byId("prioritySelect");

                const sTaskTitleValue = oTaskTitle.getValue();
                const sTaskDescriptionValue = oTaskDescription.getValue();
                const sTaskPriorityValue = oTaskPriority.getSelectedKey();

                if (!sTaskTitleValue) {
                    MessageToast.show("Informe um título!");
                    return;
                }

                const oModel = this.getView().getModel();
                const aTasks = oModel.getProperty("/tasks");

                aTasks.push({
                    title: sTaskTitleValue,
                    description: sTaskDescriptionValue,
                    status: "NÃO INICIADA",
                    priority: sTaskPriorityValue
                });

                oModel.setProperty("/tasks", aTasks);

                oTaskTitle.setValue("");
                oTaskDescription.setValue("");
                oTaskPriority.setSelectedKey("BAIXA");

                MessageToast.show("Tarefa adicionada!");
            },

            onEditTask(oEvent) {
                const oContext = oEvent.getSource().getBindingContext();
                const oTask = oContext.getObject();

                this.byId("editTitleInput").setValue(oTask.title);
                this.byId("editDescriptionInput").setValue(oTask.description);
                this.byId("editPriorityInput").setSelectedKey(oTask.priority);
                this.byId("editStatusInput").setSelectedKey(oTask.status);

                this.byId("editTaskDialog").setBindingContext(oContext);
                this.byId("editTaskDialog").open();
            },

            onSaveEditTask() {
                const oContext = this.byId("editTaskDialog").getBindingContext();
                const sPath = oContext.getPath();
                const oModel = this.getView().getModel();

                oModel.setProperty(sPath + "/title", this.byId("editTitleInput").getValue());
                oModel.setProperty(
                    sPath + "/description",
                    this.byId("editDescriptionInput").getValue()
                );
                oModel.setProperty(
                    sPath + "/priority",
                    this.byId("editPriorityInput").getSelectedKey()
                );
                oModel.setProperty(
                    sPath + "/status",
                    this.byId("editStatusInput").getSelectedKey()
                );

                this.byId("editTaskDialog").close();
                MessageToast.show("Tarefa atualizada!");
            },

            onCancelEditTask() {
                this.byId("editTaskDialog").close();
            },

            onDeleteTask(oEvent) {
                const oSource = oEvent.getSource();
                const oContext = oSource.getBindingContext();
                const sPath = oContext.getPath();

                const iIndex = parseInt(sPath.split("/").pop(), 10);

                const oModel = this.getView().getModel();
                const sTitle = oModel.getProperty(sPath + "/title");

                MessageBox.confirm(`Tem certeza que deseja remover a tarefa "${sTitle}"?`, {
                    title: "Confirmar Exclusão",
                    onClose: (sAction) => {
                        const sConfirmation = MessageBox.Action.OK;

                        if (sAction === sConfirmation) {
                            const aTasks = oModel.getProperty("/tasks");

                            aTasks.splice(iIndex, 1);
                            oModel.setProperty("/tasks", aTasks);

                            MessageToast.show("Tarefa removida!");
                        }
                    }
                });
            },

            onClearFilters() {
                MessageToast.show("Filtros limpos!");
            }
        });
    }
);
