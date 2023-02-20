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
import Login from '../Login/Login';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { DEPLOY_URL } from '../../utils/constants';

const App = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Имя...',
    about: 'Описание...',
    avatar: defaultUserPic,
  });
  const [selectedCard, setSelectedCard] = useState({});
  const [cardsList, setCardsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [infoTooltipState, setInfoTooltipState] = useState({
    isOpen: false,
    isError: false,
    errorMessage: '',
  });
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmActionPopupOpen, setIsConfirmActionPopupOpen] =
    useState(false);
  const [confirmActionPopupData, setConfirmActionPopupData] = useState({});

  const isPopupOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmActionPopupOpen ||
    selectedCard.link ||
    infoTooltipState.isOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isPopupOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isPopupOpen]);

  useEffect(() => {
    handleTokenCheck();

    api
      .initializeAppData()
      .then(([userData, cardsList]) => {
        setCurrentUser(userData);
        setCardsList(cardsList);
      })
      .catch(console.error);
  }, []);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(data => {
          if (data.email !== undefined) {
            localStorage.setItem('email', data.email);
          }
        })
        .then(() => {
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        })
        .catch(console.error);
    }
  };

  const onLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    setIsLoading(true);

    return auth
      .authorize(email, password)
      .then(data => {
        const jwtToken = data.token;
        if (jwtToken) {
          localStorage.setItem('jwt', jwtToken);
          return auth.checkToken(jwtToken);
        }
      })
      .then(res => {
        const email = res.data.email;
        if (email !== undefined) {
          localStorage.setItem('email', email);
        }
      })
      .then(() => {
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch(err => callErrorTooltip(err))
      .finally(() => setIsLoading(false));
  };

  const onRegister = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    setIsLoading(true);
    return auth
      .register(email, password)
      .then(res => {
        const email = res.data.email;
        if (email !== undefined) {
          localStorage.setItem('email', email);
          callSuccessTooltip();
          navigate('signin', { replace: true });
        }
      })
      .catch(err => callErrorTooltip(err))
      .finally(() => setIsLoading(false));
  };

  const onSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    navigate('/signin', { replace: true });
  };

  const callSuccessTooltip = () =>
    setInfoTooltipState({
      isOpen: true,
      isError: false,
      errorMessage: '',
    });

  const callErrorTooltip = errorMessage =>
    setInfoTooltipState({
      isOpen: true,
      isError: true,
      errorMessage: errorMessage,
    });

  const closeInfoTooltip = () =>
    setInfoTooltipState({
      ...infoTooltipState,
      isOpen: false,
    });

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleCardClick = card => setSelectedCard(card);
  const handleDeleteCardClick = data => {
    setIsConfirmActionPopupOpen(true);
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
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmActionPopupOpen(false);
    setSelectedCard({});
    closeInfoTooltip();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} onSignOut={onSignOut} />

      <Routes>
        <Route path={DEPLOY_URL}>
          <Route
            path=""
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cardsList={cardsList}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="signin"
            element={<Login onSubmit={onLogin} isLoading={isLoading} />}
          />
          <Route
            path="signup"
            element={<Register onSubmit={onRegister} isLoading={isLoading} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/*" element={<Navigate to={DEPLOY_URL} replace />} />
      </Routes>

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

      <InfoTooltip
        isOpen={infoTooltipState.isOpen}
        isError={infoTooltipState.isError}
        errorMessage={infoTooltipState.errorMessage}
        onClose={closeInfoTooltip}
      />

      {isLoggedIn && <Footer />}
    </CurrentUserContext.Provider>
  );
};

export default App;
