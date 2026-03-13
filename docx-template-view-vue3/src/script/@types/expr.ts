export type Expr = DeclareVariableExpr | 
  AssignmentExpr | 
  TernaryExpr | 
  LogicalOrExpr | 
  LogicalAndExpr | 
  BitwiseOrExpr | 
  BitwiseXorExpr | 
  BitwiseAndExpr | 
  EqualityExpr |
  RelationalExpr |
  ShiftExpr |
  AdditiveExpr |
  MultiplicativeExpr |
  LogicalNotExpr |
  PositiveExpr |
  NegativeExpr |
  BitwiseNotExpr |
  PrefixIncrExpr |
  PrefixDecrExpr |
  PostfixIncrExpr |
  PostfixDecrExpr |
  AccessExpr |
  FunctionCallExpr |
  ParenthesesExpr |
  ConstMapExpr |
  ConstArrayExpr |
  VariableExpr |
  ConstNullExpr |
  ConstBooleanExpr |
  ConstIntegerExpr |
  ConstFloatExpr |
  ConstStringExpr 

export type DeclareVariableExpr = {
  kind: 'expr:declare-variable',
  declares: {
    variable: VariableExpr,
    value: Expr
  }[]
}

export type AssignmentExpr = {
  kind: 'expr:assignment',
  target: Expr,
  operator: string,
  value: Expr
}

export type TernaryExpr = {
  kind: 'expr:ternary',
  test: Expr,
  yes: Expr,
  no: Expr
}

export type LogicalOrExpr = {
  kind: 'expr:logical-or',
  tests: Expr[]
}

export type LogicalAndExpr = {
  kind: 'expr:logical-and',
  tests: Expr[]
}

export type BitwiseOrExpr = {
  kind: 'expr:bitwise-or',
  leftSide: Expr,
  rightSides: Expr[]
}

export type BitwiseXorExpr = {
  kind: 'expr:bitwise-xor',
  leftSide: Expr,
  rightSides: Expr[]
}

export type BitwiseAndExpr = {
  kind: 'expr:bitwise-and',
  leftSide: Expr,
  rightSides: Expr[]
}

export type EqualityExpr = {
  kind: 'expr:equality',
  leftSide: Expr,
  rightSides: {
    operator: string,
    value: Expr
  }[]
}

export type RelationalExpr = {
  kind: 'expr:relational',
  leftSide: Expr,
  operator: string,
  rightSide: Expr
}

export type ShiftExpr = {
  kind: 'expr:shift',
  operand: Expr,
  rightSides: {
    operator: string,
    amount: Expr
  }[]
}

export type AdditiveExpr = {
  kind: 'expr:additive',
  augend: Expr,
  rightSides: {
    operator: string,
    addend: Expr
  }[]
}

export type MultiplicativeExpr = {
  kind: 'expr:multiplicative',
  multiplicand: Expr,
  rightSides: {
    operator: string,
    multiplier: Expr
  }[]
}

export type LogicalNotExpr = {
  kind: 'expr:logical-not',
  target: Expr
}

export type PositiveExpr = {
  kind: 'expr:positive',
  target: Expr
}

export type NegativeExpr = {
  kind: 'expr:negative',
  target: Expr
}

export type BitwiseNotExpr = {
  kind: 'expr:bitwise-not',
  target: Expr
}

export type PrefixIncrExpr = {
  kind: 'expr:prefix-increment',
  target: Expr
}

export type PrefixDecrExpr = {
  kind: 'expr:prefix-decrement',
  target: Expr
}

export type PostfixIncrExpr = {
  kind: 'expr:postfix-increment',
  target: Expr
}

export type PostfixDecrExpr = {
  kind: 'expr:postfix-decrement',
  target: Expr
}

export type AccessExpr = {
  kind: 'expr:access',
  root: Expr,
  chainedAccessors: (MethodInvoker | PropertyAccessor | PropertyOrElementAccessor)[],
  targetAccessor: (MethodInvoker | PropertyAccessor | PropertyOrElementAccessor)
}

export type MethodInvoker = {
  type: 'method-invoker',
  optional: boolean,
  method: string,
  args: Expr[]
}

export type PropertyAccessor = {
  type: 'property-accessor',
  optional: boolean,
  name: string
}

export type PropertyOrElementAccessor = {
  type: 'property-or-element-accessor',
  optional: boolean,
  nameOrIndex: string | number
}

export type FunctionCallExpr = {
  kind: 'expr:function-call',
  optional: boolean,
  function: string,
  args: Expr[]
}

export type ParenthesesExpr = {
  kind: 'expr:parentheses',
  target: Expr
}

export type ConstMapExpr = {
  kind: 'expr:const-map',
  entries: {
    key: string,
    value: Expr
  }[]
}

export type ConstArrayExpr = {
  kind: 'expr:const-array',
  elements: Expr[]
}

export type VariableExpr = {
  kind: 'expr:variable',
  identifier: string
}

export type ConstNullExpr = {
  kind: 'expr:const-null'
}

export type ConstBooleanExpr = {
  kind: 'expr:const-boolean',
  value: boolean
}

export type ConstIntegerExpr = {
  kind: 'expr:const-integer',
  value: number
}

export type ConstFloatExpr = {
  kind: 'expr:const-float',
  value: number
}

export type ConstStringExpr = {
  kind: 'expr:const-string'
  value: string
}
