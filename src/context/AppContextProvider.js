import { combineProviders } from './CombineProviders';
import { CommentPorvider } from './CommentContext';
import { ModalProvider } from './ModalContext';

const providers = [CommentPorvider, ModalProvider];

export const AppContextProvider = combineProviders(...providers);
