<script setup lang="tsx">
import type { ChooseRendererProps } from './@types/render'
import HtmlRender from './HtmlRender.vue'
import StmtRender from './StmtRender.vue'

const props = defineProps<ChooseRendererProps>()
</script>

<template>
  <template v-if="node.schema === 'XML'">
    <HtmlRender :env-id="envId" :ctx-id="ctxId" :node="node" />
  </template>
  <template v-else-if="node.schema === 'STMT'">
    <StmtRender :env-id="envId" :ctx-id="ctxId" :node="node" />
  </template>
  <template v-else>
    <p>元素schema错误：{{ (node as any).schema }}</p>
  </template>
</template>