import Setting from '@/renderer/pages/setting/Setting';

export type Setting = {
  isMonitorStop: boolean;

  theme: 'dark' | 'light' | 'system';
};

export type SettingKey = keyof Setting;

export type SettingValue = Setting[SettingKey];
