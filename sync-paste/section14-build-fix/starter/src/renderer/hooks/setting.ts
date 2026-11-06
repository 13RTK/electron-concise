import { ClipboardAction } from '@/types/ClipboardAction';
import { SettingAction } from '@/types/SettingAction';
import { useState, useEffect, ChangeEvent } from 'react';

export function useToggleMonitor() {
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

  return {
    handleChange,
    isStopMonitor,
  };
}
