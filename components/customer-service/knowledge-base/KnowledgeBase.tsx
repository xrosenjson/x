import React from 'react';
import type { XRequestParams } from '../../x-request/types';
import XRequest from '../../x-request/x-fetch';
import { config } from '../config';

interface KnowledgeBaseProps {
  category?: string;
  searchQuery?: string;
  language?: 'zh-CN' | 'en-US';
}

interface KnowledgeItem {
  question: string;
  answer: string;
  category: string;
  language: 'zh-CN' | 'en-US';
}

type KnowledgeList = KnowledgeItem[];

interface SearchRequestParams extends XRequestParams {
  question: string;
  answer?: string;
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
        question: query,
        answer: '', // Required by model but not needed for search
        category: category || 'general',
        language: language || 'zh-CN',
      };

      const queryParams = new URLSearchParams({
        language: params.language,
        category: params.category || '',
      }).toString();

      const response = await XRequest(`${config.backendUrl}/knowledge?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
        {knowledge.map((item: KnowledgeItem) => (
          <div key={`${item.category}-${item.question}`} className="knowledge-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
