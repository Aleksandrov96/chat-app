import AuthStore from 'stores/authStore';
import ChatStore from 'stores/chatStore';
import SocketStore from 'stores/socketStore';
import UIStore from 'stores/uiStore';

export interface State {
  authStore: AuthStore;
  chatStore: ChatStore;
  socketStore: SocketStore;
  uiStore: UIStore;
}
