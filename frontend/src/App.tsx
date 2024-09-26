import { useState } from 'react'
import './App.css'
import { Segmented } from 'antd'
import { segOpts } from './constants'
import Tasks from './pages/Tasks/Tasks'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  const [tab, setTab] = useState<number>(2)

  return (
    <div className='md:h-screen bg-black text-zinc-200 flex justify-center'>
      <div className='py-5 w-[56rem] flex items-center flex-col mx-6 gap-5'>
        <Segmented value={tab} options={segOpts} onChange={(e) => setTab(e)} />
        {tab == 1 ? (<Dashboard />) : (<Tasks />)}
      </div>
    </div>
  )
}

export default App
