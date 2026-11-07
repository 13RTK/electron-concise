import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { SystemAction } from '@/types/SystemAction';

function RootLayout({ children }: { children: React.ReactNode }) {
  const { systemAction } = window.electronAPI;
  const [platform, setPlatform] = useState<NodeJS.Platform>('darwin');

  async function loadPlatform() {
    const platformInfo = await systemAction(SystemAction.PLATFORM);

    if (platformInfo) {
      setPlatform(platformInfo);
    }
  }

  useEffect(() => {
    loadPlatform();
  }, []);

  return (
    <>
      {platform === 'darwin' && <Navbar />}
      {children}
    </>
  );
}

export default RootLayout;
