import { useLayoutEffect, useState, useRef } from "react";
import { ItemInterface } from "../interfaces/ItemInterface";
import TreeComponent from '../components/TreeComponent';
import { Link } from "react-router-dom";

const data: ItemInterface[] = [];

function HomePage() {

    const [tree, setTree] = useState(data);
    const jsonLink = useRef(null);

    useLayoutEffect(() => {
        console.log(import.meta.env.VITE_API_URL)
        fetch(import.meta.env.VITE_API_URL)
        .then((response) => response.json())
        .then((data) => setTree(data.data))
        .catch((error) => console.error(error));
    }, []);


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
            <h2 className="text-center text-3xl font-bold mt-8 mx-auto">Visualizar árvore de dados</h2>
            <div className="w-1/4 flex flex-col mx-auto">
                <Link className="flex items-center justify-center bg-rose-500 text-white font-bold py-2 px-4 rounded-lg mt-8" to="/create-data-tree">Criar árvore de dados</Link>
            </div>
            <a className="hidden" href="" ref={jsonLink}></a>
            <main className="max-w-screen min-h-[calc(100vh-15vh)] overflow-x-auto px-8">
                {tree.map((item: ItemInterface, index: number) => {
                    return (
                        <TreeComponent item={item} key={item.id} level={0} hierarchicalMap={`${index}`} readonly={true}/>
                    );
                })}
                {
                    tree.length > 0 ? (
                        <button className="bg-rose-500 text-white font-bold py-2 px-4 rounded fixed bottom-16 right-8" onClick={handleSaveTreeAsJSON}>
                            Download JSON
                        </button>
                    ) : (<></>)
                }
            </main>
        </>
    )
}

export default HomePage;
