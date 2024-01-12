import "./styles.css";
import { useMap } from "./useMap";

const myMap = new Map();
myMap.set("foo", "bar");
myMap.set("baz", "boo");
myMap.set("alpha", "beta");

export default function App() {
  const [map, actions] = useMap(myMap);
  console.log("rendering with", { map, actions });

  const handleAddNewEntry = () => {
    actions.set("hello", "world");
  };

  return (
    <div className="App">
      <h1>Map to array</h1>
      <button onClick={handleAddNewEntry}>Add new entry</button>
      <ol>
        {Array.from(map).map(([value]) => (
          <li style={{ textAlign: "left" }} key={value}>
            {value}
          </li>
        ))}
      </ol>
    </div>
  );
}
