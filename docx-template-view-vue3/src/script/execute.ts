import type { ExecutionContext } from "./context"
import type { Expr, DeclareVariableExpr, AssignmentExpr, TernaryExpr, LogicalOrExpr, LogicalAndExpr, BitwiseOrExpr, BitwiseXorExpr, EqualityExpr, BitwiseAndExpr, RelationalExpr, ShiftExpr, AdditiveExpr, MultiplicativeExpr, LogicalNotExpr, PositiveExpr, NegativeExpr, BitwiseNotExpr, PrefixIncrExpr, PrefixDecrExpr, PostfixIncrExpr, PostfixDecrExpr, AccessExpr, FunctionCallExpr, ConstFloatExpr, ConstStringExpr, ConstBooleanExpr, ConstIntegerExpr, ConstNullExpr, VariableExpr, ConstArrayExpr, ConstMapExpr, ParenthesesExpr } from "./@types/expr"

function evaluateDeclareVariableExpr(ctx: ExecutionContext, expr: DeclareVariableExpr): any {
  if (expr.declares) {
    const declares = expr.declares
    for (let i = 0; i < declares.length; ++i) {
      const declare = declares[i]!
      if (ctx.hasVariable(declare.variable.identifier)) {
        throw new Error("Variable '" + declare.variable.identifier + "' has already defined.")
      }
      ctx.declareVariable(declare.variable.identifier)
      if (declare.value) {
        ctx.assignVariable(declare.variable.identifier, evaluate(ctx, declare.value))
      }
    }
  }
  return null
}

function evaluateAssignmentExpr(ctx: ExecutionContext, expr: AssignmentExpr): any {
  const rValue = evaluate(ctx, expr.value)
  if (expr.operator === '=') {
    assign(ctx, expr.target, rValue)
    return rValue
  } else if (expr.operator === '+=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue + rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '-=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue - rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '*=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue * rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '/=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue / rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '%=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue % rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '&=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue & rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '^=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue ^ rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '|=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue | rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '<<=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue << rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '>>=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue >> rValue
    assign(ctx, expr.target, value)
    return value
  } else if (expr.operator === '>>>=') {
    const tValue = evaluate(ctx, expr.target)
    const value = tValue >>> rValue
    assign(ctx, expr.target, value)
    return value
  } else {
    throw new Error("error")
  }
}

function evaluateTernaryExpr(ctx: ExecutionContext, expr: TernaryExpr): any {
  return evaluate(ctx, expr.test) ? evaluate(ctx, expr.yes) : evaluate(ctx, expr.no)
}

function evaluateLogicalOrExpr(ctx: ExecutionContext, expr: LogicalOrExpr): any {
  const tests = expr.tests
  for (let i = 0; i < tests.length; ++i) {
    if (evaluate(ctx, tests[i]!)) {
      return true
    }
  }
  return false
}

function evaluateLogicalAndExpr(ctx: ExecutionContext, expr: LogicalAndExpr): any {
  const tests = expr.tests
  for (let i = 0; i < tests.length; ++i) {
    if (!evaluate(ctx, tests[i]!)) {
      return true
    }
  }
  return false
}

function evaluateBitwiseOrExpr(ctx: ExecutionContext, expr: BitwiseOrExpr): any {
  let lValue = evaluate(ctx, expr.leftSide)
  const rightSides = expr.rightSides
  for (let i = 0; i < rightSides.length; ++i) {
    const rightSide = rightSides[i]!
    const rValue = evaluate(ctx, rightSide)
    lValue = lValue | rValue
  }
  return lValue
}

function evaluateBitwiseXorExpr(ctx: ExecutionContext, expr: BitwiseXorExpr): any {
  let lValue = evaluate(ctx, expr.leftSide)
  const rightSides = expr.rightSides
  for (let i = 0; i < rightSides.length; ++i) {
    const rightSide = rightSides[i]!
    const rValue = evaluate(ctx, rightSide)
    lValue = lValue ^ rValue
  }
  return lValue
}

function evaluateBitwiseAndExpr(ctx: ExecutionContext, expr: BitwiseAndExpr): any {
  let lValue = evaluate(ctx, expr.leftSide)
  const rightSides = expr.rightSides
  for (let i = 0; i < rightSides.length; ++i) {
    const rightSide = rightSides[i]!
    const rValue = evaluate(ctx, rightSide)
    lValue = lValue & rValue
  }
  return lValue
}

