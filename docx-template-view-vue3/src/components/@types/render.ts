import type { DeclareVariableExpr, Expr } from "@/script/@types/expr"

export type DocxRendererProps = {
  envId: string
  ctxId: string
  template: DocxRendererTemplate
}

export type DocxRendererTemplate = {
  layout: {
    pageWidth: number,
    marginTop: number,
    marginRight: number,
    marginBottom: number,
    marginLeft: number
  },
  nodes: DocxNode[]
  children?: DocxBodyRendererProps[]
}

export type DocxBodyRendererProps = {
  envId: string
  ctxId: string
  model: string
  nodes: DocxNode[]
}

export type ChooseRendererProps = {
  envId: string
  ctxId: string
  node: DocxNode

}

export type HtmlRendererProps = {
  envId: string
  ctxId: string
  node: HtmlIgnore | HtmlTd | HtmlOthers
}

export type StmtRendererProps = {
  envId: string,
  ctxId: string,
  node: BlockStmtNode | ExprStmtNode | ForInStmtNode | ForStmtNode | IfStmtNode
}

export type BlockStmtRendererProps = {
  envId: string
  ctxId: string
  action: 'enter' | 'exit' | 'both'
  children: DocxNode[]
}

export type ExprStmtRendererProps = {
  envId: string
  ctxId: string
  expr: Expr
}

export type ForInStmtRendererProps = {
  envId: string
  ctxId: string
  declareVariableExpr: DeclareVariableExpr
  target: Expr
  children: DocxNode[]
}

export type ForStmtRendererProps = {
  envId: string
  ctxId: string
  preExprList: Expr[]
  test?: Expr
  postExprList: Expr[]
  children: DocxNode[]
}

export type IfStmtRendererProps = {
  envId: string
  ctxId: string
  ifBranch: {
    test: Expr
    children: DocxNode[]
  },
  elifBranches: {
    test: Expr
    children: DocxNode[]
  }[],
  elseBranch: {
    children: DocxNode[]
  }
}

export type ComponentFactory = (type: string, value: any, config: any) => any 

export type DocxNode = HtmlIgnore | HtmlTd | HtmlOthers | BlockStmtNode | ExprStmtNode | ForInStmtNode | ForStmtNode | IfStmtNode

export type HtmlIgnore = {
  schema: 'XML'
  htmlType: 'ignore'
  javaType: string
  style: string
  children: DocxNode[]
}

export type HtmlTd = {
  schema: 'XML'
  htmlType: 'td'
  javaType: string
  style: string
  children: DocxNode[]
  text?: string
  rowSpan: number
  colSpan: number
}

export type HtmlOthers = {
  schema: 'XML'
  htmlType: 'p' | 'table' | 'tr' | 'span'
  javaType: string
  style: string
  children: DocxNode[]
  text?: string
}

export type BlockStmtNode = {
  schema: 'STMT'
  stmtType: 'block'
  children: DocxNode[]
}

export type ExprStmtNode = {
  schema: 'STMT'
  stmtType: 'expr'
  expr: Expr
}

export type ForInStmtNode = {
  schema: 'STMT'
  stmtType: 'for-in'
  declareVariableExpr: DeclareVariableExpr
  target: Expr
  children: DocxNode[]
}

export type ForStmtNode = {
  schema: 'STMT'
  stmtType: 'for'
  preExprList: Expr[]
  test: Expr
  postExprList: Expr[]
  children: DocxNode[]
}

export type IfStmtNode = {
  schema: 'STMT'
  stmtType: 'if'
  ifBranch: {
    test: Expr
    children: DocxNode[]
  },
  elifBranches: {
    test: Expr
    children: DocxNode[]
  }[],
  elseBranch: {
    children: DocxNode[]
  }
}