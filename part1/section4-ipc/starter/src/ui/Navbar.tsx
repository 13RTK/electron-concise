import {
  FrameCornersIcon,
  MinusIcon,
  XSquareIcon,
} from '@phosphor-icons/react';

function Navbar() {
  return (
    <nav className='navbar bg-base-100 shadow-sm sm:p-2 sm:min-h-4 p-1 min-h-2'>
      <div className='flex-1'>
        <a className='btn btn-ghost sm:text-xl text-sm'>daisyUI</a>
      </div>
      <div className='flex-none'>
        <button
          className='btn btn-square btn-ghost sm:btn-md btn-sm tooltip tooltip-bottom'
          data-tip='minimize'
        >
          <MinusIcon size={52} color='#f1c332' weight='thin' />
        </button>
        <button
          className='btn btn-square btn-ghost sm:btn-md btn-sm tooltip tooltip-bottom'
          data-tip='fullscreen'
        >
          <FrameCornersIcon size={52} color='#59bb57' weight='thin' />
        </button>
        <button
          className='btn btn-square btn-ghost sm:btn-md btn-sm tooltip tooltip-bottom'
          data-tip='close'
        >
          <XSquareIcon size={52} color='#eb6058' weight='thin' />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
