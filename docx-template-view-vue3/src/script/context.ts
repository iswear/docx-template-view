const NONE = new Object()

export class ExecutionContext {

  private variables: { [key: string]: any }

  private functions: { [key: string]: (...args: any[]) => any }

  private current?: Scope

  constructor(variables: { [key: string]: any }) {
    this.variables = variables
    this.functions = {}
  }

  declareVariable(identifier: string): void {
    let scope = this.current
    while (scope) {
      const variables = scope.getVariables()
      if (variables[identifier] !== undefined) {
        throw new Error("variable '" + identifier + "' has already denfined")
      }
      if (scope instanceof MethodScope) {
        break
      } else {
        scope = scope.getParent()
      }
    }
    if (this.current) {
      this.current.getVariables()[identifier] = NONE
    } else {
      if (this.variables[identifier] !== undefined) {
        throw new Error("variable '" + identifier + "' has already denfined")
      }
      this.variables[identifier] = NONE
    }
  }

  assignVariable(identifier: string, value: any): void {
    let scope = this.current
    while (scope) {
      const variables = scope.getVariables()
      if (variables[identifier] !== undefined) {
        variables[identifier] = value
        return
      }
      if (scope instanceof MethodScope) {
        break
      } else {
        scope = scope.getParent()
      }
    }
    if (this.variables[identifier] !== undefined) {
      this.variables[identifier] = value
      return
    }
    throw new Error("varaible '" + identifier + "' has not defined")
  }

  hasVariable(identifier: string): boolean {
    let scope = this.current
    while (scope) {
      const variables = scope.getVariables()
      if (variables[identifier] !== undefined) {
        return true
      }
      if (scope instanceof MethodScope) {
        break
      } else {
        scope = scope.getParent()
      }
    }
    if (this.variables[identifier] !== undefined) {
      return true
    }
    return false
  }

  getVariable(identifier: string): any {
    let scope = this.current
    while (scope) {
      const variables = scope.getVariables()
      if (variables[identifier] !== undefined) {
        return variables[identifier] === NONE ? undefined : variables[identifier]
      }
      if (scope instanceof MethodScope) {
        break
      } else {
        scope = scope.getParent()
      }
    }
    if (this.variables[identifier] !== undefined) {
      return this.variables[identifier] === NONE ? undefined : this.variables[identifier]
    }
    return undefined
  }

  registerFunction(identifier: string, func: (...args: any[]) => any): void {
    this.functions[identifier] = func
  }

  getFunction(identifier: string): ((...args: any[]) => any) | undefined {
    return this.functions[identifier];
  }

  enterBlock(): Scope {
    const scope = new Scope(this.current, this.current ? this.current.getMethodScope() : undefined)
    this.current = scope
    return scope
  }

  exitBlock(): void {
    if (this.current) {
      this.current = this.current.getParent()
    } else {
      throw new Error("error")
    }
  }

  clone(): ExecutionContext {
    const context = new ExecutionContext(this.variables)
    context.current = this.current
    return context
  }
}

export class Scope {

  private variables: { [key: string]: any }

  private parent?: Scope

  private methodScope?: MethodScope

  constructor(parent?: Scope, methodScope?: MethodScope) {
    this.variables = {}
    this.parent = parent
    this.methodScope = methodScope
  }

  getVariables(): { [key: string]: any } {
    return this.variables;
  }

  getParent(): Scope | undefined {
    return this.parent
  }

  getMethodScope(): MethodScope | undefined {
    return this.methodScope
  }
}

export class MethodScope extends Scope {

  public returnValue: any

  constructor(parent: Scope) {
    super(parent)
  }
}
