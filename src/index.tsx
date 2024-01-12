import { html } from "@elysiajs/html";
import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import * as elements from "typed-html";
import { db } from "./db";
import { todosTbl } from "./db/schema";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        <body
          class="flex w-full h-screen justify-center items-center"
          hx-get="/todos"
          hx-trigger="load"
          hx-swap="innerHTML"
        ></body>
      </BaseHtml>
    )
  )
  .post("/clicked", () => <div>I'm from the server</div>)
  .get("/todos", async () => {
    const data = await db.select().from(todosTbl).all();
    return <TodoList todos={data} />;
  })
  .post(
    "/todos/toggle/:id",
    async ({ params }) => {
      const oldTodo = await db
        .select()
        .from(todosTbl)
        .where(eq(todosTbl.id, params.id))
        .get();
      const newTodo = await db
        .update(todosTbl)
        .set({ completed: !oldTodo?.completed })
        .where(eq(todosTbl.id, params.id))
        .returning()
        .get();
      return <TodoItem {...newTodo} />;
    },
    { params: t.Object({ id: t.Numeric() }) }
  )
  .delete(
    "/todos/:id",
    async ({ params }) => {
      await db.delete(todosTbl).where(eq(todosTbl.id, params.id)).run();
    },
    { params: t.Object({ id: t.Numeric() }) }
  )
  .post(
    "/todos",
    async ({ body }) => {
      if (body.content.length === 0) {
        throw new Error("Content cannot be empty");
      }
      const todo = await db.insert(todosTbl).values(body).returning().get();
      return <TodoItem {...todo} />;
    },
    { body: t.Object({ content: t.String() }) }
  )
  .get("/styles.css", () => Bun.file("./src/styles.css"))
  .listen(3000);

console.log(
  `Elysia running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHtml = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CJ's Beth Stack</title>
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <link rel="stylesheet" href="/styles.css">
</head>
${children}
</html>
`;

let lastID = db.length + 1;

function TodoItem({ content, completed, id }: TodoT) {
  return (
    <div class="flex flex-row space-x-3">
      <p>{content}</p>
      <input
        type="checkbox"
        checked={completed}
        hx-post={`/todos/toggle/${id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      />
      <button
        class="text-red-500"
        hx-delete={`/todos/${id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      >
        X
      </button>
    </div>
  );
}

function TodoList({ todos }: { todos: TodoT[] }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  );
}

function TodoForm() {
  return (
    <form class="flex flex-row space-x-3" hx-post="todos" hx-swap="beforebegin">
      <input type="text" name="content" class="border border-black" />
      <button type="submit">Add</button>
    </form>
  );
}
