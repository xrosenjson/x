import React from 'react';
import XRequest from '../../x-request/x-fetch';

interface KnowledgeBaseProps {
  category?: string;
  searchQuery?: string;
  language?: 'zh-CN' | 'en-US';
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  category = '',
  searchQuery = '',
  language = 'zh-CN',
}: KnowledgeBaseProps) => {
  const [knowledge, setKnowledge] = React.useState<Array<{
    id: string;
    title: string;
    content: string;
  }>>([]);

  const searchKnowledge = async (query: string): Promise<void> => {
    try {
      const response = await XRequest('/api/knowledge/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          category,
          language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
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
