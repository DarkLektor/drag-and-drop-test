<template>
  <main class="bg-gray-100 min-h-[100vh]">
    <div class="lg:container lg:mx-auto mx-4">
      <div class="flex items-center gap-4 pt-8">
        <h1 class="text-2xl">Список тем обращения и продуктов</h1>
        <span class="text-xs text-blue-500 py-1 px-2.5 rounded-xl bg-white shadow-sm">
          Найдено: {{ list.length }}
        </span>
      </div>
      <cards-list
          v-model="list"
      />
    </div>
  </main>
</template>
<script lang="ts" setup>
import {useDraggable} from 'vue-draggable-plus'
import {ref} from 'vue'
import CardsList from "@/components/cards-list.vue";
import {IList} from "@/types/list.types.ts";

const list = ref<IList[]>([
      {
        name: "Банковские карты",
        children: [
          {
            name: "Mastercard",
            children: [
              {
                name: "Mastercard (Platinum)",
                children: [
                  {name: "Бесконтактная оплата", children: []},
                  {name: "Дополнительные бонусы", children: []}
                ]
              },
              {
                name: "Mastercard (World)",
                children: [
                  {name: "Кэшбэк до 5%", children: []},
                  {name: "Бесплатное обслуживание", children: []}
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Банковские вклады",
        children: [
          {
            name: "Срочный вклад",
            children: [
              {
                name: "Вклад \"Выгодный\"",
                children: [
                  {name: "Ставка до 7% годовых", children: []},
                  {name: "Капитализация процентов", children: []}
                ]
              },
              {
                name: "Вклад \"Накопительный\"",
                children: [
                  {name: "Ставка до 6.5% годовых", children: []},
                  {name: "Пополнение и частичное снятие", children: []}
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Кредитные продукты",
        children: [
          {
            name: "Потребительский кредит",
            children: []
          },
          {
            name: "Ипотека",
            children: [
              {
                name: "Ипотека на новостройки",
                children: [
                  {name: "С господдержкой", children: []},
                  {name: "Без первоначального взноса", children: []}
                ]
              },
              {
                name: "Ипотека на вторичное жилье",
                children: [
                  {name: "С фиксированной ставкой", children: []},
                  {name: "С возможностью досрочного погашения", children: []}
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Банковские карты для бизнеса",
        children: [
          {
            name: "Корпоративные карты",
            children: [
              {name: "Для расчетов с партнерами", children: []},
              {name: "Для командировочных расходов", children: []}
            ]
          },
          {
            name: "Бизнес кредитные карты",
            children: [
              {name: "С кэшбэком", children: []},
              {name: "С льготным периодом кредитования", children: []}
            ]
          }
        ]
      }

    ]
)

const el = ref()
useDraggable(el, list, {
  group: 'g1'
})

</script>
<style scoped>

</style>
