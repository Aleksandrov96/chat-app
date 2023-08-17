import { useState, useEffect, useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { IUser } from 'interfaces/IUser';

export function useReceiver(participants: IUser[]): {
  receiver: IUser | undefined;
} {
  const { authStore } = useContext(StoresContext);
  const [receiver, setReceiver] = useState<IUser>();

  useEffect(() => {
    const member = participants.find((participant) => participant._id !== authStore?.user._id);
    if (member) {
      setReceiver(member);
    }
  }, [participants]);

  return { receiver };
}
