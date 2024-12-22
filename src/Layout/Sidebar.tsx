import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  UserPlus,
  ClipboardList,
  Settings,
  CreditCard,
  BarChart2,
  FileText,
  Shield,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = React.useState<number[]>([]);
  
  const toggleMenu = (index: number) => {
    if (openMenus.includes(index)) {
      setOpenMenus(openMenus.filter(i => i !== index));
    } else {
      setOpenMenus([...openMenus, index]);
    }
  };
  
  const menuItems = [
    {
      title: '商户管理',
      icon: <Users className="w-4 h-4" />,
      subItems: [
        { title: '商户账户', path: '/merchants/accounts' },
        { title: '所有商户', path: '/merchants/all' },
        { title: '待审商户', path: '/merchants/pending' },
        { title: '资金流水', path: '/merchants/transactions' },
        { title: '银行账号', path: '/merchants/bank-accounts' }
      ]
    },
    {
      title: '代理商管理',
      icon: <UserPlus className="w-4 h-4" />,
      path: '/agents'
    },
    {
      title: '订单管理',
      icon: <ClipboardList className="w-4 h-4" />,
      subItems: [
        { title: '支付订单', path: '/orders/payment' },
        { title: '回调记录', path: '/orders/notify' },
        { title: '补单记录', path: '/orders/reissue' },
        { title: '转换与导出', path: '/orders/export' },
        { title: '代付订单', path: '/orders/payout' },
        { title: '代付回调', path: '/orders/payout-notify' },
        { title: '代付补单', path: '/orders/payout-reissue' }
      ]
    },
    {
      title: '支付配置',
      icon: <Settings className="w-4 h-4" />,
      subItems: [
        { title: '通道标识', path: '/payment/channel-id' },
        { title: '支付通道', path: '/payment/channel' },
        { title: '支付产品', path: '/payment/products' },
        { title: '弹性权重', path: '/payment/weight' }
      ]
    },
    {
      title: '结算管理',
      icon: <CreditCard className="w-4 h-4" />,
      path: '/settlements'
    },
    {
      title: '数据分析',
      icon: <BarChart2 className="w-4 h-4" />,
      path: '/analytics'
    },
    {
      title: '对账管理',
      icon: <FileText className="w-4 h-4" />,
      path: '/reconciliation'
    },
    {
      title: '系统管理',
      icon: <Shield className="w-4 h-4" />,
      subItems: [
        { title: '用户管理', path: '/sys/user' },
        { title: '角色管理', path: '/sys/role' },
        { title: '资源管理', path: '/sys/resource' },
        { title: '消息管理', path: '/sys/message' },
        { title: '操作日志', path: '/sys/log' },
        { title: '系统参数', path: '/sys/env' },
        { title: '机器人设置', path: '/sys/bot' },
        { title: '系统额度', path: '/sys/point' }
      ]
    }
  ];

  return (
    <aside 
      className={`fixed left-0 top-[50px] h-[calc(100vh-50px)] bg-[#2F4050] text-text-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <nav className="py-2">
        {menuItems.map((item, index) => (
          <div key={index} className="py-1">
            {item.subItems ? (
              <div>
                <div 
                  onClick={() => toggleMenu(index)}
                  className="flex items-center px-4 py-2 text-[#8095A8] hover:bg-[#293846] cursor-pointer transition-colors"
                >
                  {item.icon}
                  {!collapsed && (
                    <>
                      <span className="ml-3 flex-1 text-sm">{item.title}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openMenus.includes(index) ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </div>
                {!collapsed && openMenus.includes(index) && (
                  <div className="ml-8">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`block px-4 py-2 text-xs transition-colors ${
                          location.pathname === subItem.path
                            ? 'text-white bg-[#293846]'
                            : 'text-[#8095A8] hover:bg-[#293846]'
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 transition-colors ${
                  location.pathname === item.path
                    ? 'text-white bg-[#293846]'
                    : 'text-[#8095A8] hover:bg-[#293846]'
                }`}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
