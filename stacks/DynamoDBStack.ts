
import { StackContext, Table} from 'sst/constructs'

export function DynamoDBStack ({ stack }: StackContext): { subjectsTable:Table }
{
  const subjectsTable = new Table(stack, "subjectsData", {
    fields: {
      studentId: "string"
    },
    primaryIndex: { 
      partitionKey: "studentId"},
  })

  return { subjectsTable }
}