// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// || MENU ITEMS - UTILITIES ||    //

const utilities = {
  id: 'utilities',
  // title: 'Users',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Pending users',
      type: 'item',
      url: '/pendingUsers'

    },
    {
      id: 'util-color',
      title: 'Approved users',
      type: 'item',
      url: '/approvedUsers'

    }
  ]
};

export default utilities;
