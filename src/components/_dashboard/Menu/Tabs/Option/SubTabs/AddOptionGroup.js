/* eslint-disable camelcase */
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TabsContainer from '../../../TabsContainer';

export default function AddOptionGroup({ categories }) {
  return (
    <TabsContainer Heading="Add Option Group to Items">
      <FormControl fullWidth sx={{ mt: 1.5 }}>
        <InputLabel id="demo-simple-select-label">Select Item </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={input.item_id}
          name="item_id"
          label="Select Item"
          // onChange={inputhandler}
        >
          {categories.map(({ items }) => {
            return items.map(({ item_name, item_id }) => {
              return (
                <MenuItem value={item_id} key={item_id}>
                  {item_name}
                </MenuItem>
              );
            });
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 1.5 }}>
        <InputLabel id="demo-simple-select-label">Select Option Group </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={input.item_id}
          name="item_id"
          label="Select Option Group"
          // onChange={inputhandler}
        >
          {categories &&
            categories.map(({ items }) => {
              return items.map(({ option_groups }) => {
                return option_groups.map(({ group_name, group_id }) => {
                  return (
                    <MenuItem value={group_id} key={group_id}>
                      {group_name}
                    </MenuItem>
                  );
                });
              });
            })}
        </Select>
      </FormControl>
    </TabsContainer>
  );
}
