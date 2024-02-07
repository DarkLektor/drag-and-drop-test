<template>
  <div class="draggable-item shadow-md mb-1 w-full rounded-xl cursor-move bg-white">
    <div class="py-4 px-8">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-[75px]">
          <p class="text-xs text-gray-400">№</p>
          <p class="mt-2">{{ index }}</p>
        </div>

        <div class="min-w-[300px] w-2/12">
          <p class="text-xs text-gray-400">Название</p>
          <p class="flex w-full items-center gap-2 mt-2">
            <svg class="w-5 h-4 shrink-0 object-contain object-center">
              <use xlink:href="/assets/icons/sprites.svg#dir"></use>
            </svg>
            <b class="truncate">
              {{ modelValue?.name?.toUpperCase() }}
            </b>
          </p>
        </div>

        <div class="min-w-[100px] w-2/12">
          <p class="text-xs text-gray-400">
            Очередность
          </p>
          <p class="mt-2">{{ index }}</p>
        </div>

        <div class="min-w-[200px] w-5/12">
          <p class="text-xs text-gray-400">Подкатегории</p>
          <p class="mt-2 truncate">
            {{ subCategories.join(' / ') }}
          </p>
        </div>

        <div class="min-w-[150px] w-2/12 relative flex items-center justify-end self-stretch gap-4">
          <span class="bg-gray-400 px-2 text-xs text-white rounded-2xl mr-2">
            {{ subCategories.length }}
          </span>

          <button
              v-if="list.children?.length"
              :class="showChildrens ? 'rotate-180 text-blue-600 bg-blue-200' : 'text-white bg-blue-600'"
              class="w-[32px] h-[32px] rounded-xl hover:text-blue-600 hover:bg-white border border-blue-600 inline-flex items-center justify-center"
              @click="showChildrens = !showChildrens"
          >
            <svg class="w-5 h-4 shrink-0 object-contain object-center">
              <use xlink:href="/assets/icons/sprites.svg#chevron-down"></use>
            </svg>
          </button>

          <button
              class="w-[32px] h-[32px] rounded-xl hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-600 inline-flex items-center justify-center"
              @click="showActions = !showActions"
          >
            <svg class="w-5 h-4 shrink-0 object-contain object-center">
              <use xlink:href="/assets/icons/sprites.svg#dots-horizontal"></use>
            </svg>
          </button>

          <div ref="elementRef"
               :class="showActions ? 'block' : 'hidden'"
               class="absolute z-10 right-0 top-full p-1 bg-white rounded-xl shadow-xl">
            <button
                class="p-2.5 hover:bg-blue-100 rounded-xl inline-flex w-full items-center gap-2">
              <svg class="w-5 h-5 shrink-0 object-contain object-center text-gray-400">
                <use xlink:href="/assets/icons/sprites.svg#edit"></use>
              </svg>
              Редактировать
            </button>
            <button
                class="p-2.5 hover:bg-blue-100 rounded-xl inline-flex w-full items-center gap-2">
              <svg class="w-5 h-5 shrink-0 object-contain object-center text-gray-400">
                <use xlink:href="/assets/icons/sprites.svg#trash"></use>
              </svg>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
        :class="showChildrens ? 'block' : 'hidden'"
        class="pr-8 pl-11 border-t border-gray-300"
    >
      <child-card
          v-for="(child, childIndex) in list.children"
          :key="child.name"
          v-model="list.children[childIndex]"
          :index="childIndex + 1"
          :parentIndex="index"
          draggable="true"
          @dragleave="dragLeave"
          @dragover="dragOver"
          @dragstart="dragStart($event, childIndex)"
          @drop="drop($event, childIndex)"
      ></child-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {IList} from "@/types/list.types.ts";
import {onClickOutside} from '@vueuse/core'
import ChildCard from "@/components/child-card.vue";
import {useDraggable} from "@/composables/useDraggable.ts";

interface Props {
  modelValue: IList,
  index: number
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: IList): void
}

const emits = defineEmits<Emits>()

const list = computed<IList>({
  get: () => props.modelValue,
  set: (value: IList) => emits('update:modelValue', value)
})

const subCategories = computed(() => list.value.children?.map(child => child.name) || [])

const showActions = ref(false)
const showChildrens = ref(false)
const elementRef = ref(null)

onClickOutside(elementRef, () => showActions.value = false)

const children = computed({
  get: () => list.value.children,
  set: (newChildren) => {
    list.value.children = newChildren;
    emits('update:modelValue', list.value);
  }
});

const {dragStart, dragOver, drop, dragLeave} = useDraggable(children);
</script>
