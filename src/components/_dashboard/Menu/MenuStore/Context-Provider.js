import { createContext, useState } from 'react';
import Fetch from '../Fetch';

const defaultvalues = {
  categories: [],
  items: [],
  optiongroups: [],
  getMenu: () => {}
};

export const MenuContext = createContext(defaultvalues);

// ----------------------------------------------------------

export const ContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [Optiongroups, setOptiongroups] = useState([]);
  // ************** GET MENU FUNCTION ***************** //
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
  const createContext = {
    categories,
    getMenu
  };
  return <MenuContext.Provider value={createContext}>{children}</MenuContext.Provider>;
};
