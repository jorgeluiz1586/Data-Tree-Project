import React from 'react';
import { ItemInterface } from '../interfaces/ItemInterface';
import NewItemInputFieldComponent from '../components/NewItemInputFieldComponent';
import { FaRegTrashCan } from "react-icons/fa6";

interface TreeProps {
  item: ItemInterface;
  onAddItem?: (newItem: ItemInterface, level: number, hierarchicalMap: string) => void;
  onRemoveItem?: (item: ItemInterface, level: number, hierarchicalMap: string) => void;
  level?: number;
  hierarchicalMap?: string;
  readonly: boolean;
}

const TreeComponent: React.FC<TreeProps> = ({ item, onAddItem, onRemoveItem, level, hierarchicalMap, readonly }) => {

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center mb-2 my-8">
        { !readonly ?
            (
                <>
                    <span className="text-lg font-medium">{item.name}</span>
                    <button className="text-sm ml-5 bg-red-400 text-white px-2 py-1 rounded-md" onClick={() => onRemoveItem!(item, level!, hierarchicalMap!)}>
                        <FaRegTrashCan size="1rem" />
                    </button>
                </>
            ) : (<div className="w-1/4">
                    <span className="text-lg font-medium border-2 border-gray-500 rounded-md flex w-full px-2 py-3">{item.name}</span>
                </div>)
        }
      </div>
      { !readonly ?
        (
            <NewItemInputFieldComponent onAddItem={onAddItem} level={level!+1} hierarchicalMap={`${hierarchicalMap}`}></NewItemInputFieldComponent>
        ) : (<></>)
      }
      {item.items && (
        <div className="w-full ml-[20%]">
            {item.items.map((child, index) => (
                <TreeComponent key={child.id} item={child} onAddItem={onAddItem} onRemoveItem={onRemoveItem} level={level!+1} hierarchicalMap={`${hierarchicalMap} ${index}`} readonly={readonly} />
          ))}
 
        </div>
      )}
    </div>
  );
};

export default TreeComponent;
