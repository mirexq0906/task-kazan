export const modalsModule = {
    state: () => ({
        activeModal: false,
        currentModal: "",
    }),
    mutations: {
        openModal(state, data) {
            state.activeModal = data.active
            state.currentModal = data.name
        },
        closeModal(state) {
            state.activeModal = false
        }
    }
}