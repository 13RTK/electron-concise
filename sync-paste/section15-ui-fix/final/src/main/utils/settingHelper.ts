import type { Setting, SettingKey, SettingValue } from '@/types/Setting';
import { SettingAction } from '@/types/SettingAction';
import { IpcMainInvokeEvent } from 'electron';
import Store, { Schema } from 'electron-store';

const schema: Schema<Setting> = {
  isMonitorStop: {
    type: 'boolean',
    default: false,
  },
};

const store = new Store({ schema });

export function loadAppConfig() {
  const isMonitorStop = store.get('isMonitorStop');

  if (isMonitorStop === null || isMonitorStop === undefined) {
    store.set('isMonitorStop', false);
  }

  return store.store;
}

export function handleSettingAction(
  _event: IpcMainInvokeEvent,
  action: SettingAction,
  settingKey: SettingKey,
  settingValue?: SettingValue,
) {
  if (action === SettingAction.GET_SETTING) {
    return store.get(settingKey);
  }

  if (action === SettingAction.SET_SETTING && settingValue !== undefined) {
    return store.set(settingKey, settingValue);
  }
}
