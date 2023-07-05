import { createStore } from "vuex";
import { modalsModule } from "./modalsModule";

export default createStore({
    state: {
        title: JSON.parse(sessionStorage.getItem('title')) || "TODO-приложение",
        taskData: null,
        tasks: JSON.parse(sessionStorage.getItem('myData')) || [],
        filters: JSON.parse(sessionStorage.getItem('filters')) || [],
    },
    mutations: {
        setTitle(state, title) {
            state.title = title
            sessionStorage.setItem('title', JSON.stringify(state.title));
        },

        setTaskData(state, data) {
            state.taskData = data;
        },

        setFilters(state, fitler) {
            state.filters.push(fitler);
            sessionStorage.setItem('filters', JSON.stringify(state.filters));
        },

        updateTaskName(state, tasks = state.tasks) {
            for (const task of tasks) {
                if (task.id == state.taskData.id) {
                    task.name = state.taskData.name;
                    sessionStorage.setItem('myData', JSON.stringify(state.tasks));
                }
                else if (task.subTasks.length > 0) {
                    this.commit('updateTaskName', task.subTasks)
                }
            }
        },

        createTask(state, tasks = state.tasks) {
            if (state.taskData.id == null) {
                const newTask = {
                    id: Date.now(),
                    name: state.taskData.name,
                    desc: state.taskData.desc,
                    subTasks: []
                };
                state.tasks.push(newTask)
                sessionStorage.setItem('myData', JSON.stringify(state.tasks));
            } else {
                for (const task of tasks) {
                    if (task.id == state.taskData.id) {
                        const newTask = {
                            id: Date.now(),
                            name: state.taskData.name,
                            desc: state.taskData.desc,
                            subTasks: []
                        };
                        task.subTasks.push(newTask)
                    }
                    else if (task.subTasks.length > 0) {
                        this.commit('createTask', task.subTasks)
                    }
                }
            }
        },

        deleteTask(state, tasks = state.tasks) {
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                if (task.id == state.taskData.id) {
                    tasks.splice(i, 1);
                    sessionStorage.setItem('myData', JSON.stringify(state.tasks));
                }
                else if (task.subTasks.length > 0) {
                    this.commit('deleteTask', task.subTasks)
                }
            }
        },

        finishTask(state, tasks = state.tasks) {
            for (const task of tasks) {
                if (task.id == state.taskData.id) {
                    task.finish = state.taskData.finish;
                    sessionStorage.setItem('myData', JSON.stringify(state.tasks));
                }
                else if (task.subTasks.length > 0) {
                    this.commit('finishTask', task.subTasks)
                }
            }
        },

        dropTasks(state, { taskData, targetId }) {
            const targetIndex = state.tasks.findIndex(task => task.id === targetId);

            const currentIndex = state.tasks.findIndex((task) => task.id === taskData.id);
            if (currentIndex === -1) {
                state.tasks.push(taskData)
                sessionStorage.setItem('myData', JSON.stringify(state.tasks));
            } else {
                const movedTask = state.tasks.splice(currentIndex, 1)[0];
                state.tasks.splice(targetIndex, 0, movedTask);
                sessionStorage.setItem('myData', JSON.stringify(state.tasks));
            }
        }
    },
    modules: {
        modals: modalsModule,
    }
})