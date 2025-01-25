import App from './app.ts'
import { addUserModal } from './pages/messenger/components/addUserModal/addUserModal.ts'
import { removeUserModal } from './pages/messenger/components/removeUserModal/removeUserModal.ts'
import { changeAvatarModal } from './pages/profile/components/changeAvatarModal/changeAvatarModal.ts'
import { addChatModal } from './pages/messenger/components/addChatModal/addChatModal.ts'

document.addEventListener('DOMContentLoaded', () => {
  new App()

  // Инициализирую модальные окна
  addUserModal
  removeUserModal
  changeAvatarModal
  addChatModal
})
