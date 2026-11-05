import { ClipboardAction } from '@/types/ClipboardAction';
import { SettingAction } from '@/types/SettingAction';
import { ChangeEvent, useEffect, useState } from 'react';

function General() {
  const { settingAction, clipboardAction } = window.electronAPI;
  const [isStopMonitor, setIsStopMonitor] = useState(true);

  async function loadConfig() {
    const isStopMonitorConfig = await settingAction(
      SettingAction.GET_SETTING,
      'isMonitorStop',
    );

    if (typeof isStopMonitorConfig === 'boolean') {
      setIsStopMonitor(isStopMonitorConfig);
    }
  }

  useEffect(() => {
    loadConfig();
  }, []);

  async function handleChange(event: ChangeEvent) {
    const { checked } = event.target as HTMLInputElement;

    setIsStopMonitor(checked);

    await settingAction(SettingAction.SET_SETTING, 'isMonitorStop', checked);

    await clipboardAction(
      checked ? ClipboardAction.STOP_MONITOR : ClipboardAction.START_MONITOR,
    );
  }

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
