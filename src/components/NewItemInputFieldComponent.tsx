import React, { useState } from 'react';
import { ItemInterface } from '../interfaces/ItemInterface';
import { FaPlus } from "react-icons/fa6";

interface Props {
  onAddItem?: (newItem: ItemInterface, level: number, hierarchicalMap: string) => void;
  level?: number;
  hierarchicalMap?: string;
}

const NewItemInputFieldComponent: React.FC<Props> = ({ onAddItem, level, hierarchicalMap }) => {
  const [name, setName] = useState('');

  const handleAddItem = () => {
    if (name === '') {
        alert('Por favor, digite um nome para o subitem');
    } else {
        const newItem: ItemInterface = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          items: [],
        };
        onAddItem!(newItem, level!, hierarchicalMap!);
        setName('');
    }
  };

  return (
    <div className="w-[220px] sm:w-1/3 lg:w-1/4 flex flex-row items-center">
        <input
            type="text"
            className="h-8 p-2 border border-gray-300 rounded-md min-w-[150px] lg:w-2/3"
            placeholder="Nome do subitem"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button className="w-8 h-8 ml-5 flex items-center justify-center rounded-lg bg-white shadow-lg shadow-gray-500 text-rose-500 font-bold rounded" onClick={handleAddItem}>
            <FaPlus size="1.2rem" />
        </button>
    </div>
  );
};

export default NewItemInputFieldComponent;
