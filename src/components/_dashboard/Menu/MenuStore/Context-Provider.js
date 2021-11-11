import { createContext, useState } from 'react';
import Fetch from '../Fetch';

const defaultvalues = {
  categories: [],
  snackbar: {},
  openmodal: false,
  btnloading: false,
  modalid: '',
  closeSnackbar: () => {},
  handleOpenmodal: () => {},
  handleClosemodal: () => {},
  getMenu: () => {},
  addfn: () => {},
  deletefn: () => {},
  editfn: () => {}
};

export const MenuContext = createContext(defaultvalues);

// ----------------------------------------------------------

export const ContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [btnloading, setBtnloading] = useState(false);
  const [snackbar, setSnackbar] = useState({ severity: 'success', open: false, message: '' });
  const [openmodal, setOpenmodal] = useState(false);
  const [modalid, setModalid] = useState('');

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false });
  };

  const handleOpenmodal = (id) => {
    setOpenmodal(true);
    setModalid(id);
  };

  const handleClosemodal = () => {
    setOpenmodal(false);
  };

  // ************** GET DRAFT MENU FUNCTION ***************** //
  const getMenu = async () => {
    Fetch({}, 'get_draft_menu')
      .then((res) => {
        const { categories } = res;
        setCategories(categories);
      })
      .catch(() => {
        setCategories([]);
      });
  };

  // ************** ADD FUNCTION ***************** //

  const addfn = async (endpoint, data, success, error) => {
    setBtnloading(true);
    Fetch(data, endpoint)
      .then(() => {
        getMenu();
        setBtnloading(false);
        setSnackbar({
          severity: 'success',
          open: true,
          message: success
        });
      })
      .catch(() => {
        setBtnloading(false);
        setSnackbar({
          severity: 'error',
          open: true,
          message: error
        });
      });
  };

  // ************** DELETE CATEGORY FUNCTION ***************** //

  const deletefn = async (endpoint, data, success, error) => {
    Fetch(data, endpoint)
      .then(() => {
        getMenu();
        setSnackbar({
          severity: 'warning',
          open: true,
          message: success
        });
      })
      .catch((e) => {
        if (e) {
          return setSnackbar({
            severity: 'error',
            open: true,
            message: 'Cannot delete Category because it has Items, delete each item manually'
          });
        }
        setSnackbar({
          severity: 'error',
          open: true,
          message: error
        });
      });
  };

  // ************** EDIT FUNCTION ***************** //

  const editfn = async (endpoint, data, success, error) => {
    Fetch(data, endpoint)
      .then(() => {
        getMenu();
        handleClosemodal();
        setSnackbar({
          severity: 'success',
          open: true,
          message: success
        });
      })
      .catch(() => {
        setSnackbar({
          severity: 'error',
          open: true,
          message: error
        });
      });
  };

  const createContext = {
    categories,
    snackbar,
    modalid,
    openmodal,
    btnloading,
    closeSnackbar,
    handleOpenmodal,
    handleClosemodal,
    getMenu,
    addfn,
    deletefn,
    editfn
  };
  return <MenuContext.Provider value={createContext}>{children}</MenuContext.Provider>;
};
