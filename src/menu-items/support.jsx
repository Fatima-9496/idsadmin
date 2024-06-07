// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  // title: 'service',
  type: 'group',
  children: [
    {
      id: 'ip-List',
      title: 'List of IP',
      type: 'item',
      url: '/ip-List',
      icon: icons.ChromeOutlined
    },
    {
      id: 'blacklist',
      title: 'Blacklist',
      type: 'item',
      url: '/blacklist',
      icon: icons.QuestionOutlined
    }
  ]
};

export default support;
