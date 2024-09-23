import { useState } from 'react'
import './App.css'
import { Segmented } from 'antd'
import { segOpts } from './constants'
import Dashboard from './components/Dashboard/Dashboard'
import Tasks from './components/Tasks/Tasks'

function App() {
  const [tab, setTab] = useState<number>(2)

  return (
    <div className='h-screen bg-black text-zinc-200 flex justify-center'>
      <div className='bg-zinc-900 py-5 w-[56rem] flex items-center flex-col mx-6 gap-5'>
        <Segmented value={tab} options={segOpts} onChange={(e) => setTab(e)} />
        {tab == 1 ? (<Dashboard />) : (<Tasks />)}
      </div>
    </div>
  )
}

export default App
