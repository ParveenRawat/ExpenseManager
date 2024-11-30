import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().positive().int(),
});

const createPostSchema = expenseSchema.omit({ id: true });
type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Food",
    amount: 100,
  },
  {
    id: 2,
    title: "Clothes",
    amount: 500,
  },
  {
    id: 3,
    title: "School",
    amount: 1000,
  },
];

export const expenseRoute = new Hono()
  .get("/", getUser, (c) => {
    return c.json({
      expense: fakeExpenses,
    });
  })
  .get("/total-spent", getUser, (c) => {
    const total = fakeExpenses.reduce((acc, exp) => acc + exp.amount, 0);
    return c.json({ total });
  })
  .get("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.filter((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.json();
    fakeExpenses.push({ id: fakeExpenses.length + 1, ...expense });
    c.status(201);
    return c.json({ fakeExpenses });
  })
  .delete("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });
