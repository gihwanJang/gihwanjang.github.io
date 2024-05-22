import React, { useEffect, useState } from 'react';
import './style.css';
import TreeNode from 'components/tree';
import TreeNodeData from 'types/interface/TreeNodeData';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';

interface MenuProps {
    visible: boolean;
    onClose: () => void;
    onSelectFile: (filePath: string) => void;
}

const Menu: React.FC<MenuProps> = ({ visible, onClose, onSelectFile }) => {
    const [tree, setTree] = useState<TreeNodeData[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (visible) {
          fetch('/content/tree.json')
            .then(res => res.json())
            .then(setTree)
            .catch(console.error);
        }
      }, [visible]);

    const homeNavigate = () => {
        navigate(`${MAIN_PATH()}`);
    }

    return (
        <nav id="menu" className={visible ? 'visible' : ''}>
          <div className="menu-header">
                <h2>Menu</h2>
                <div className="close" onClick={onClose}></div>
            </div>
            <ul>
                <div className='home' onClick={homeNavigate}>Home</div>
            </ul>
          {tree ? (
            <ul>
              {tree.map((node) => (
                <TreeNode key={node.path} node={node} onSelectFile={onSelectFile} />
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </nav>
      );
};

export default Menu;