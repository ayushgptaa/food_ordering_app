/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
// material
import { Stack } from '@mui/material';
// components
import Fetch from 'src/components/_dashboard/Menu/Fetch';
import PageTitle from 'src/components/PageTitle';
import { SliderBox, SetHours } from 'src/components/_dashboard/Settings';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const Discount = [
  {
    value: 5,
    label: '5%'
  },

  {
    value: 25,
    label: '25%'
  }
];

const Commission = [
  {
    value: 1,
    label: '1%'
  },

  {
    value: 5,
    label: '5%'
  }
];

export default function Settings() {
  const [customerdiscount, setCustomerdiscount] = useState(5);
  const [commission, setCommission] = useState(1);
  useEffect(() => {
    // ************** GET STORE INFO FUNCTION ***************** //
    const getstoreInfo = async () => {
      const data = {
        store_id:
          'store_ITi5BP3FmPa7gyMYgbNVXM9PdD0jsC2avDxYbETsXJ56vmAEFdAwVQaVoCoeXEKl92wY30Z52QXo9NMnk55pY2ReizFeLRo7v0Gx1635-720184-2931'
      };

      Fetch(data, 'get_store_info')
        .then((res) => {
          const { customer_discount, affiliate_commission } = res;
          setCustomerdiscount(customer_discount);
          setCommission(affiliate_commission);
        })
        .catch(() => {});
    };
    getstoreInfo();
  }, []);

  return (
    <Page title="Settings">
      <PageTitle title="Available Settings" />
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <SliderBox
          name="customer_discount"
          text="Customer Discount"
          marks={Discount}
          min={5}
          max={25}
          defaultValue={customerdiscount}
          endpoint="change_customer_discount"
        />
        <SliderBox
          name="affiliate_commission"
          text="Affiliate Commission"
          marks={Commission}
          min={1}
          max={5}
          defaultValue={commission}
          endpoint="change_affiliate_commission"
        />
      </Stack>
      <SetHours />
    </Page>
  );
}
