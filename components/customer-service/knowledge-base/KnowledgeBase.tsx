import React from 'react';
import type { XRequestParams } from '../../x-request';
import XRequest from '../../x-request/x-fetch';
import { config } from '../config';

interface KnowledgeBaseProps {
  category?: string;
  searchQuery?: string;
  language?: 'zh-CN' | 'en-US';
}

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
}

type KnowledgeList = KnowledgeItem[];

interface SearchRequestParams extends XRequestParams {
  query: string;
  category?: string;
  language: 'zh-CN' | 'en-US';
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  category = '',
  searchQuery = '',
  language = 'zh-CN',
}: KnowledgeBaseProps) => {
  const [knowledge, setKnowledge] = React.useState<KnowledgeList>([]);

  const searchKnowledge = async (query: string): Promise<void> => {
    try {
      const params: SearchRequestParams = {
        query,
        category,
        language: language || 'zh-CN',
      };

      const response = await XRequest(`${config.backendUrl}${config.api.knowledge}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const data: KnowledgeList = await response.json();
        setKnowledge(data);
      }
    } catch (error) {
      console.error('Failed to search knowledge base:', error);
      setKnowledge([]); // Reset knowledge on error
    }
  };

  React.useEffect(() => {
    if (searchQuery) {
      searchKnowledge(searchQuery);
    }
  }, [searchQuery, category]);

  return (
    <div className="knowledge-base">
      <div className="knowledge-list">
        {knowledge.map((item: { id: string; title: string; content: string }) => (
          <div key={item.id} className="knowledge-item">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
