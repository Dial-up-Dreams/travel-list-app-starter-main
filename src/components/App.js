import{useState} from "react";
import ReactDOM from "react-dom/client"
import Logo from "./Logo";

// Initial packing items6
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];


function Form({addItem}) {
const [description, setDescription] = useState("")
const [quantity, setQuantity] = useState(1)


  function handleSubmit(e){
    e.preventDefault();

    if(!description) return
    const newItem={
      id: Date.now(),
      description,
      quantity,
      packed: false, 
    }

    addItem(newItem)
    setDescription("");
    setQuantity(1);
  }

  function handleDescriptionChange(e){
    setDescription(e.target.value)
  }

  function handleQuantityChange(e){
    setQuantity(Number(e.target.value))
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <input
      id="item"
      type="text"
      placeholder="Item..."
      value={description}
      onChange={handleDescriptionChange}
      />

      <button>Add</button>
    </form>
  );
}

function Item({packingItem, onDeleteItem, onUpdateItem}){
   return(
    <li>
      <input
      type="checkbox"
      onClick={()=> onUpdateItem(packingItem.id)}/>
      <span style={packingItem.packed ? {textDecoration:"line-through"} : {}}>
        {packingItem.description} ({packingItem.quantity})
      </span>
      <button onClick={()=> onDeleteItem(packingItem.id)}>❌</button>
    </li>
   )
}

function PackingList({items, onDeleteItem, onUpdateItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item packingItem={item} 
          key={item.id}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
          />
          
        ))}
      </ul>
    </div>
  );
}

function Stats({items}) { 
  const numItems = items.length;
  const numPackedItems = items.filter((item)=>item.packed).length
  const percPackedItems = (numPackedItems/numItems)*100
  if (percPackedItems != 100){
  return (
    <footer className="stats">
      <em>You have {numItems} items in the list. You already packed {numPackedItems} {percPackedItems}%.</em>
    </footer>
  )}
  else{
    return (
      <footer className="stats">
        <em>You got everything!</em>
      </footer>
  )}
}

function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item){
    setItems((prevItem) => {
      return [...prevItem, item]
    });
  }

  function handleDeleteItem(id){
    setItems((prevItem) => 
    prevItem.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id){
    setItems((prevItem) => prevItem.map(
      (item)=> item.id === id ? {...item, packed: !item.packed} : item
    ))
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={handleAddItems}/>
      <PackingList 
      items={items}
      onDeleteItem={handleDeleteItem}
      onUpdateItem={handleUpdateItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
