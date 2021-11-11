import { createContext, useState } from 'react';
import { bool } from 'yup';
import Fetch from '../Fetch';

const defaultvalues = {
  categories: [],
  snackbar: {},
  openmodal: false,
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
  const [disabled, setDisabled] = useState(true);
  const [btnloading, setBtnloading] = useState(false);
  const [inputval, setInputval] = useState('');
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

  const addfn = async (endpoint) => {
    const data = {
      category_name: 'ayush'
    };
    Fetch(data, endpoint)
      .then(() => {
        getMenu();
        setBtnloading(false);
        setInputval('');
        setSnackbar({
          severity: 'success',
          open: true,
          message: `${inputval} added to the Categories :)`
        });
      })
      .catch(() => {
        setInputval('');
        setBtnloading(false);
        setSnackbar({
          severity: 'error',
          open: true,
          message: `Unable to add  ${inputval} to Categories. Try again :(`
        });
      });
  };

  // ************** DELETE CATEGORY FUNCTION ***************** //

  const deletefn = async (endpoint, data, category) => {
    Fetch(data, 'remove_category')
      .then(() => {
        getMenu();
        setSnackbar({
          severity: 'warning',
          open: true,
          message: `${category} deleted from the Categories :)`
        });
      })
      .catch((e) => {
        console.log(e);
        setSnackbar({
          severity: 'error',
          open: true,
          message: `Unable to delete ${category} from the Categories. Try again :(`
        });
      });
  };

  // ************** EDIT CATEGORY FUNCTION ***************** //

  const editfn = async (endpoint, id, input) => {
    const data = {
      category_id: id,
      category_name: input
    };
    Fetch(data, 'edit_category_name')
      .then(() => {
        getMenu();
        handleClosemodal();
        setSnackbar({
          severity: 'success',
          open: true,
          message: `Changed Category to ${input} :)`
        });
      })
      .catch(() => {
        setSnackbar({
          severity: 'error',
          open: true,
          message: `Unable to change category. Try again :(`
        });
      });
  };

  const createContext = {
    categories,
    snackbar,
    modalid,
    openmodal,
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
