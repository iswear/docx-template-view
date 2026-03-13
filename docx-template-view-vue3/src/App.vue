<script setup lang="tsx">
import { provide, reactive, ref, watch } from "vue";
import { init } from "@/script/environment";
import { data } from "@/mock/form-text";
import DocxRenderer from "@/components/DocxRender.vue";

const docxTemplate = data as any;
const docxModel = reactive({
  order: {
    orderNo: "hello order no hehehe",
    count: 10,
  },
  report: {},
  config: {},
});

const initResult = init({}, docxModel, (type, value, config, update, onUpdate) => {
  if (type === 'text') {
    const valueRef = ref<string>(value)
    watch(valueRef, (val, oldVal) => {
      update(val)
    })

    return <input value={valueRef.value} onInput={(e) => valueRef.value = (e.target as HTMLInputElement).value} />
  } else {
    return <div>测试</div>
  }
});
provide(initResult.environmentId, initResult.environment);

/************** 以下为测试代码 *************/
function onchange() {
  docxModel.order.orderNo = Date.now() + 'abcd'
}
</script>

<template>
  <button @click="onchange">click to change orderno</button>
  {{ docxModel.order.orderNo }}
  <DocxRenderer
    :env-id="initResult.environmentId"
    :ctx-id="initResult.contextId"
    :template="docxTemplate"
    :component-factory="componentFactory"
  />
</template>

<style scoped></style>
