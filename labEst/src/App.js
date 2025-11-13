
import FruitList from "./FruitList";

function App() {
  const fruits = ["Apple", "Banana", "Orange", "Mango", "Kiwi"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <FruitList fruits={fruits} />
    </div>
  );
}

export default App;
