import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";
import { Expense } from "../App";
import { useEffect } from "react";
const schema = z.object({
  description: z.string().min(1, { message: "This field is required." }),
  amount: z.number({ invalid_type_error: "Please enter valid amount." }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});
type FormData = z.infer<typeof schema> & { id?: number };

interface Props {
  onSubmit: (data: FormData) => void;
  expense: Expense;
}

const ExpenseForm = ({ onSubmit, expense }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const defaultval = {
      ...(expense as FormData),
    };
    console.log("default valid", defaultval);

    reset(defaultval);
  }, [expense]);

  //   console.log("test", { isValid });
  return (
    <form
      action=""
      onSubmit={handleSubmit((data) => {
        onSubmit({ ...data, id: expense?.id });
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          defaultValue={expense.description}
          {...register("description")}
          type="text"
          id="description"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          defaultValue={expense.amount}
          {...register("amount", { valueAsNumber: true })}
          type="number"
          id="amount"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          defaultValue={expense.category}
          {...register("category")}
          id="category"
          className="form-select"
        >
          <option value=""></option>
          {categories.map((category) => (
            <option
              value={category}
              key={category}
              //   selected={category == expense.category}
            >
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button disabled={!isValid} type="submit" className="btn btn-primary">
        Sumbit
      </button>
    </form>
  );
};

export default ExpenseForm;