function evaluateEqualityExpr(ctx: ExecutionContext, expr: EqualityExpr): any {
  let lValue = evaluate(ctx, expr.leftSide)
  const rightSides = expr.rightSides
  for (let i = 0; i < rightSides.length; ++i) {
    const rightSide = rightSides[i]!
    const rValue = evaluate(ctx, rightSide.value)
    if (rightSide.operator === '==') {
      lValue = lValue === rValue
    } else if (rightSide.operator === '!=') {
      lValue = lValue !== rValue
    } else {
      throw new Error("error")
    }
  }
  return lValue
}

function evaluateRelationalExpr(ctx: ExecutionContext, expr: RelationalExpr): any {
  const lValue = evaluate(ctx, expr.leftSide)
  const rValue = evaluate(ctx, expr.rightSide)
  if (expr.operator === '<') {
    return lValue < rValue
  } else if (expr.operator === '<=') {
    return lValue <= rValue
  } else if (expr.operator === '>') {
    return lValue > rValue
  } else if (expr.operator === '>=') {
    return lValue >= rValue
  } else {
    throw new Error('error')
  }
}

function evaluateShiftExpr(ctx: ExecutionContext, expr: ShiftExpr): any {
  let value = evaluate(ctx, expr.operand)
  const rightSides = expr.rightSides
  for (let i = 0; i < rightSides.length; ++i) {
    const rightSide = rightSides[i]!
    if (rightSide.operator === '<<') {
      value = value << evaluate(ctx, rightSide.amount)
    } else if (rightSide.operator === '>>') {
      value = value >> evaluate(ctx, rightSide.amount)
    } else if (rightSide.operator === '>>>') {
      value = value >>> evaluate(ctx, rightSide.amount)
    } else {
      throw new Error("error")
    }
  }
  return value
}

function evaluateAdditiveExpr(ctx: ExecutionContext, expr: AdditiveExpr): any {
  let value = evaluate(ctx, expr.augend)
  const rightSides = expr.rightSides
  for (let i = 0; i < rightSides.length; ++i) {
    const rightSide = rightSides[i]!
    if (rightSide.operator === '+') {
      value = value + evaluate(ctx, rightSide.addend)
    } else if (rightSide.operator === '-') {
      value = value - evaluate(ctx, rightSide.addend)
    } else {
      throw new Error('error')
    }
  }
  return value
}

function evaluateMultiplicativeExpr(ctx: ExecutionContext, expr: MultiplicativeExpr): any {
  let value = evaluate(ctx, expr.multiplicand)
  const rightSides = expr.rightSides
  for (let i = 0; i < rightSides.length; ++i) {
    const rightSide = rightSides[i]!
    if (rightSide.operator === '*') {
      value = value * evaluate(ctx, rightSide.multiplier)
    } else if (rightSide.operator === '/') {
      value = value / evaluate(ctx, rightSide.multiplier)
    } else if (rightSide.operator === '%') {
      value = value % evaluate(ctx, rightSide.multiplier)
    } else {
      throw new Error('error')
    }
  }
  return value
}

function evaluateLogicalNotExpr(ctx: ExecutionContext, expr: LogicalNotExpr): any {
  return !evaluate(ctx, expr.target)
}

function evaluatePositiveExpr(ctx: ExecutionContext, expr: PositiveExpr): any {
  return evaluate(ctx, expr.target)
}

function evaluateNegativeExpr(ctx: ExecutionContext, expr: NegativeExpr): any {
  return -evaluate(ctx, expr.target)
}

function evaluateBitwiseNotExpr(ctx: ExecutionContext, expr: BitwiseNotExpr): any {
  return ~evaluate(ctx, expr.target)
}

function evaluatePrefixIncrExpr(ctx: ExecutionContext, expr: PrefixIncrExpr): any {
  const value = evaluate(ctx, expr.target) + 1
  assign(ctx, expr.target, value)
  return value
}

function evaluatePrefixDecrExpr(ctx: ExecutionContext, expr: PrefixDecrExpr): any {
  const value = evaluate(ctx, expr.target) - 1
  assign(ctx, expr.target, value)
  return value
}

