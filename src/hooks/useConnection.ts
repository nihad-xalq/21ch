import { useState, useEffect } from 'react';

type ConnectionType = 'slow' | 'fast' | 'unknown';

interface ConnectionInfo {
  type: ConnectionType;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

export const useConnection = (): ConnectionInfo => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    type: 'unknown',
  });

  useEffect(() => {
    const checkConnection = () => {
      if (typeof window !== 'undefined' && 'connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          const downlink = connection.downlink;
          const rtt = connection.rtt;

          let type: ConnectionType = 'unknown';

          if (effectiveType === 'slow-2g' || effectiveType === '2g') {
            type = 'slow';
          } else if (effectiveType === '3g' || effectiveType === '4g') {
            type = 'fast';
          }

          setConnectionInfo({
            type,
            effectiveType,
            downlink,
            rtt,
          });
        }
      }
    };

    checkConnection();

    // Listen for connection changes
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.addEventListener) {
        connection.addEventListener('change', checkConnection);
        
        return () => {
          connection.removeEventListener('change', checkConnection);
        };
      }
    }
  }, []);

  return connectionInfo;
};
