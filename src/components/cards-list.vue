<template>
  <div
      v-draggable="[
        list,
        {
          animation: 150,
          ghostClass: 'bg-gray-300',
          group: 'g1'
        }
      ]"
      class="pt-10"
  >
    <parent-card
        v-for="(item, index) in list"
        :key="item.name"
        v-model="list[index]"
        :index="index + 1"
    />
  </div>
</template>
<script lang="ts" setup>
import {computed} from 'vue';
import {vDraggable} from 'vue-draggable-plus'
import {IList} from "@/types/list.types.ts";
import ParentCard from "@/components/parent-card.vue";

interface Props {
  modelValue: IList[]
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: IList[]): void
}

const emits = defineEmits<Emits>()
const list = computed<any>({
  get: () => props.modelValue,
  set: (value: any) => emits('update:modelValue', value)
});

</script>
<style scoped>
</style>
