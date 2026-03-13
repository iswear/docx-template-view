<script setup lang="tsx">
import { computed, inject, watchEffect } from 'vue';
import type { DocxRendererProps } from './@types/render'
import type { Environment } from '@/script/environment';
import ChooseRender from './ChooseRender.vue'
import DocxBodyRender from './DocxBodyRender.vue';

const props = defineProps<DocxRendererProps>()
const env = inject(props.envId) as Environment

const pageStyle = computed(() => {
  const layout = props.template?.layout
  if (!layout) {
    return ''
  }
  var rules: string[] = [
    'width: ' + layout.pageWidth + 'px',
    'padding-top: ' + layout.marginTop + 'px',
    'padding-right: ' + layout.marginRight + 'px',
    'padding-bottom: ' + layout.marginBottom + 'px',
    'padding-left: ' + layout.marginLeft + 'px'
  ]
  return rules.join('; ')
})

watchEffect(() => {
  const children = props.template.children
  if (children) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i]!
      if (!env.getPropertyOfScopedModel(child.model)) {
        env.setPropertyOfScopedModel(child.model, {})
      }
    }
  }
})

</script>

<template>
  <div class="docx-page" :style="pageStyle">
    <template v-for="node in template.nodes">
      <ChooseRender :env-id="envId" :ctx-id="ctxId" :node="node" />
    </template>
    <template v-for="child in template.children">
      <DocxBodyRender :env-id="envId" :ctx-id="ctxId" :model="child.model" :nodes="child.nodes" />
    </template>
  </div>
</template>

<style lang="css" scoped>
.docx-page {
  margin: auto;
  position: relative;
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}
</style>
