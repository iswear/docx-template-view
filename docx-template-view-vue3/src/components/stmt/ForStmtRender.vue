<script setup lang="tsx">
import type { ForStmtRendererProps } from "@/components/@types/render";
import { evaluate } from "@/script/execute";
import { inject, nextTick, onBeforeMount, onMounted, reactive, ref, shallowRef, toRaw, watchEffect } from "vue";
import BlockStmtRender from "./BlockStmtRender.vue";
import type { ExecutionContext } from "@/script/context";
import type { Environment } from "@/script/environment";

type Helper = {
  ctx: ExecutionContext | null
}

type State = {
  refreshId: number
}

type Item = {
  ctxId: string
}

const props = defineProps<ForStmtRendererProps>()
const env = inject(props.envId) as Environment

const ready = ref<boolean>(false)
const helper: Helper = {ctx: null}
const state: State = {refreshId: 0}
const items = reactive<Item[]>([])

const clearItems = () => {
  const rawItems = toRaw(items);
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
  const refresh = () => {
    console.log("refresh")
    if (!ready.value || !helper.ctx) {
      clearItems()
      return
    }
    
    clearItems()
    const refreshId = state.refreshId + 1
    state.refreshId = refreshId

    const ctx = helper.ctx.clone()
    ctx.enterBlock()
    const ctxId = env.addContext(ctx)
    if (props.preExprList) {
      const exprList = props.preExprList
      for (let i = 0; i < exprList.length; ++i) {
        evaluate(ctx, exprList[i]!)
      }
    }

    const loop = () => {
      const test = !props.test || evaluate(ctx, props.test)
      if (state.refreshId === refreshId) {
         if (test) {
          console.log('count')
          items.push({
            ctxId: ctxId
          })

          nextTick().then(() => {
            if (props.postExprList) {
              const exprList = props.postExprList
              for (let i = 0; i < exprList.length; ++i) {
                evaluate(ctx, exprList[i]!)
              }
            }
            loop()
          })
        } else {
          ctx.exitBlock()
        }
      }
    }

    loop()
  }

  refresh()
})

onBeforeMount(() => {
  const ctx = env.getContext(props.ctxId)!
  ctx.enterBlock()
  execute()
})
onMounted(() => {
  const ctx = env.getContext(props.ctxId)!
  ctx.exitBlock()
})
</script>

<template>
  <template v-if="ready">
    <template v-for="item in items">
      <BlockStmtRender :env-id="envId" :ctx-id="item.ctxId" action="both" :children="children" />
    </template>
  </template>
</template>
