import { contextBridge, ipcRenderer } from 'electron';
import { WindowAction } from '@/types/WindowAction';
import {
  CHANGE_TITLE_CHANNEL,
  WINDOW_ACTION_CHANNEL,
} from '@/types/channels/window';
import { ClipboardAction } from '@/types/ClipboardAction';
import {
  CLIPBOARD_ACTION_CHANNEL,
  CLIPBOARD_UPDATE_CHANNEL,
} from '@/types/channels/clipboard';
import { SettingAction } from '@/types/SettingAction';
import { SETTING_ACTION_CHANNEL } from '@/types/channels/setting';
import { SettingKey, SettingValue } from '@/types/Setting';

const apiKey = 'electronAPI';

const api = {
  windowAction: (action: WindowAction) =>
    ipcRenderer.send(WINDOW_ACTION_CHANNEL, action),

  clipboardAction: (action: ClipboardAction, historyId?: number) =>
    ipcRenderer.invoke(CLIPBOARD_ACTION_CHANNEL, action, historyId),

  onUpdateClipboard: (callback) =>
    ipcRenderer.on(CLIPBOARD_UPDATE_CHANNEL, (_event) => callback()),

  changeWindowTitle: (title: string) =>
    ipcRenderer.send(CHANGE_TITLE_CHANNEL, title),

  settingAction: (
    action: SettingAction,
    settingKey: SettingKey,
    settingValue?: SettingValue,
  ) =>
    ipcRenderer.invoke(
      SETTING_ACTION_CHANNEL,
      action,
      settingKey,
      settingValue,
    ),
} satisfies Window[typeof apiKey];

contextBridge.exposeInMainWorld(apiKey, api);
