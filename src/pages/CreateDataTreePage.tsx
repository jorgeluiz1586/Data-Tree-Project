import { useLayoutEffect, useState, useRef } from "react";
import { ItemInterface } from "../interfaces/ItemInterface";
import TreeComponent from '../components/TreeComponent';

const data: ItemInterface[] = [];

function CreateDataTreePage() {

    const [tree, setTree] = useState(data);
    const [rootName, setRootName] = useState('');
    const content = useRef(null);
    const jsonLink = useRef(null);

    useLayoutEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
        .then((response) => response.json())
        .then((data) => setTree(data.data))
        .catch((error) => console.error(error));
    }, []);

    const handleAddItem = (newItem: ItemInterface, level: number, hierarchicalMap: string) => {
        const newTree = [...tree];
        
        let expression = "newTree";
        hierarchicalMap.split(' ').forEach((i, index) => { 

            if (index < level){
                expression = expression + `[${i}].items`;
            }
        })

        expression = expression+='.push(newItem)';

        eval(expression);
        setTree(newTree);
    };
    const handleRemoveItem = (item: ItemInterface, level: number, hierarchicalMap: string) => {
        let newTree = [...tree];
        
        newTree = [...newTree];
        let expression = "newTree";
        if (hierarchicalMap.includes(' ')) {
            hierarchicalMap.split(' ').forEach((i, index) => { 
    
                if (index < level){
                    expression = expression + `[${i}].items`;
                } else {
                    expression = `${expression} =  [...(${expression}.filter((el, elIndex) => i != elIndex))]`;
                    eval(expression);
                    setTree(newTree);
                }
            });
        } else {
            expression = `${expression} =  [...(${expression}.filter((el, elIndex) => hierarchicalMap != elIndex))]`;
            eval(expression);
            setTree(newTree);
        }


    };

    const handleSaveTree = () => {
        const treeJson = JSON.stringify(tree, null, 2);
        fetch(import.meta.env.VITE_API_URL+'/tree/create', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: treeJson,
        })
        .then(() => alert('Árvore de dados foi salva'))
        .catch((error) => console.error(error));
    };

    const handleSaveTreeAsJSON = () => {
        const treeJson = JSON.stringify(tree, null, 2);
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(treeJson);
        (jsonLink.current! as HTMLAnchorElement).setAttribute("href", dataStr);
        (jsonLink.current! as HTMLAnchorElement).setAttribute("download", "data-tree.json");
        (jsonLink.current! as HTMLAnchorElement).click();
    };
  
    return (
        <>
            <header className="w-full h-16 bg-rose-500 px-8 flex items-center justify-start items-center">
                <h1 className="text-white font-bold lg:text-xl">Criador de Árvore de Dados</h1>
            </header>
            <h2 className="text-center text-3xl font-bold mt-8 mx-auto">Criar árvore de dados</h2>
            <div className="w-1/4 flex flex-col mx-auto">
                <input type="text" className="w-full h-12 mb-5 p-2 border border-gray-300 rounded-md mt-8 mx-auto" placeholder="Nome da raiz da árvore" value={rootName} onChange={(e) => { setRootName((e.target as HTMLInputElement).value!) }}/>
                <button className="bg-rose-500 text-white font-bold py-2 px-4 rounded" onClick={() => { tree.push({ id: Math.random().toString(36).substr(2, 9), name: rootName, items: [] }); setTree(tree); setRootName(''); (content.current! as HTMLDivElement).scrollIntoView({ block: "end" }); }}>
                    Criar raiz da árvore
                </button>

            </div>
            <a className="hidden" href="" ref={jsonLink}></a>
            <main className="max-w-screen min-h-[calc(100vh-15vh)] overflow-x-auto px-8 pb-52" ref={content}>
                {tree.map((item: ItemInterface, index: number) => {
                    return (
                        <TreeComponent item={item} onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} key={item.id} level={0} hierarchicalMap={`${index}`} readonly={false}/>
                    );
                })}
                {
                    tree.length > 0 ? (
                        <>
                            <button className="bg-rose-500 text-white font-bold py-2 px-4 rounded fixed bottom-16 right-[12rem]" onClick={handleSaveTreeAsJSON}>
                                Download JSON
                            </button>
                            <button className="bg-rose-500 text-white font-bold py-2 px-4 rounded fixed bottom-16 right-8" onClick={handleSaveTree}>
                                Salvar Árvore
                            </button>
                        </>
                    ) : (<></>)
                }
            </main>
        </>
    )
}

export default CreateDataTreePage;
