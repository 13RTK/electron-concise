import General from '@/renderer/pages/setting/General';
import { GearIcon, InfoIcon } from '@phosphor-icons/react';
import { Activity, useState } from 'react';

function Setting() {
  const { changeWindowTitle } = window.electronAPI;
  const [tab, setTab] = useState(window.location.hash.split('/')[1]);

  function handleClick(newTab: 'general' | 'about') {
    setTab(newTab);
    changeWindowTitle(newTab);
  }

  return (
    <>
      <nav className='navbar bg-base-100 shadow-sm grid grid-cols-4 gap-2'>
        <div className='col-end-1'></div>
        <div className='col-start-1'></div>

        <button
          className={`btn ${tab === 'general' ? 'btn-active' : ''}`}
          onClick={() => handleClick('general')}
        >
          <GearIcon size={24} weight='thin' />
          General
        </button>
        <button
          className={`btn ${tab === 'about' ? 'btn-active' : ''}`}
          onClick={() => handleClick('about')}
        >
          <InfoIcon size={24} weight='thin' />
          About
        </button>
      </nav>

      <main className='flex justify-center'>
        <Activity mode={tab === 'general' ? 'visible' : 'hidden'}>
          <General />
        </Activity>
      </main>
    </>
  );
}

export default Setting;
