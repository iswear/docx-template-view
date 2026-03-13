<script setup lang="tsx">
import type { StmtRendererProps } from './@types/render'
import BlockRender from './stmt/BlockStmtRender.vue'
import ExprStmtRender from './stmt/ExprStmtRender.vue'
import ForInStmtRender from './stmt/ForInStmtRender.vue'
import ForStmtRender from './stmt/ForStmtRender.vue'
import IfStmtRender from './stmt/IfStmtRender.vue'

const props = defineProps<StmtRendererProps>()
</script>

<template>
  <template v-if="node.stmtType === 'block'">
    <BlockRender :env-id="envId" :ctx-id="ctxId" :children="node.children" action="both" />
  </template>
  <template v-else-if="node.stmtType === 'expr'">
    <ExprStmtRender :env-id="envId" :ctx-id="ctxId" :expr="node.expr" />
  </template>
  <template v-else-if="node.stmtType === 'for-in'">
    <ForInStmtRender :env-id="envId" :ctx-id="ctxId" :declare-variable-expr="node.declareVariableExpr" :target="node.target" :children="node.children" />
  </template>
  <template v-else-if="node.stmtType === 'for'">
    <ForStmtRender :env-id="envId" :ctx-id="ctxId" :pre-expr-list="node.preExprList" :test="node.test" :post-expr-list="node.postExprList" :children="node.children" />
  </template>
  <template v-else-if="node.stmtType === 'if'">
    <IfStmtRender :env-id="envId" :ctx-id="ctxId" :if-branch="node.ifBranch" :elif-branches="node.elifBranches" :else-branch="node.elseBranch" />
  </template>
  <template v-else>
    <p>元素stmtType错误：{{ (node as any).stmtType }}</p>
  </template>
</template>