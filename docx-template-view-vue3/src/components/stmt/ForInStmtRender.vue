<script setup lang="tsx">
import { inject, onBeforeMount, provide, reactive, ref, toRaw, watchEffect } from 'vue';
import type { ForInStmtRendererProps } from '../@types/render'
import { evaluate } from '@/script/execute';
import ChooseRender from '../ChooseRender.vue';
import type { ExecutionContext } from '@/script/context';
import type { Environment } from '@/script/environment';

type Helper = {
  ctx: ExecutionContext | null
}

type Item = {
  ctxId: string
}

const props = defineProps<ForInStmtRendererProps>()
const env = inject(props.envId) as Environment

const ready = ref<boolean>(false)
const helper: Helper = {ctx: null}
const items = reactive<Item[]>([])

const clearItems = () => {
  const rawItems = toRaw(items)
  while (rawItems.length > 0) {
    const rawItem = rawItems.pop()!
    env.removeContext(rawItem.ctxId)
  }
}

const execute = () => {
  const ctx = env.getContext(props.ctxId)!
  helper.ctx = ctx.clone()
  ready.value = true
}

watchEffect(() => {
  if (!ready.value || !helper.ctx) {
    clearItems()
    return
  }
  clearItems()
  const ctx = helper.ctx
  const target = evaluate(ctx, props.target)
  if (target && Array.isArray(target)) {
    const declares = props.declareVariableExpr.declares;
    const step = (declares && declares.length > 0) ? declares.length : 1
    for (let i = 0, l = target.length; i < l ; i += step) {
      ctx.enterBlock()
      if (declares && declares.length > 0) {
        for (let j = 0, k = declares.length; j < k; ++j) {
          const declare = declares[j]!
          ctx.declareVariable(declare.variable.identifier)
          if (i + j < l) {
            ctx.assignVariable(declare.variable.identifier, target[i + j])
          } else {
            ctx.assignVariable(declare.variable.identifier, null)
          }
        }
      }
      items.push({ ctxId: env.addContext(ctx.clone()) })
      ctx.exitBlock()
    }
  }
})

onBeforeMount(() => {
  execute()
})
</script>

<template>
  <template v-if="ready">
    <template v-for="item in items">
      <template v-for="child in children">
        <ChooseRender :env-id="envId" :ctx-id="item.ctxId" :node="child" />
      </template>
    </template>
  </template>
</template>