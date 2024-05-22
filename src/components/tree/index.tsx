import React, { useState } from "react";
import './style.css';
import TreeNodeData from "types/interface/TreeNodeData";
  
interface TreeNodeProps {
    node: TreeNodeData;
    onSelectFile: (filePath: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onSelectFile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelectFile = () => {
    if (!node.children) {
      onSelectFile(node.path);
    }
  };

  return (
    <li className="tree-node">
      <div onClick={node.children ? handleToggle : handleSelectFile} className="tree-node-label" style={{ cursor: "pointer" }}>
        {node.children && (isExpanded ? "▼" : "▶")} {node.name}
      </div>
      {isExpanded && node.children && (
        <ul className="tree-node-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              onSelectFile={onSelectFile}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
