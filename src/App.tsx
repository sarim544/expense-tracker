import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";

export interface Expense {
  id?: number;
  description: string;
  amount?: number;
  category: string;
}

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expense, setExpense] = useState<Expense>({
    description: "",
    category: "",
  });
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: "First expense", amount: 10, category: "Groceries" },
    { id: 2, description: "Second expense", amount: 20, category: "Utalities" },
    { id: 3, description: "Third expense", amount: 30, category: "Groceries" },
  ]);

  const deleteRecord = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id != id));
  };

  const editRecord = (id: number) => {
    const existing = expenses.find((expense) => expense.id == id);
    // console.log("test", { id, existing });

    if (!existing) return;

    setExpense({ ...existing });
  };

  const expenseFilter = (category: string) => {
    setSelectedCategory(category);
  };
  const handlSubmit = (data: Expense) => {
    console.log("after sumbit", data);
    if (data.id) {
      setExpense({
        description: "",
        category: "",
        amount: 0,
      });
      setExpenses(
        expenses.map((expense) => (expense.id == data.id ? data : expense))
      );
      return;
    }

    setExpenses([...expenses, { ...data, id: expenses.length + 1 }]);
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category == selectedCategory)
    : expenses;

  return (
    <div className="p-4">
      <div className="mb-5">
        <ExpenseForm onSubmit={handlSubmit} expense={expense} />
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelectExpense={expenseFilter} />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={deleteRecord}
        onEdit={editRecord}
      />
    </div>
  );
};

export default App;
