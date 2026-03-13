<script setup lang="tsx">
import { onBeforeMount, onMounted, inject, ref } from "vue";
import type { BlockStmtRendererProps } from "../@types/render";
import ChooseRender from "../ChooseRender.vue";
import type { Environment } from "@/script/environment";

type Helper = {
  ctxId: string
}

const props = defineProps<BlockStmtRendererProps>()
const env = inject(props.envId) as Environment

const ready = ref<boolean>(false)
const helper: Helper = {ctxId: ""}

onBeforeMount(() => {
  const ctx = env.getContext(props.ctxId)!
  if (props.action === "enter" || props.action === "both") {
    ctx.enterBlock()
    const newCtx = ctx.clone()
    const newCtxId = env.addContext(newCtx)
    helper.ctxId = newCtxId
  }
  ready.value = true
});
onMounted(() => {
  const ctx = env.getContext(props.ctxId)!
  if (props.action === "exit" || props.action === "both") {
    ctx.exitBlock()
  }
});
</script>

<template>
  <template v-if="ready">
    <ChooseRender v-for="child in children" :env-id="envId" :ctx-id="helper.ctxId" :node="child" />
  </template>
</template>
