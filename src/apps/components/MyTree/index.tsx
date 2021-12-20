import React, { useState, Key, useEffect } from 'react';
import { Tree, TreeProps } from 'antd';
import { DataNode } from 'antd/lib/tree';

interface MyTreeProps extends TreeProps {
  defaultValue?: Key[];
}

interface MyDataNode extends DataNode {
  parent?: DataNode | null;
}

/** 节点信息 */
type NodeInfo = Parameters<NonNullable<TreeProps['onCheck']>>[1];

// 去重
const unique = (arr: Key[]) => [...new Set(arr)];

// 差集
const diffArr = (arr1: Key[], arr2: Key[]) => arr1.filter(item => !arr2.includes(item));

type CheckedKeysValue = {
  checked: Key[];
  halfChecked: Key[];
};
/**
 * 获取所有子节点的key
 */
const getAllChildrenKeys = (children: MyDataNode[] = [], arr: Key[] = []) => {
  return children.reduce((prev, curr) => {
    if (curr.children?.length) {
      getAllChildrenKeys(curr.children, arr);
    }
    prev.push(curr.key);
    return prev;
  }, arr);
};
/**
 * 获取某个子节点所有的祖先节点的key
 */
const getAllParentKeys = (
  parent: MyDataNode,
  checkedKeys: Key[] = [],
  ckv: CheckedKeysValue = { checked: [], halfChecked: [] }
): CheckedKeysValue => {
  const length = parent.children?.length;
  if (length) {
    const isCheckedAll = parent.children?.every(item => checkedKeys.includes(item.key));
    console.log('isCheckedAll', isCheckedAll);
    if (isCheckedAll && getAllChildrenKeys(parent.children).every(item => checkedKeys.includes(item))) {
      ckv.checked.push(parent.key);
    } else {
      checkedKeys = diffArr(checkedKeys, [parent.key]);
      const childKeys = parent.children?.map(({ key }) => key);
      const isCheckedSome = childKeys?.some(item => checkedKeys.includes(item) || ckv.halfChecked.includes(item));
      if (isCheckedSome) {
        ckv.halfChecked.push(parent.key);
        checkedKeys = diffArr(checkedKeys, ckv.halfChecked);
      } else if (childKeys) {
        checkedKeys = diffArr(checkedKeys, childKeys);
      }
    }
    ckv.checked = unique([...checkedKeys, ...ckv.checked]);
  }
  if (parent.parent) {
    console.log(parent.key, ckv.checked, 'hhhhh');
    getAllParentKeys(parent.parent, ckv.checked.length ? ckv.checked : checkedKeys, ckv);
  }
  return ckv;
};

/**
 * 获取初始化选择状态 勾选/半勾选 的key
 */
const getAllCheckedStatus = (treeData: MyDataNode[], checkedKeys: Key[], prev: CheckedKeysValue) => {
  return treeData?.reduce((prev, curr) => {
    if (curr.children?.length) {
      const isCheckedAll = curr.children.map(n => n.key).every(k => checkedKeys.includes(k));
      isCheckedAll ? prev.checked.push(curr.key) : prev.halfChecked.push(curr.key);
      getAllCheckedStatus(curr.children, checkedKeys, prev);
    } else {
      if (checkedKeys.includes(curr.key)) {
        prev.checked.push(curr.key);
      }
    }
    return prev;
  }, prev);
};

export const MyTree: React.FC<MyTreeProps> = props => {
  const [checkedKeysValue, setCheckedKeysValue] = useState<CheckedKeysValue>({ checked: [], halfChecked: [] });

  useEffect(() => {
    if (props.treeData && props.defaultValue) {
      const halfCheckedKeys = getAllCheckedStatus(props.treeData, props.defaultValue, { checked: [], halfChecked: [] });
      setCheckedKeysValue(halfCheckedKeys);
      console.log('halfCheckedKeys', halfCheckedKeys);
    }
  }, [props.defaultValue, props.treeData]);

  useEffect(() => {
    console.log('checkedKeysValue', checkedKeysValue);
  }, [checkedKeysValue]);

  const onCheck = (ckv: CheckedKeysValue, { node }: NodeInfo) => {
    console.log('ckv', ckv);
    const isChecked = !checkedKeysValue.checked.includes(node.key);
    const childrenKeys = getAllChildrenKeys(node.children);
    // 是否选中
    if (isChecked) {
      const parentChecked = getAllParentKeys(node, [node.key, ...ckv.checked, ...childrenKeys]);
      const checked = unique(ckv.checked.concat([...childrenKeys, ...parentChecked.checked]));
      const halfChecked = unique(ckv.halfChecked.concat(parentChecked.halfChecked));
      setCheckedKeysValue({ checked, halfChecked });
    } else {
      const parentChecked = getAllParentKeys(node, diffArr(ckv.checked, [node.key, ...childrenKeys]));
      const checked = diffArr(parentChecked.checked, [node.key, ...childrenKeys, ...parentChecked.halfChecked]);
      const halfChecked = unique(diffArr([...ckv.halfChecked, ...parentChecked.halfChecked], checked));
      setCheckedKeysValue({ checked, halfChecked });
    }
  };

  return (
    <Tree
      // {...props}
      // checkedKeys={{ checked: checkedKeys, halfChecked: halfCheckedKeys }}
      treeData={props.treeData}
      checkedKeys={checkedKeysValue}
      checkable
      checkStrictly
      titleRender={node => (
        <span>
          <span>{node.key}</span>
        </span>
      )}
      onCheck={onCheck as TreeProps['onCheck']}
    />
  );
};
