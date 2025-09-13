import TransactionForm from "../components/TransactionForm";


function AddTransaction() {

  return (
      <div>

        <h1 className="text-xl font-semibold mb-4">
          Add Transaction
        </h1>

        <TransactionForm editMode={false} />

      </div>
  );
}

export default AddTransaction