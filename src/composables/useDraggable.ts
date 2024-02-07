import {isRef, nextTick, Ref, ref} from 'vue';
import {IList} from "@/types/list.types";

export function useDraggable(list: Ref<IList[]> | IList[]) {
    const draggingIndex = ref(-1);
    let currentDraggingElement: HTMLElement | null = null;

    const updateList = async (indexFrom: number, indexTo: number) => {
        await nextTick();

        if (indexFrom < 0 || indexTo < 0 || indexFrom === indexTo ||
            indexFrom >= (isRef(list) ? list.value.length : list.length) ||
            indexTo >= (isRef(list) ? list.value.length : list.length)) {
            return;
        }

        const listRef = isRef(list) ? list.value : list;
        const itemToMove = listRef.splice(indexFrom, 1)[0];
        listRef.splice(indexTo, 0, itemToMove);
    };

    const dragStart = (event: DragEvent, index: number) => {
        event.stopPropagation()
        draggingIndex.value = index;
        currentDraggingElement = event.currentTarget as HTMLElement;
        currentDraggingElement.classList.add('dragging');
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer?.setData('text/plain', '');
        }
    };

    const dragOver = (event: DragEvent) => {
        event.stopPropagation()
        document.querySelectorAll('.placeholder').forEach(el => el.classList.remove('placeholder'));
        event.preventDefault();
        (event.currentTarget as HTMLElement || event.target as HTMLElement).classList.add('placeholder');
    };

    const dragLeave = (event: DragEvent) => {
        (event.currentTarget as HTMLElement).classList.remove('placeholder');
    };

    const drop = (event: DragEvent, index: number) => {
        event.preventDefault();
        currentDraggingElement?.classList.remove('dragging');
        currentDraggingElement = null;
        document.querySelectorAll('.placeholder').forEach(el => el.classList.remove('placeholder'));
        (event.currentTarget as HTMLElement).classList.remove('placeholder');
        updateList(draggingIndex.value, index);
        draggingIndex.value = -1;
    };

    return {dragStart, dragOver, drop, dragLeave};
}
