import React from 'react';
import '../layout/styles.css';

interface KnowledgeBaseAdminProps {
  language?: 'zh-CN' | 'en-US';
}

const labels = {
  'zh-CN': {
    title: '知识库管理',
    categories: '分类管理',
    articles: '文章管理',
    search: '搜索',
    addNew: '新增'
  },
  'en-US': {
    title: 'Knowledge Base',
    categories: 'Categories',
    articles: 'Articles',
    search: 'Search',
    addNew: 'Add New'
  }
};

export const KnowledgeBaseAdmin: React.FC<KnowledgeBaseAdminProps> = ({
  language = 'zh-CN'
}) => {
  const t = labels[language];

  return (
    <div className="knowledge-base-admin">
      <h1 className="page-title">{t.title}</h1>
      
      <div className="kb-grid">
        <div className="kb-section">
          <div className="section-header">
            <h3>{t.categories}</h3>
            <button className="admin-button">{t.addNew}</button>
          </div>
          <div className="kb-list">
            <div className="kb-item">
              <span>产品介绍</span>
              <span className="item-count">12</span>
            </div>
            <div className="kb-item">
              <span>常见问题</span>
              <span className="item-count">45</span>
            </div>
            <div className="kb-item">
              <span>使用教程</span>
              <span className="item-count">23</span>
            </div>
          </div>
        </div>

        <div className="kb-section">
          <div className="section-header">
            <h3>{t.articles}</h3>
            <button className="admin-button">{t.addNew}</button>
          </div>
          <div className="kb-list">
            <div className="kb-item">
              <span>如何开始使用智能客服系统</span>
              <span className="item-date">2024-03-28</span>
            </div>
            <div className="kb-item">
              <span>配置多渠道客服的步骤</span>
              <span className="item-date">2024-03-27</span>
            </div>
            <div className="kb-item">
              <span>自定义回复模板教程</span>
              <span className="item-date">2024-03-26</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
