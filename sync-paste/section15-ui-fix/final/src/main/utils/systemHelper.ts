import { SystemAction } from '@/types/SystemAction';
import { IpcMainInvokeEvent } from 'electron';

const platform = process.platform;

export function handleSystemAction(
  _event: IpcMainInvokeEvent,
  action: SystemAction,
) {
  if (action === SystemAction.PLATFORM) {
    return platform;
  }
}
