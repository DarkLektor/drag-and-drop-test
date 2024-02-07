<template>
  <div
      class="pt-10"
  >
    <parent-card
        v-for="(item, index) in list"
        :key="item.name"
        v-model="list[index]"
        :index="index + 1"
        draggable="true"
        @dragover="dragOver"
        @dragstart="dragStart($event, index)"
        @drop="drop($event, index)"
    />
  </div>
</template>
<script lang="ts" setup>
import {computed} from 'vue';
import {IList} from "@/types/list.types.ts";
import ParentCard from "@/components/parent-card.vue";
import {useDraggable} from "@/composables/useDraggable.ts";

interface Props {
  modelValue: IList[]
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: IList[]): void
}

const emits = defineEmits<Emits>()
const list = computed<IList[]>({
  get: () => props.modelValue,
  set: (value: IList[]) => emits('update:modelValue', value)
});

const {dragStart, dragOver, drop} = useDraggable(list);
</script>
<style scoped>
</style>
