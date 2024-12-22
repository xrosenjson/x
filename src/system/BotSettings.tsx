import React from 'react';
import { Card } from 'antd';

const BotSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card title="机器人设置">
        <div className="p-4">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">机器人管理群ID</label>
                <input
                  type="text"
                  placeholder="请输入机器人管理群ID"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009688] focus:ring-[#009688]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">四方技术群ID</label>
                <input
                  type="text"
                  placeholder="请输入四方技术群ID"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009688] focus:ring-[#009688]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">点数警告(元)</label>
                <input
                  type="number"
                  placeholder="请输入点数警告金额"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009688] focus:ring-[#009688]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">通道额度警告(元)</label>
                <input
                  type="number"
                  placeholder="请输入通道额度警告金额"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009688] focus:ring-[#009688]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">警告附加讯息</label>
                <textarea
                  placeholder="请输入警告附加讯息"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009688] focus:ring-[#009688]"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">USDT地址</label>
                <input
                  type="text"
                  placeholder="请输入USDT地址"
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

export default BotSettings;
