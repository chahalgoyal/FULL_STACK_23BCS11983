
const FruitList = ({ fruits = [] }) => {
  const handleClick = (fruit) => {
    alert(fruit);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Fruits</h2>
      <ul className="list-disc pl-5">
        {fruits.map((fruit, idx) => (
          <li
            key={idx}
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => handleClick(fruit)}
          >
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FruitList;
