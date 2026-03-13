import { ExecutionContext } from "./context"

let environmentId = 0
let contextId = 0

type ComponentFactory = (type: string, value: any, config: any) => any

export class Environment {
  private globalModel: {[key: string]: any}
  private scopedModel: {[key: string]: any}
  private componentFactory: ComponentFactory
  private contexts: Map<string, ExecutionContext>

  constructor(globalModel: {[key: string]: any}, scopedModel: {[key: string]: any}, componentFactory: ComponentFactory) {
    this.globalModel = globalModel
    this.scopedModel = scopedModel
    this.componentFactory = componentFactory
    this.contexts = new Map<string, ExecutionContext>()
  }

  getGlobalModel(): {[key: string]: any} {
    return this.globalModel
  }

  getScopedModel(): {[key: string]: any} {
    return this.scopedModel
  }

  getComponentFactory(): ComponentFactory {
    return this.componentFactory
  }

  getPropertyOfScopedModel(prop: string) {
    return this.scopedModel[prop]
  }

  setPropertyOfScopedModel(prop: string, value: any) {
    this.scopedModel[prop] = value
  }

  getContext(id: string): ExecutionContext | undefined {
    return this.contexts.get(id)
  }

  addContext(context: ExecutionContext): string {
    const id = "ctx$" + (++contextId)
    this.contexts.set(id, context)
    return id
  }

  removeContext(id: string): boolean {
    return this.contexts.delete(id)
  }
}

export type InitResult = {
  environmentId: string,
  environment: Environment,
  contextId: string,
  context: ExecutionContext
}

export function init(globalModel: {[key: string]: any}, scopedModel: {[key: string]: any}, componentFactory: ComponentFactory): InitResult {
  const ctx = new ExecutionContext({...globalModel, ...scopedModel})
  const env = new Environment(globalModel, scopedModel, componentFactory)
  const envId = "env$" + (++environmentId)
  const ctxId = env.addContext(ctx)
  return {
    environmentId: envId,
    environment: env,
    contextId: ctxId,
    context: ctx
  }
}
