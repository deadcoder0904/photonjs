import indent from 'indent-string'
import { Dictionary } from './common'

export type ConnectorType = 'mysql' | 'mongo' | 'sqlite' | 'postgresql'

export interface GeneratorConfig {
  name: string
  output: string | null
  provider: string
  config: Dictionary<string>
}

export type Datasource =
  | string
  | {
      url: string
      [key: string]: any | undefined
    }

export interface InternalDatasource {
  name: string
  connectorType: ConnectorType
  url: string
  config: any
}

export function printDatasources(
  dataSources: Dictionary<Datasource | undefined>,
  internalDatasources: InternalDatasource[],
): string {
  const mergedInternalDataSources: InternalDatasource[] = internalDatasources.map(internalDataSource => {
    const override = dataSources[internalDataSource.name]
    if (!override) {
      return internalDataSource
    }

    if (typeof override === 'string') {
      return {
        ...internalDataSource,
        url: override,
      }
    }

    const { url, ...rest } = override

    return {
      ...internalDataSource,
      ...rest,
      url: override.url,
    }
  })

  return mergedInternalDataSources.map(d => String(new InternalDataSourceClass(d))).join('\n\n')
}

const tab = 2

class InternalDataSourceClass {
  constructor(private readonly dataSource: InternalDatasource) {}

  public toString() {
    const { dataSource } = this
    const obj = {
      provider: dataSource.connectorType,
      url: dataSource.url,
    }
    if (dataSource.config && typeof dataSource.config === 'object') {
      Object.assign(obj, dataSource.config)
    }
    return `datasource ${dataSource.name} {
${indent(printDatamodelObject(obj), tab)}
}`
  }
}

export function printDatamodelObject(obj) {
  const maxLength = Object.keys(obj).reduce((max, curr) => Math.max(max, curr.length), 0)
  return Object.entries(obj)
    .map(([key, value]) => `${key.padEnd(maxLength)} = ${JSON.stringify(value)}`)
    .join('\n')
}
