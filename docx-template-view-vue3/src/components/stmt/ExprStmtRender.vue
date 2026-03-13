<script setup lang="tsx">
import { onBeforeMount, inject, ref, computed, watchEffect } from 'vue'
import type { ExprStmtRendererProps } from '../@types/render'
import { assign, evaluate } from '@/script/execute'
import type { ExecutionContext } from '@/script/context'
import type { Environment } from '@/script/environment'
import type { AssignmentExpr, Expr } from '@/script/@types/expr'

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
const factory = env.getComponentFactory()
const content = () => {
  if (props.expr.kind === 'expr:function-call') {
    if (props.expr.function === 'interpolate') {
      const args = props.expr.args
      if (args && args.length > 0) {
        const arg0 = args[0]!
        if (arg0.kind === 'expr:function-call') {
          if (arg0.function === 'text') {
            return renderText(helper.ctx!, arg0)
          } else if (arg0.function === 'image') {
            return renderImage(helper.ctx!, arg0)
          } else if (arg0.function === 'link') {
            return renderLink(helper.ctx!, arg0)
          } else {
            return renderText(helper.ctx!, arg0)
          }
        } else if (arg0.kind === 'expr:access') {
          if (arg0.targetAccessor.type === 'property-accessor' || arg0.targetAccessor.type === 'property-or-element-accessor') {
            return renderText(helper.ctx!, arg0)
          } else {
            return <span>{ evaluate(helper.ctx!, arg0) }</span>
          }
        } else if (arg0.kind === 'expr:variable') {
          return renderText(helper.ctx!, arg0)
        } else {
          return <span>{ evaluate(helper.ctx!, arg0) }</span>
        }
      } else {
        return <></>
      }
    } else {
      return <></>
    }
  }
  return <></>
}

function renderText(ctx: ExecutionContext, expr: Expr): any {
  if (!(expr.kind === 'expr:function-call' && expr.function === 'text')) {
    return <span>{ evaluate(ctx, expr) }</span>
  }

  const args = expr.args
  if (args.length === 0) {
    return <></>
  } else if (args.length === 1) {
    return <span>{ evaluate(ctx, args[0]!) }</span>
  } else {
    const valueExpr = args[0]!
    const value = valueExpr ? evaluate(ctx, valueExpr) : null
    const configExpr = args[1]!
    const config = configExpr ? evaluate(ctx, configExpr) : null

    if (!config || !config.editable) {
      return <span>value</span>
    }

    
    const update = (value: any) => {
      if (valueExpr.kind === 'expr:access') {
        if (valueExpr.targetAccessor.type === 'property-accessor' || valueExpr.targetAccessor.type === 'property-or-element-accessor') {
          assign(ctx, valueExpr, value)
          return
        }
      } else if (valueExpr.kind === 'expr:variable') {
        assign(ctx, valueExpr, value)
        return
      }
      throw new Error('不能改变')
    }

    const onUpdateListeners: ((value: any) => void)[] = []
    const onUpdate = (callback: (value: any) => void) => {
      onUpdateListeners.push(callback)
    }

    watchEffect(() => {
      const value = evaluate(ctx, valueExpr)
      for (let i = 0; i < onUpdateListeners.length; ++i) {
        try {
          onUpdateListeners[i]!(value)
        } catch { }
      }
    })

    console.log("数值是多少呢", value)
    return factory('text', value, config, update, onUpdate)
  }
}

function renderImage(ctx: ExecutionContext, valueExpr: Expr): any {
  // todo!!!

}

function renderLink(ctx: ExecutionContext, valueExpr: Expr): any {
  // todo!!!
}

const execute = () => {
  const ctx = env.getContext(props.ctxId)!
  helper.ctx = ctx.clone()
  if (props.expr.kind === 'expr:function-call') {
    if (props.expr.function === 'interpolate') {
      ready.value = true
      return
    }
  }
  evaluate(helper.ctx, props.expr)
  ready.value = true
}

onBeforeMount(() => {
  execute()
})
</script>

<template>
  <template v-if="ready">
    <content />
    <!-- <template v-if="content.type === 'text'">
      <span> {{ content.text }} </span>
    </template>
    <template v-else-if="content.type === 'image'">
      <img :src="content.src" />
    </template>
    <template v-else-if="content.type === 'link'">
      <a :href="content.href">{{ content.text }}</a>
    </template> -->
  </template>
</template>