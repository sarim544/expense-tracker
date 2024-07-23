import categories from "../categories";
interface Props {
  onSelectExpense: (category: string) => void;
}

const ExpenseFilter = ({ onSelectExpense }: Props) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onSelectExpense(event.target.value)}
    >
      <option value="">All</option>
      {categories.map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
