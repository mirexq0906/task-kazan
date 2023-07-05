export default {
    mounted(el, bilding) {
        el.setAttribute('draggable', true);
        el.addEventListener('dragstart', (event) => {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData(bilding.value.name, JSON.stringify(bilding.value.task));
            event.target.classList.add("dragging");
        });

        el.addEventListener('dragend', (event) => {
            event.target.classList.remove("dragging");
        });
    },
    name: 'draggable'
}