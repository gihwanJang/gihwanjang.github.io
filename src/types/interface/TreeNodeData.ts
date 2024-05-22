export default interface TreeNodeData {
    name: string;
    path: string;
    children: TreeNodeData[] | null;
}