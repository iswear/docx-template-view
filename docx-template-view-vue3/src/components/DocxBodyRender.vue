<script setup lang="tsx">
import { inject, provide } from 'vue';
import type { DocxBodyRendererProps } from './@types/render';
import { init, type Environment } from '@/script/environment';
import ChooseRender from './ChooseRender.vue';

const props = defineProps<DocxBodyRendererProps>()
const env = inject(props.envId) as Environment

const initResult = init(env.getGlobalModel(), env.getPropertyOfScopedModel(props.model), env.getComponentFactory())
provide(initResult.environmentId, initResult.environment)
</script>

<template>
  <template v-for="node in props.nodes">
    <ChooseRender :env-id="initResult.environmentId" :ctx-id="initResult.contextId" :node="node" />
  </template>
</template>