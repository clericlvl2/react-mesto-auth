import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import api from '../../utils/api';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import defaultUserPic from '../../images/userpic-jacques.jpg';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ConfirmActionPopup from '../ConfirmActionPopup/ConfirmActionPopup';

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    name: 'Имя...',
    about: 'Описание...',
    avatar: defaultUserPic,
  });
  const [selectedCard, setSelectedCard] = useState({});
  const [cardsList, setCardsList] = useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isConfirmActionPopupOpen, setConfirmActionPopupState] =
    useState(false);
  const [confirmActionPopupData, setConfirmActionPopupData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api
      .initializeAppData()
      .then(([userData, cardsList]) => {
        setCurrentUser(userData);
        setCardsList(cardsList);
      })
      .catch(console.error);
  }, []);

  const handleEditAvatarClick = () => setEditAvatarPopupState(true);
  const handleEditProfileClick = () => setEditProfilePopupState(true);
  const handleAddPlaceClick = () => setAddPlacePopupState(true);
  const handleCardClick = card => setSelectedCard(card);
  const handleDeleteCardClick = data => {
    setConfirmActionPopupState(true);
    setConfirmActionPopupData(data);
  };
  const handleCardLike = card => {
    const isLiked = card.likes.some(u => u._id === currentUser._id);
    const request = isLiked
      ? api.unsetCardLike(card._id)
      : api.setCardLike(card._id);

    return request
      .then(newCard => {
        setCardsList(state =>
          state.map(c => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  };
  const handleCardDelete = card => {
    const cardId = card._id;
    setIsLoading(true);

    return api
      .deleteCard(cardId)
      .then(() => {
        setCardsList(state => state.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);

    return api
      .updateUserInfo({ name, about })
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);

    return api
      .updateUserAvatar({ avatar })
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);

    return api
      .addNewCard({ name, link })
      .then(newCard => {
        setCardsList([newCard, ...cardsList]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  const closeAllPopups = () => {
    setEditAvatarPopupState(false);
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setConfirmActionPopupState(false);
    setSelectedCard({});
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cardsList={cardsList}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmActionPopup
          isOpen={isConfirmActionPopupOpen}
          title={'Вы уверены?'}
          submitText={'Да'}
          onSubmit={handleCardDelete}
          onClose={closeAllPopups}
          data={confirmActionPopupData}
          isLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
};

export default App;
