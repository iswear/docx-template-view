<script setup lang="tsx">
import { inject, onBeforeMount, ref, watchEffect } from 'vue';
import type { IfStmtRendererProps, Node } from '../@types/render'
import type { ExecutionContext } from '@/script/context';
import { evaluate } from '@/script/execute';
import BlockStmtRender from './BlockStmtRender.vue';
import type { Environment } from '@/script/environment';

type Helper = {
  ctx: ExecutionContext | null,
  ctxId: string
}

const props = defineProps<IfStmtRendererProps>()
const env = inject(props.envId) as Environment

const ready = ref<boolean>(false)
const helper: Helper = {ctx: null, ctxId: ''}
const nodes = ref<Node[]>([])

watchEffect(() => {
  if (!ready.value || !helper.ctx) {
    nodes.value = []
    return
  }

  if (evaluate(helper.ctx, props.ifBranch.test)) {
    nodes.value = props.ifBranch.children
    return
  }
  if (props.elifBranches) {
    const elifBranches = props.elifBranches
    for (let i = 0; i < elifBranches.length; ++i) {
      const elifBranch = elifBranches[i]!
      if (evaluate(helper.ctx, elifBranch.test)) {
        nodes.value = elifBranch.children
        return
      }
    }
  }
  if (props.elseBranch) {
    nodes.value = props.elseBranch.children
  }
})

const execute = function () {
  const ctx = env.getContext(props.ctxId)!
  helper.ctx = ctx.clone()
  helper.ctxId = env.addContext(helper.ctx)
  ready.value = true
}

onBeforeMount(() => {
  execute()
})
</script>

<template>
  <template v-if="ready">
    <BlockStmtRender :env-id="envId" :ctx-id="helper.ctxId" action="both" :children="nodes" />
  </template>
</template>