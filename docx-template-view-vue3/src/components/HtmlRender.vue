<script setup lang="tsx">
import type { HtmlRendererProps } from './@types/render'
import ChooseRender from './ChooseRender.vue'

const props = defineProps<HtmlRendererProps>()
</script>

<template>
  <template v-if="node.htmlType === 'ignore'">
    <template v-for="child in node.children">
      <ChooseRender :env-id="envId" :ctx-id="ctxId" :node="child" />
    </template>
  </template>
  <template v-else-if="node.htmlType === 'td'">
    <td class="docx-td" :style="node.style" :rowspan="node.rowSpan" :colspan="node.colSpan">
      <template v-if="!node.children || node.children.length === 0">
      &nbsp;
      </template>
      <template v-else>
        <template v-for="child in node.children">
          <ChooseRender :env-id="envId" :ctx-id="ctxId" :node="child" />
        </template>
      </template>
    </td>
  </template>
  <template v-else>
    <component :is="node.htmlType" :class="'docx-' + node.htmlType" :style="node.style">
      {{ node.text }}
      <template v-for="child in node.children">
        <ChooseRender :env-id="envId" :ctx-id="ctxId" :node="child" />
      </template>
    </component>
  </template>
</template>

<style scoped>
.docx-p {
  margin: 0;
  padding: 0;
}
</style>