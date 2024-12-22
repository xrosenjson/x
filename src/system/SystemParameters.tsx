import React from 'react';
import { Card } from 'antd';

const SystemParameters: React.FC = () => {
  return (
    <div className="p-6">
      <Card title="系统参数">
        <div className="p-4">
          <form className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">测试商戶号</label>
                <input
                  type="text"
                  placeholder="请输入测试商戶号"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009688] focus:ring-[#009688]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">测试产品ID</label>
                <input
                  type="text"
                  placeholder="请输入测试产品ID"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009688] focus:ring-[#009688]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">收银台域名或IP</label>
                <input
                  type="text"
                  placeholder="请输入收银台域名或IP"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009688] focus:ring-[#009688]"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                重置
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00877a]"
              >
                保存设置
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SystemParameters;
