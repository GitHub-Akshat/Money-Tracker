import Charts from "../components/Charts";
import TransactionList from "../components/TransactionList";

function Dashboard() {

  return (
      <div className="space-y-6">

        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TransactionList />
          </div>
          <div>
            <Charts />
          </div>
        </div>

      </div>
  );
}

export default Dashboard