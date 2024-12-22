import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';

// Merchant pages
import MerchantAccounts from './pages/merchants/MerchantAccounts';
import AllMerchants from './pages/merchants/AllMerchants';
import PendingMerchants from './pages/merchants/PendingMerchants';
import MerchantTransactions from './pages/merchants/MerchantTransactions';
import BankAccounts from './pages/merchants/BankAccounts';

// Other pages
import Agents from './pages/Agents';
import Settlements from './pages/Settlements';
import Analytics from './pages/Analytics';
import Reconciliation from './pages/Reconciliation';
// Payment pages
import ChannelIdentifier from './pages/payment/ChannelIdentifier';
import PaymentChannel from './pages/payment/PaymentChannel';
import PaymentProducts from './pages/payment/PaymentProducts';
import ElasticWeight from './pages/payment/ElasticWeight';

// System pages
import UserManagement from './pages/system/UserManagement';
import RoleManagement from './pages/system/RoleManagement';
import ResourceManagement from './pages/system/ResourceManagement';
import MessageManagement from './pages/system/MessageManagement';
import OperationLog from './pages/system/OperationLog';
import SystemParameters from './pages/system/SystemParameters';
import BotSettings from './pages/system/BotSettings';
import SystemQuota from './pages/system/SystemQuota';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Order routes */}
          <Route path="/orders">
            <Route index element={<Navigate to="/orders/payment" replace />} />
            <Route path=":type" element={<Orders />} />
          </Route>
          
          {/* Merchant routes */}
          <Route path="/merchants" element={<Navigate to="/merchants/accounts" replace />} />
          <Route path="/merchants/accounts" element={<MerchantAccounts />} />
          <Route path="/merchants/all" element={<AllMerchants />} />
          <Route path="/merchants/pending" element={<PendingMerchants />} />
          <Route path="/merchants/transactions" element={<MerchantTransactions />} />
          <Route path="/merchants/bank-accounts" element={<BankAccounts />} />
          
          {/* Payment routes */}
          <Route path="/payment">
            <Route path="channel-id" element={<ChannelIdentifier />} />
            <Route path="channel" element={<PaymentChannel />} />
            <Route path="products" element={<PaymentProducts />} />
            <Route path="weight" element={<ElasticWeight />} />
          </Route>

          {/* System routes */}
          <Route path="/sys">
            <Route path="user" element={<UserManagement />} />
            <Route path="role" element={<RoleManagement />} />
            <Route path="resource" element={<ResourceManagement />} />
            <Route path="message" element={<MessageManagement />} />
            <Route path="log" element={<OperationLog />} />
            <Route path="env" element={<SystemParameters />} />
            <Route path="bot" element={<BotSettings />} />
            <Route path="point" element={<SystemQuota />} />
          </Route>

          {/* Other routes */}
          <Route path="/agents" element={<Agents />} />
          <Route path="/settlements" element={<Settlements />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reconciliation" element={<Reconciliation />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
