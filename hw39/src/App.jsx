import {EditableTable} from './components/EditableTable'

const columns = [
  { name: 'product'},
  { name: 'quantity' },
  { name: 'price' },
  { name: 'amount' },
  { name: 'comment' },
]


function App() {

   const initialRows = [
    {
      id: 1,
      product: 'Product 1',
      quantity: 50,
      price: 10000,
      amount: 500000,
      comment: 'This is comment 1'
    },
    {
      id: 2,
      product: 'Product 2',
      quantity: 30,
      price: 15000,
      amount: 450000,
      comment: 'This is comment 2'
    },
    {
      id: 3,
      product: 'Product 3',
      quantity: 25,
      price: 20000,
      amount: 500000,
      comment: 'This is comment 3'
    }
  ];

  return (
    <>
      <EditableTable columns={columns} rows={initialRows}/>
    </>
  )
}

export default App
