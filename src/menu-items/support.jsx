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
  title: 'service',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'List of IP',
      type: 'item',
      url: '/sample-page',
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
