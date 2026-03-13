<script setup lang="tsx">
import { provide } from "vue";
import { init } from "@/script/environment";
import { data } from "@/mock/demo1-test";
import DocxRenderer from "@/components/DocxRender.vue";

const docxTemplate = data as any;
const docxModel = {
  order: {
    orderNo: "hello order no hehehe",
    count: 10,
  },
  report: {},
  config: {},
};

const initResult = init({}, docxModel, (type) => {
  return <div>测试</div>
});
provide(initResult.environmentId, initResult.environment);

const componentFactory = () => {
  
}
</script>

<template>
  <DocxRenderer
    :env-id="initResult.environmentId"
    :ctx-id="initResult.contextId"
    :template="docxTemplate"
    :component-factory="componentFactory"
  />
</template>

<style scoped></style>
