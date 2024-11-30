import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expense,
})

async function getAllExpenses() {
  const res = await api.expenses.$get()
  if (!res.ok) {
    throw new Error('Server Error')
  }
  const data = await res.json()
  console.log(data)
  return data
}

function Expense() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-Expenses'],
    queryFn: getAllExpenses,
  })

  if (error) return 'An error has occured' + error.message
  return (
    <div className="max-w-xl mx-auto py-12">
      <Table>
        <TableCaption>List of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4 " />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 " />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 " />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expense.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">
              {data?.expense.reduce((acc, exp) => acc + exp.amount, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
