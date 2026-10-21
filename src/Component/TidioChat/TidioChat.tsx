import type { FC } from 'react';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { identifyTidioVisitor, loadTidio } from '../../utils/tidio';
import type { TidioVisitor } from '../../utils/tidio';

// Loads the Tidio chat widget on every page and passes the logged-in customer to it
const TidioChat: FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.id) return;

    const visitor: TidioVisitor = { distinct_id: String(user.id) };
    const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.userName;
    if (name) visitor.name = name;
    if (user.email) visitor.email = user.email;
    if (user.billing?.phone) visitor.phone = user.billing.phone;

    identifyTidioVisitor(visitor);
  }, [user]);

  // Load after the page itself has finished loading so the chat never slows it down
  useEffect(() => {
    if (document.readyState === 'complete') {
      loadTidio();
      return;
    }
    window.addEventListener('load', loadTidio, { once: true });
    return () => window.removeEventListener('load', loadTidio);
  }, []);

  return null;
};

export default TidioChat;
