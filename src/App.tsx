import { useState } from "react"
import Select from "./Select"

const options = [
  {label: 'First', value: 1},
  {label: 'Second', value: 2},
  {label: 'Third', value: 3},
  {label: 'Fourth', value: 4},
  {label: 'Fifth', value: 5},
  {label: 'Sixth', value: 6},
  {label: 'Seventh', value: 7},
]

function App() {
  const [value, setValue] = useState<typeof options[0] | undefined>(options[0]);

  return <Select options={options} value={value} onChange={o=> setValue(o)}/>
}

export default App
