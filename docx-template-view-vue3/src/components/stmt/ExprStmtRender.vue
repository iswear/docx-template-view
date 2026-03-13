<script setup lang="tsx">
import { onBeforeMount, inject, ref, computed } from 'vue'
import type { ExprStmtRendererProps } from '../@types/render'
import { evaluate } from '@/script/execute'
import type { ExecutionContext } from '@/script/context'
import type { Environment } from '@/script/environment'

type Helper = {
  ctx: ExecutionContext | null
}

type None = {
  type: 'none'
}

type Text = {
  type: 'text',
  text: string
}

type Image = {
  type: 'image',
  src: string
}

type Link = {
  type: 'link',
  href: string,
  text: string
}

const props = defineProps<ExprStmtRendererProps>()
const env = inject(props.envId) as Environment

const ready = ref<boolean>(false)
const helper: Helper = {ctx: null} 
const content = computed((): None | Text | Image | Link => {
  if (!ready.value || !helper.ctx) {
    return {
      type: 'none'
    }
  }
  if (props.expr.kind === 'expr:function-call') {
    if (props.expr.function === 'interpolate') {
      const args = props.expr.args
      if (args && args.length > 0) {
        const arg0 = args[0]!
        if (arg0.kind === 'expr:function-call') {
          if (arg0.function === 'text') {
            // todo!!! 这里需要实现输入组件
            return {
              type: 'text',
              text: evaluate(helper.ctx, arg0)
            }
          } else if (arg0.function === 'image') {
            // todo!!! 这里需要实现输入组件
            return {
              type: 'image',
              src: evaluate(helper.ctx, arg0)
            }
          } else if (arg0.function === 'link') {
            // todo!!! 这里需要实现输入组件
            return {
              type: 'link',
              href: '',
              text: ''
            }
          }
        }
        return {
          type: 'text',
          text: evaluate(helper.ctx, arg0)
        }
      }
      return {
        type: 'text',
        text: ''
      }
    }
  }
  return {
    type: 'none'
  }
})

const execute = () => {
  const ctx = env.getContext(props.ctxId)!
  helper.ctx = ctx.clone()
  if (props.expr.kind === 'expr:function-call') {
    if (props.expr.function === 'interpolate') {
      ready.value = true
      return
    }
  }
  console.log('执行')
  evaluate(helper.ctx, props.expr)
  ready.value = true
}

onBeforeMount(() => {
  execute()
})
</script>

<template>
  <template v-if="ready">
    <template v-if="content.type === 'text'">
      <span> {{ content.text }} </span>
    </template>
    <template v-else-if="content.type === 'image'">
      <img :src="content.src" />
    </template>
    <template v-else-if="content.type === 'link'">
      <a :href="content.href">{{ content.text }}</a>
    </template>
  </template>
</template>