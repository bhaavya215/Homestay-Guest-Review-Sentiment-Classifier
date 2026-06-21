import { useState } from 'react';
import { Button, Input, Modal, Toast, Loader } from '../components/ui';

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="p-10 max-w-4xl mx-auto dark:bg-gray-900 dark:text-white min-h-screen transition-colors">
      <h1 className="text-4xl font-bold mb-6">Component Showcase</h1>
      
      <div className="space-y-8 mt-8">
        <div className="p-4 border rounded-lg dark:border-gray-700">
          <Input 
            placeholder="Test the input component..." 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className="w-full max-w-md"
          />
        </div>

        <div className="p-4 border rounded-lg dark:border-gray-700">
          <Button onClick={() => setIsOpen(true)}>
            Test Modal Button
          </Button>
        </div>

        <div className="p-4 border rounded-lg dark:border-gray-700">
          <h2 className="text-xl mb-4">Loader Component:</h2>
          <Loader />
        </div>

        <Toast isVisible={true} message="Toast component is active!" type="success" />

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Component Modal">
          <p>This proves your modal component is working successfully.</p>
        </Modal>
      </div>
    </div>
  );
}