function evaluatePostfixIncrExpr(ctx: ExecutionContext, expr: PostfixIncrExpr): any {
  const value = evaluate(ctx, expr.target)
  assign(ctx, expr.target, value + 1)
  return value
}

function evaluatePostfixDecrExpr(ctx: ExecutionContext, expr: PostfixDecrExpr): any {
  const value = evaluate(ctx, expr.target)
  assign(ctx, expr.target, value - 1)
  return value
}

function evaluateAccessExpr(ctx: ExecutionContext, expr: AccessExpr): any {
  let target = evaluate(ctx, expr.root)
  if (expr.chainedAccessors) {
    const chainedAccessors = expr.chainedAccessors
    for (let i = 0; i < chainedAccessors.length; ++i) {
      const chainedAccessor = chainedAccessors[i]!
      if (target) {
        if (chainedAccessor.type === 'method-invoker') {
          const args = []
          const methodArgs = chainedAccessor.args
          for (let i = 0; i < methodArgs.length; ++i) {
            args.push(evaluate(ctx, methodArgs[i]!))
          }
          target = target[chainedAccessor.method](...args)
        } else if (chainedAccessor.type === 'property-accessor') {
          target = target[chainedAccessor.name]
        } else if (chainedAccessor.type === 'property-or-element-accessor') {
          target = target[chainedAccessor.nameOrIndex]
        } else {
          throw new Error("error")
        }
        continue
      }
      if (chainedAccessor.optional) {
        return null
      } else {
        throw new Error('error')
      }
    }
  }
  if (target) {
    if (expr.targetAccessor.type === 'method-invoker') {
      const args = []
      const methodArgs = expr.targetAccessor.args
      for (let i = 0; i < methodArgs.length; ++i) {
        args.push(evaluate(ctx, methodArgs[i]!))
      }
      return target[expr.targetAccessor.method](...args)
    } else if (expr.targetAccessor.type === 'property-accessor') {
      return target[expr.targetAccessor.name]
    } else if (expr.targetAccessor.type === 'property-or-element-accessor') {
      return target[expr.targetAccessor.nameOrIndex]
    } else {
      throw new Error("error")
    }
  } else {
    if (expr.targetAccessor.optional) {
      return null
    } else {
      throw new Error('error')
    }
  }
}

function evaluateFunctionCallExpr(ctx: ExecutionContext, expr: FunctionCallExpr): any {
  const func = ctx.getFunction(expr.function)
  if (func) {
    const args = []
    const funcArgs = expr.args
    for (let i = 0; i < funcArgs.length; ++i) {
      args.push(evaluate(ctx, funcArgs[i]!))
    }
    return func(...args)
  }
  if (expr.optional) {
    return null
  } else {
    throw new Error('error')
  }
}

function evaluateParenthesesExpr(ctx: ExecutionContext, expr: ParenthesesExpr): any {
  return evaluate(ctx, expr.target)
}

function evaluateConstMapExpr(ctx: ExecutionContext, expr: ConstMapExpr): any {
  const ret: any = {}
  const entries = expr.entries
  for (let i = 0; i < entries.length; ++i) {
    const entry = entries[i]!
    ret[entry.key] = evaluate(ctx, entry.value)
  }
  return ret
}

function evaluateConstArrayExpr(ctx: ExecutionContext, expr: ConstArrayExpr): any {
  const ret = []
  const elements = expr.elements
  for (let i = 0; i < elements.length; ++i) {
    ret.push(evaluate(ctx, elements[i]!))
  }
  return ret
}

function evaluateVariableExpr(ctx: ExecutionContext, expr: VariableExpr): any {
  if (ctx.hasVariable(expr.identifier)) {
    return ctx.getVariable(expr.identifier)
  } else {
    throw new Error("Variable '" + expr.identifier + "' is not defined.")
  }
}

function evaluateConstNullExpr(ctx: ExecutionContext, expr: ConstNullExpr): any {
  return null
}

function evaluateConstBooleanExpr(ctx: ExecutionContext, expr: ConstBooleanExpr): any {
  return expr.value
}

function evaluateConstIntegerExpr(ctx: ExecutionContext, expr: ConstIntegerExpr): any {
  return expr.value
}

