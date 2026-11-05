import { useToggleMonitor } from '@/renderer/hooks/setting';

function General() {
  const { handleChange, isStopMonitor } = useToggleMonitor();

  return (
    <section>
      <fieldset className='fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4'>
        <legend className='fieldset-legend'>General options</legend>
        <label className='label'>
          <input
            type='checkbox'
            defaultChecked
            className='checkbox'
            onChange={handleChange}
            checked={isStopMonitor}
          />
          Stop Monitor
        </label>
      </fieldset>
    </section>
  );
}

export default General;
