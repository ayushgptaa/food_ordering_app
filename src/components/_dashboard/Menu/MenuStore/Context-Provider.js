/* eslint-disable camelcase */
import { createContext, useState } from 'react';
import Fetch from '../Fetch';

const defaultvalues = {
  categories: [],
  publishedcategories: [],
  optiongroups: [],
  optionsarr: [],
  snackbar: {},
  openmodal: false,
  deletemodal: false,
  btnloading: false,
  modalid: '',
  positionsnackbar: {},
  OpenDeletemodal: () => {},
  closeDeletemodal: () => {},
  closeSnackbar: () => {},
  handleOpenmodal: () => {},
  handleClosemodal: () => {},
  getPublishedMenu: () => {},
  getMenu: () => {},
  getDraftMenu: () => {},
  addfn: () => {},
  deletefn: () => {},
  editfn: () => {},
  publishMenu: () => {},
  OpenPositionedSnackbar: () => {},
  ClosePositionedSnackbar: () => {}
};

export const MenuContext = createContext(defaultvalues);

// ----------------------------------------------------------

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [publishedcategories, setPublishedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [optiongroups, setOptionGroups] = useState([]);
  const [optionsarr, setOptions] = useState([]);
  const [btnloading, setBtnloading] = useState(false);
  const [snackbar, setSnackbar] = useState({ severity: 'success', open: false, message: '' });
  const [openmodal, setOpenmodal] = useState(false);
  const [deletemodal, setDeletemodal] = useState(false);
  const [modalid, setModalid] = useState('');
  const [positionsnackbar, setPositionedSnackbar] = useState({
    open: false
  });

  const OpenPositionedSnackbar = () => {
    setPositionedSnackbar({ open: true });
  };

  const ClosePositionedSnackbar = () => {
    setPositionedSnackbar({ open: false });
  };
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

  const OpenDeletemodal = () => {
    setDeletemodal(true);
  };

  const closeDeletemodal = () => {
    setDeletemodal(false);
  };

  // ************** GET MENU FUNCTION ***************** //
  const getMenu = async () => {
    Fetch({}, 'get_menu')
      .then((res) => {
        const { option_groups, options } = res;
        setOptions(options);
        setOptionGroups(option_groups);
      })
      .catch(() => {
        setCategories([]);
      });
  };

  // ************** PUBLISH MENU FUNCTION ***************** //
  const publishMenu = async (success, error) => {
    Fetch({}, 'publish_menu')
      .then(() => {
        getPublishedMenu();
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

  // ************** GET PUBLISHED MENU FUNCTION ***************** //
  const getPublishedMenu = async () => {
    const pubid = true;
    Fetch({}, 'get_published_menu', pubid)
      .then((res) => {
        const { categories } = res;
        setPublishedCategories(categories);
      })
      .catch(() => {
        setCategories([]);
      });
  };

  // ************** GET DRAFT MENU FUNCTION ***************** //
  const getDraftMenu = async () => {
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
        getDraftMenu();
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
        closeDeletemodal();
        getMenu();
        getDraftMenu();
        setSnackbar({
          severity: 'warning',
          open: true,
          message: success
        });
      })
      .catch((e) => {
        getMenu();
        if (e) {
          setSnackbar({
            severity: 'error',
            open: true,
            message: e.toString()
          });
          return;
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
        getDraftMenu();
        // combinedOptionGroupfn();
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
    publishedcategories,
    categories,
    optiongroups,
    optionsarr,
    snackbar,
    modalid,
    openmodal,
    deletemodal,
    btnloading,
    positionsnackbar,
    OpenDeletemodal,
    closeDeletemodal,
    closeSnackbar,
    handleOpenmodal,
    handleClosemodal,
    getPublishedMenu,
    getMenu,
    getDraftMenu,
    addfn,
    deletefn,
    editfn,
    publishMenu,
    OpenPositionedSnackbar,
    ClosePositionedSnackbar
  };
  return <MenuContext.Provider value={createContext}>{children}</MenuContext.Provider>;
};
