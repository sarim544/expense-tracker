import { Expense } from "../App";

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
const Table = ({ expenses, onDelete, onEdit }: Props) => {
  if (expenses.length === 0) return null;
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col">Category</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((item) => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.description}</td>
            <td>$ {item.amount}</td>
            <td>{item.category}</td>
            <td>
              <button
                className="btn btn-outline-success"
                onClick={() => onEdit(item.id!)}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(item.id!)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td></td>
          <td>
            {expenses
              .reduce((acc, expense) => expense.amount! + acc, 0)
              .toFixed(2)}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
