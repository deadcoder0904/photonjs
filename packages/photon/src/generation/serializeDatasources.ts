import { DatasourceOverwrite } from './extractSqliteSources'

// this is NOT printing datasources, but just serializing the data source
// object used for generation
// this is needed, as we need to print `path.resolve` statements
// it basically just strips the quotes
export function serializeDatasources(datasources: DatasourceOverwrite[]): string {
  const str = JSON.stringify(datasources, null, 2)
  const replaceRegex = /"('file:'.*'\))"/

  return str
    .split('\n')
    .map(line => {
      return line.replace(replaceRegex, (match: string) => {
        return match.slice(1, match.length - 1) // strip the quotes
      })
    })
    .join('\n')
}