function evaluateConstFloatExpr(ctx: ExecutionContext, expr: ConstFloatExpr): any {
  return expr.value
}

function evaluateConstStringExpr(ctx: ExecutionContext, expr: ConstStringExpr): any {
  return expr.value
}

function assignAccessExpr(ctx: ExecutionContext, expr: AccessExpr, value: any): void {
  let target = evaluate(ctx, expr.root)
  if (expr.chainedAccessors) {
    const chainedAccessors = expr.chainedAccessors
    for (let i = 0; i < chainedAccessors.length; ++i) {
      const chainedAccessor = chainedAccessors[i]!
      if (target) {
        if (chainedAccessor.type === 'method-invoker') {
          const args = []
          const methodArgs = chainedAccessor.args
          for (let i = 0; i < methodArgs.length; ++i) {
            args.push(evaluate(ctx, methodArgs[i]!))
          }
          target = target[chainedAccessor.method](...args)
        } else if (chainedAccessor.type === 'property-accessor') {
          target = target[chainedAccessor.name]
        } else if (chainedAccessor.type === 'property-or-element-accessor') {
          target = target[chainedAccessor.nameOrIndex]
        } else {
          throw new Error("error")
        }
      }
    }
  }
  if (target) {
    if (expr.targetAccessor.type === 'property-accessor') {
      target[expr.targetAccessor.name] = value
    } else if (expr.targetAccessor.type === 'property-or-element-accessor') {
      target[expr.targetAccessor.nameOrIndex] = value
    } else {
      throw new Error('error')
    }
  } else {
    throw new Error('error')
  }
}

function assignVariableExpr(ctx: ExecutionContext, expr: VariableExpr, value: any): void {
  ctx.assignVariable(expr.identifier, value)
}

const evaluateRoute: { [key: string]: (...args: any) => any } = {
  "expr:declare-variable": evaluateDeclareVariableExpr,
  "expr:assignment": evaluateAssignmentExpr,
  "expr:ternary": evaluateTernaryExpr,
  "expr:logical-or": evaluateLogicalOrExpr,
  "expr:logical-and": evaluateLogicalAndExpr,
  "expr:bitwise-or": evaluateBitwiseOrExpr,
  "expr:bitwise-xor": evaluateBitwiseXorExpr,
  "expr:bitwise-and": evaluateBitwiseAndExpr,
  "expr:equality": evaluateEqualityExpr,
  "expr:relational": evaluateRelationalExpr,
  "expr:shift": evaluateShiftExpr,
  "expr:additive": evaluateAdditiveExpr,
  "expr:multiplicative": evaluateMultiplicativeExpr,
  "expr:logical-not": evaluateLogicalNotExpr,
  "expr:positive": evaluatePositiveExpr,
  "expr:negative": evaluateNegativeExpr,
  "expr:bitwise-not": evaluateBitwiseNotExpr,
  "expr:prefix-increment": evaluatePrefixIncrExpr,
  "expr:prefix-decrement": evaluatePrefixDecrExpr,
  "expr:postfix-decrement": evaluatePostfixDecrExpr,
  "expr:access": evaluateAccessExpr,
  "expr:function-call": evaluateFunctionCallExpr,
  "expr:parentheses": evaluateParenthesesExpr,
  "expr:const-map": evaluateConstMapExpr,
  "expr:const-array": evaluateConstArrayExpr,
  "expr:variable": evaluateVariableExpr,
  "expr:const-null": evaluateConstNullExpr,
  "expr:const-boolean": evaluateConstBooleanExpr,
  "expr:const-integer": evaluateConstIntegerExpr,
  "expr:const-float": evaluateConstFloatExpr,
  "expr:const-string": evaluateConstStringExpr
}

const assignRoute: { [key: string]: (...args: any) => any } = {
  "expr:access": assignAccessExpr,
  "expr:variable": assignVariableExpr
}

export function evaluate(ctx: ExecutionContext, expr: Expr): any {
  const func = evaluateRoute[expr.kind]
  if (func) {
    return func(ctx, expr)
  } else {
    throw new Error('error')
  }
}

export function assign(ctx: ExecutionContext, expr: Expr, value: any): void {
  const func = assignRoute[expr.kind]
  if (func) {
    return func(ctx, expr, value)
  } else {
    throw new Error('error')
  }
}
