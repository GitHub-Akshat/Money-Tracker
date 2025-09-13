import TransactionForm from "../components/TransactionForm";

function EditTransaction() {

  return (
      <div>

        <h1 className="text-xl font-semibold mb-4">
          Edit Transaction
        </h1>

        <TransactionForm editMode={true} />

      </div>
  );
}

export default EditTransaction